import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, FormControl } from '@angular/forms'
import { ApiService } from "../_services/api.service"
import { Router } from "@angular/router"
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css', '../home/home.component.css']
})
export class PatientsComponent implements OnInit, AfterViewInit, OnDestroy {

  user: object={};
  query: string="";

  //tags for therapy goals
  protected tags = [
    {"goal": "Bilateral_Coordination"},
    {"goal": "Balance"},
    {"goal": "Visual_Discrimination"},
    {"goal": "Handwriting"},
    {"goal": "Sensory_Integration"},
    {"goal": "Social_Skills"},
    {"goal": "Working_Memory"}
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

  //boolean that toggles the view
  addView: boolean=false;

  //form properties
  patientForm: FormGroup;
  firstName: string="";
  lastName: string="";
  dob: Date;
  recipient_name: string="";
  recipient_email: string="";
  consent: Boolean;

  //patient list 
  patients: Array<Object>=[];

  //max date for datepicker
  today = new Date();

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService, 
    private router: Router) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    //assigning add patient form properties
    this.patientForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'dob': [null, Validators.required],
      'recipient_name': [null, Validators.required],
      'recipient_email': [null, Validators.compose([Validators.required, Validators.email])],
      'consent': [null, Validators.required]
    })
   }

   toggleView() {
    this.addView = !this.addView;
   }

   addPatient(form:Object) {
     //format data for posting
      form['goals'] = this.tagMultiCtrl.value.map((tag:Object) => {
        return tag['goal']
      }).toString();
      form['dob'] = form['dob'].valueOf().toString()

      //post data
      this.apiService.addPatient(form, this.user['code']).subscribe((response) => {
        this.patients = response['records'];
        this.toggleView();
      },
      error => {
        console.log(error);
      })
   }

   getPatients() {
     this.apiService.getPatient(this.user['code']).subscribe((response) => {
       this.patients = response['records'];
     },
     error => {
       console.log(error);
     })
   }

   goProfile(uid: string) {
      // this.router.navigate(['/#profile'], {queryParams: {id: uid}});
      window.location.href=`/#profile?id=${uid}`
    }

  ngOnInit() {
    this.getPatients();
    // set initial selection
    this.tagMultiCtrl.setValue([]);

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
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Object, b: Object) => a && b && a['goal'] === b['goal'];
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
    // filter the banks
    this.filteredTagsMulti.next(
      this.tags.filter(tag => tag['goal'].toLowerCase().indexOf(search) > -1)
    );
  }
}
