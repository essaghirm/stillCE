import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { StillceServicesProvider } from '../../providers/stillce-services/stillce-services';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {
    projects: any = []
    users: any = []
    services: any = []
    show_form: boolean = false

    private project: FormGroup;
    client: AbstractControl
    region: AbstractControl
    phase: AbstractControl
    description: AbstractControl
    statuts: AbstractControl
    progress: AbstractControl
    user: AbstractControl

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private ce: StillceServicesProvider, public http: Http) {
        this.project = this.formBuilder.group({
            // description: ['', Validators.required],
            region: ['', Validators.required],
            phase: ['', Validators.required],
            client: ['', Validators.required],
            progress: ['', Validators.required],
            statuts: ['', Validators.required],
            user: ['', Validators.required],
            services: ['', Validators.required],
        })

        this.region = this.project.controls['region']
        this.region = this.project.controls['region']
        this.phase = this.project.controls['phase']
        this.client = this.project.controls['client']
        this.progress = this.project.controls['progress']
        // this.description = this.project.controls['description']
        this.user = this.project.controls['user']

        this.project.value.progress = 0
        this.getUsers()
        this.getProjects()
        this.getServices()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
    }

    getProjects() {
        this.http.get(this.ce.url + 'project/').map(res => res.json()).subscribe(
            data => {
                // data.forEach(p => {
                //     p.services = JSON.parse(p.services)
                // });
                this.projects = data
                console.log('getProjects :', this.projects)
                // this.project.patchValue(this.projects[0]);
                // this.project.controls['user'].setValue(this.projects[0].user.id);
                // console.log('project', this.project.value)
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

    getServices() {
        this.http.get(this.ce.url + 'service/').map(res => res.json()).subscribe(
            data => {
                console.log('getServices :', data)
                this.services = data
            },
            err => {
                console.log("Oops!")
            }
        )
    }

    showForm() {
        this.show_form = (this.show_form == true) ? false : true
    }

    logForm() {
        console.log(this.project.value)
        // this.addProject()
    }

    addProject() {
        this.ce.presentLoading()
        this.http.post(
            this.ce.url + 'project/', this.project.value).map(res => res.json()).subscribe(
                data => {
                    // data.forEach(p => {
                    //     p.services = JSON.parse(p.services)
                    // });
                    this.projects = data
                    this.showForm()
                    console.log('addProject', this.projects)
                    this.ce.loadingDismiss()
                },
                err => {
                    console.log("Oops!", err)
                    this.ce.loadingDismiss()
                }
            )
    }

    detail(p) {
        this.navCtrl.push("ProjectDetailPage", {
            project: p
        });
    }

}
