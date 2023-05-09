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
  passwordCtrl: FormControl = new FormControl( '', [Validators.required,Validators.minLength(5)]);
  mailCtrl: FormControl = new FormControl( '', [Validators.required,Validators.email]);
  passwordConfirmeCtrl: FormControl = new FormControl( '', Validators.required);

  loading = false;

  users: User[] = [];

  error: string = '';

  constructor(
    
    private router: Router,
    private signupService: SignupService
  ) { }

  ngOnInit(): void {
    this.signupService.getAllUsers().subscribe(users => (this.users = users));
    
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

    // Si username ou mot de passe déjà  utilisé
    let usernameCHeck = this.users.find(el => el.username == this.usernameCtrl.value);
    let passwordCHeck = this.users.find(el => el.password == this.passwordCtrl.value);

    if (usernameCHeck || passwordCHeck) {
      this.error = usernameCHeck && passwordCHeck ? "Nom d'utilisateur et mot de passe déjà utilisé" : usernameCHeck ? "Nom d'utilisateur déjà utilisé" : "Mot de passe déjà utilisé" ;
    } 
    // Sinon, on enregistre l'information
    else {
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

  checkRegistration() {
    /*
      desc : Vérifier si les informtions sont correcte
    */

    return this.usernameCtrl.valid && this.passwordConfirmeCtrl.valid && this.passwordCtrl.valid && this.mailCtrl.valid && this.passwordConfirmeCtrl.value == this.passwordCtrl.value
  }
}
