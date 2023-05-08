import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameCtrl: FormControl = new FormControl( '', Validators.required);
  passwordCtrl: FormControl = new FormControl( '', Validators.required);

  loading = false;
  submitted = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // Redirection si utilisateur déjà connecté
    if (this.authenticationService.currentUserValue && !_.isEmpty(this.authenticationService.currentUserValue)) { 
      this.router.navigate(['/home']);
  }
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.usernameCtrl.value, this.passwordCtrl.value)
      .pipe(first())
      .subscribe(
          data => {
            // Si utilisateur trouvé
            this.router.navigate(['/home']);
            this.loading = false
          },
          error => {
            // Sinon, on affiche l'erreur
            this.error = error.error.message;
            this.loading = false;
          });
  }

}
