import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import * as _ from 'lodash';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        
        if (currentUser && !_.isEmpty(currentUser) ) {
            // Utilisateur déjà connecté
            return true;
        }

        // Utilisateur non connecté donc retour à la page de login
        this.router.navigate(['/']);
        return false;
    }
}