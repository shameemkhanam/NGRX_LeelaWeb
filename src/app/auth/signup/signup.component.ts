import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appStateModel } from 'src/app/state/GlobalAppStore/app.model';
import { signupStart } from 'src/app/state/authState/auth.actions';
import { setLoadingSpinner } from 'src/app/state/sharedState/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;

  constructor(private fb:FormBuilder, private store: Store<appStateModel>){}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(){
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    if(this.signupForm.invalid){
      return;
    }
    console.log(this.signupForm.value);
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(signupStart({email,password}));
  }

}
