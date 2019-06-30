import {  Component, OnInit, Inject, Renderer, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl,Validators,ValidationErrors} from '@angular/forms';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  checkoutForm : FormGroup;
  game;
  i = 0;
  constructor(
    private element : ElementRef,
    private apiService : ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.checkoutForm = this.formBuilder.group({
        category: ['' 
              ],
        tag: [''
      ],
        title: new FormControl(''),
  
        
      })

      

   }


  ngOnInit() {
  }


  async add(body,cb) {
    let games;
    await this.apiService.getMoviesCount()
              .subscribe((value) => {
                this.apiService.createMovie({
                  "movie_id": value['count']+1,
                  "title": body.title,
                  "category": body.category,
                  "tag": body.tag
                }).subscribe((value) =>{   
                    games = value;
                    cb(games);
                    this.router.navigate(['/movies']);
              });
          })
    
}

onSubmit(customerData) {
  // Process checkout data here
  console.warn('Your order has been submitted', customerData);

  this.add(customerData,(data) => console.log(data))
  this.checkoutForm.reset();
}

}
