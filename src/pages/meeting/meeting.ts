import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StillceServicesProvider } from '../../providers/stillce-services/stillce-services';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-meeting',
    templateUrl: 'meeting.html',
})
export class MeetingPage {
    what: string = "attachedToMe"
    meetings: any = []
    users: any = []
    projects: any = []
    lieux = [{"id": "rabat", "name": "Rabat"}, {"id": "autre", "name": "Autre"}, ]
    show_form: boolean = false


    private meeting: FormGroup;
    project: AbstractControl
    date: AbstractControl
    attachedTo: AbstractControl
    description: AbstractControl
    lieu: AbstractControl

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private ce: StillceServicesProvider, public http: Http) {

        this.meeting = this.formBuilder.group({
            description: ['', Validators.required],
            attachedTo: ['', Validators.required],
            date: ['', Validators.required],
            project: ['', Validators.required],
            lieu: ['', Validators.required],
            creator: [''],
        })

        this.project = this.meeting.controls['project']
        this.date = this.meeting.controls['date']
        this.attachedTo = this.meeting.controls['attachedTo']
        this.description = this.meeting.controls['description']
        this.lieu = this.meeting.controls['lieu']

        this.getMeetings()
        this.getProjects()
        this.getUsers()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MeetingPage');
    }

    showForm(){
        this.show_form = (this.show_form == true) ? false : true
    }

    logForm(){
        this.meeting.value.creator = 1
        console.log(this.meeting.value)
        this.addMeeting()
    }

    segmentChanged(e){
        // console.log(e)
        this.getMeetings()
    }

    getProjects() {
		this.http.get(this.ce.url + 'project/').map(res => res.json()).subscribe(
			data => {
                console.log('getProjects :', data)
                this.projects = data
			},
			err => {
				console.log("Oops!")
			}
		)
    }

    getUsers() {
		this.http.get(this.ce.url + 'user/').map(res => res.json()).subscribe(
			data => {
                console.log('getUsers :', data)
                this.users = data
			},
			err => {
				console.log("Oops!")
			}
		)
    }

    getMeetings() {
		this.http.get(this.ce.url + 'meeting/'+this.what+'/'+1).map(res => res.json()).subscribe(
			data => {
                console.log('getMeetings :', data)
                this.meetings = data
			},
			err => {
                console.log("Oops!")
			}
		)
    }

    addMeeting(){
        this.ce.presentLoading()
        this.http.post(
            this.ce.url + 'meeting/', this.meeting.value ).map(res => res.json()).subscribe(
            data => {
                console.log('tasks', data)
                this.meetings = data
                this.showForm()
                this.ce.loadingDismiss()
            },
            err => {
                console.log("Oops!", err)
                this.ce.loadingDismiss()
            }
        )
    }

}
