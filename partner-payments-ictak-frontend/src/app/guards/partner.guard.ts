import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerGuard implements CanActivate {

  constructor( private auth: AuthService ) { }

  canActivate(): boolean {
    return this.auth.loggedIn('Partner')
  }
  
}
