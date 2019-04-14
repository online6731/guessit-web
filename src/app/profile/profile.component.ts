import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { MeService } from '../_services/me.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {


    arrayColors = [];
    navLinks = [
        { label: 'صفحه اصلی'			, path: '/main'},
        { label: 'فروشگاه'			, path: '/shop'}
    ];

    user: User;

    constructor(
        private http:       HttpClient,
        public  router:     Router,
        private MeService:  MeService
    ) { }


    ngOnInit() {
        this.getProfile();
    }

    getProfile(): void {
        this.MeService.getProfile().subscribe(
            (profileResponse) => {
                if (profileResponse.ok) {
                    this.user = profileResponse.profile;

                } else {

                }
            }
        );
    }

}

