import {  Component, OnInit, Inject, Renderer, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl,Validators,ValidationErrors} from '@angular/forms';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})

export class EditmovieComponent implements OnInit, OnDestroy {
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
        tag: ['' 
              ],
        category: [''
      ],
        title: new FormControl(''),
  
        
      })

      

   }

  ngOnInit() {
          this.fetch( async (data) => { 
        this.game = data;
        this.checkoutForm.controls['title'].setValue(this.game.title);
        this.checkoutForm.controls['category'].setValue(this.game.category)
        this.checkoutForm.controls['tag'].setValue(this.game.tag)

      })
  }

	ngOnDestroy(){
	}

  async update(body,cb) {
      let games;
      await this.apiService.updateMovie(parseInt(this.route.snapshot.paramMap.get('id')),body)
                       .subscribe((value) =>{
                       games = value;
                       cb(games);
                       this.router.navigate(['/movies']);
                     });
  }

  async fetch(cb) {
    let games;
    await this.apiService.getOneMovie(parseInt(this.route.snapshot.paramMap.get('id')))
                     .subscribe((value) =>{
                       console.log(value)
                     games = value[0];
                     cb(games);
                   });
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.update(customerData,(data) => console.log(data))
    this.checkoutForm.reset();
  }

}
