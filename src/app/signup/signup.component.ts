import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeService } from '../_services/me.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../_models/LoginResponse';
import { SignupMemberResponse } from '../_models/SignupMemberResponse';
import { SignupGuestResponse } from '../_models/signupGuestResponse';
import { SignupService } from '../_services/signup.service';
import { MatIconModule } from '@angular/material/icon';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
  } from '@angular/animations';
import { from } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
  /*animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ])
    ])
  ]*/
})


@Injectable()
export class SignupComponent implements OnInit {
    hide = true;
    username1 = "";
    password1 = "";
    phoneNumber1 = "";
    problem = '';
    show = false;
    agree = false;
    constructor(private http: HttpClient,
                public  router: Router,
                private SignupService:  SignupService) { }

    ngOnInit() { }

    showCondition(){
        this.show = true;
    }

    hideCondition(){
        setTimeout(() => {this.show = false;}, 500);
    }

    changeServer(newServer){
      localStorage.setItem("server" , newServer);
    }

    signupMember(username: string, password: string, mobileNumber: string): void {
        this.problem = "";
        if (!this.agree) {
            this.problem = 'لطفاً با قوانین موافقت کنید';
            return;
        }

        this.SignupService.signupMember(username, password, mobileNumber).subscribe((body) => {

            if (body.ok) {
                this.router.navigate(['/activation']);
                localStorage.setItem('access_token', body.token);
                localStorage.setItem('username', username);
            } else {
                this.problem = body.problem;
            }
        });
    }

    guest(): void {
      this.SignupService.guest().subscribe((body) => {
        if (body.ok === true){
          localStorage.setItem('access_token', body.token);
          this.router.navigate(['/interests']);
        } else {
            this.problem = body.problem;
        }

      })
    }
}
