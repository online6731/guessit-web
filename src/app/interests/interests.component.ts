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




import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { all } from 'q';
import { Tag } from '../_models/tag';


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

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Tag[];

  @ViewChild('interestInput') interestsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;







  tags : Tag[];
  interests : Tag[]=[];
  selectedTag:Tag;

  constructor(
  	private   http              : HttpClient,
		public    router            : Router,
    private   TagService   : TagService,
    private MeService:  MeService
  ) {}


  ngOnInit() {
    this.findTag();
  }

  findTag(): void{
    this.TagService.find().subscribe(
      (body) => {
        if (body.ok){
           this.tags = body.tags;
           this.filteredTags = this.tags;        
        }
        else {
          console.error("ok is false");
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


  removeChip(event){
    for(var tag of this.tags){
      if(tag.title == event.target.id){
        event.target.style['background'] = '#b7ffb7';
        
        const index: number = this.interests.map(interest => interest.title).indexOf(event.target.name);
        if (index !== -1) {
            this.interests.splice(index, 1);
        }
  
        event.target.state = 'inactive';
      }
    }
  }


  toggleInterest(event): void{
    for (var tag of this.tags){
      if(tag.title == event.target.name){
        this.selectedTag = tag;
        break;
      }
    }
  	if (this.interests.map(interest => interest.title).includes(event.target.name)){
  		event.target.style['background'] = '#b7ffb7';
  		
  		const index: number = this.interests.map(interest => interest.title).indexOf(event.target.name);
	    if (index !== -1) {
	        this.interests.splice(index, 1);
	    }

      event.target.state = 'inactive';
  	}
  	else{
  		event.target.style['background'] = '#b7ff27';

  		this.interests.push(this.selectedTag);

      event.target.state = 'active';

    }
    
  	
  }

 /* add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if (this.interests.includes(event.target.name)) {
        this.interests.push(event.target.name());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }*/



  _filter(event){
    
    this.filteredTags = this.tags.filter(tag => tag.persianTitle.indexOf(event.target.value) === 0);
  }
}

