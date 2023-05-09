import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';

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

  users: User[] = [];

  constructor(
    
    private router: Router,
    private signupService: SignupService
  ) { }

  ngOnInit(): void {
    this.signupService.getAllUsers().subscribe(users => (this.users = users));
    console.log(this.users);
    
  }

  signup() {
    /*
      desc : Enregistrement utilisateur
    */
    let user : User = {
      firstName: this.firstNameCtrl.value,
      lastName: this.lastNameCtrl.value,
      username: this.usernameCtrl.value,
      password: this.passwordCtrl.value,
      mail: this.mailCtrl.value
    }

    this.signupService.createUser(user).subscribe(user => {
      this.users.push(user);
      this.router.navigate(['/']);

      // Effacer les valeurs
      this.firstNameCtrl.reset();
      this.lastNameCtrl.reset();
      this.usernameCtrl.reset();
      this.passwordConfirmeCtrl.reset();
      this.passwordCtrl.reset();
      this.mailCtrl.reset();
    });
  }
}
