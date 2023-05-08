import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  usernameCtrl: FormControl = new FormControl( '', Validators.required);
  firstNameCtrl: FormControl = new FormControl();
  lastNameCtrl: FormControl = new FormControl();
  passwordCtrl: FormControl = new FormControl( '', Validators.required);
  mailCtrl: FormControl = new FormControl( '', [Validators.required,Validators.email]);
  passwordConfirmeCtrl: FormControl = new FormControl( '', Validators.required);

  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
