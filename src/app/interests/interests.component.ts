import { Component,
				 OnInit,
				 Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { RouterModule,
         Router } from '@angular/router';
         
import { MatGridListModule ,
         MatButtonToggleModule } from '@angular/material';

import { MeService } from '../_services/me.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes } from '@angular/animations';

import { TagService } from '../_services/tag.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css'],
  animations: [
    trigger('fade', [

      state('in', style({opacity: 1})),

      transition(':enter', [
        style({opacity: 0}),
        animate(1500)
      ]),

      transition(':leave',
        animate(1500, style({opacity: 0})))
    ]),
    

    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(3000, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(3000, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])

  ]
})


@Injectable()
export class InterestsComponent implements OnInit {
	
  
  tags = [];
  interests = [];

  constructor(
		private   http              : HttpClient,
		public    router            : Router,
    private   TagService   : TagService,
    private MeService:  MeService
  ) { }


  ngOnInit() {
    this.findTag();
  }

  findTag(): void{
    this.TagService.find().subscribe(
      (body) => {
        if (body.ok){
        
       		this.tags = body.tags;
        
        }
        else {

        }
      }
    );
  }
  
  setInterests(): void {
    this.MeService.setInterests(this.interests).subscribe(data => {
			console.log(data);
      if (data.ok){
        this.router.navigate(['/main']);
      }
      else {
        this.router.navigate(['/interests']);
      }
      
		});
  }




  toggleInterest(event): void{

  	if (this.interests.includes(event.target.name)){
  		event.target.style['background'] = '#b7ffb7';
  		
  		const index: number = this.interests.indexOf(event.target.name);
	    if (index !== -1) {
	        this.interests.splice(index, 1);
	    }

      event.target.state = 'inactive';
  	}
  	else{
  		event.target.style['background'] = '#b7ff27';

  		this.interests.push(event.target.name);

      event.target.state = 'active';

  	}
  	
  }

}
