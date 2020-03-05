import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, FormControl } from '@angular/forms'
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css', '../home/home.component.css']
})
export class GamesComponent implements OnInit, AfterViewInit, OnDestroy {

  user: Object;
  gameList: Array<Object>
  query: string="";

//   protected tags = [
//     {"goal": "Bilateral_Coordination"},
//     {"goal": "Balance"},
//     {"goal": "Visual_Discrimination"},
//     {"goal": "Handwriting"},
//     {"goal": "Sensory_Integration"},
//     {"goal": "Social_Skills"},
//     {"goal": "Working_Memory"}
// ]

  protected tags = [
    "Attention",
    "Memory",
    "Organization",
    "Finger_control",
    "Hand_strength",
    "Pincer_grasp",
    "Wrist_control",
    "Balance",
    "Bilateral_coordination",
    "Bathing",
    "Dressing",
    "Self-feeding",
    "Directions",
    "Taking_turns"
  ]

  //form control for selected tag
  public tagMultiCtrl: FormControl = new FormControl();

  //control for tag filter keyword multi-selection
  public tagMultiFilterCtrl: FormControl = new FormControl();

  //list of tags filtered by search keyword
  public filteredTagsMulti: ReplaySubject<Object> = new ReplaySubject<Object>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  //subject that emits when component has been destroyed
  protected _onDestroy = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private _sanitizer: DomSanitizer
    ) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    //call game list from backend
    this.apiService.getGamelist().subscribe((response) => {
      // this.gameList = response['records']
      response['records'].forEach(record => {
        record['game_title'] = record['game_title'].replace(/_/g, ' ')
        record['icon'] = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + record['icon']);
      });
      this.gameList = response['records']
      console.log(this.gameList)
    })
    // set initial selection
    this.tagMultiCtrl.setValue("");

    // load the initial tag list
    this.filteredTagsMulti.next(this.tags.slice());
    
    // listen for search field value changes
    this.tagMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTagsMulti();
      });
  }

  //everything below supports the search and select component

   ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredTagsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelect.compareWith = (a: Object, b: Object) => a && b && a === b;
      });
  }

  protected filterTagsMulti() {
    if (!this.tags) {
      return;
    }
    // get the search keyword
    let search = this.tagMultiFilterCtrl.value;
    if (!search) {
      this.filteredTagsMulti.next(this.tags.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the tags
    this.filteredTagsMulti.next(
      this.tags.filter(tag => tag.toLowerCase().indexOf(search) > -1)
    );
  }
}