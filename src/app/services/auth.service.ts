import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { authResponseData } from '../state/authState/auth.model';
import { Observable } from 'rxjs';
import { user } from '../state/authState/user.model';
import { Store } from '@ngrx/store';
import { appStateModel } from '../state/GlobalAppStore/app.model';
import { autoLogout } from '../state/authState/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval:any;

  constructor(private http: HttpClient, private store: Store<appStateModel>) {}

  login(email: string, password: string): Observable<authResponseData> {
    return this.http.post<authResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, retrunSecureToken: true }
    );
  }

  formatUser(data: authResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const User = new user(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return User;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found!';
      case 'INVALID_PASSWORD':
        return 'Invalid password!';
      case 'EMAIL_EXISTS':
        return 'Email already exists!';
      default:
        return 'Unknown error occured, please try again later!';
    }
  }

  signup(email: string, password: string): Observable<authResponseData> {
    return this.http.post<authResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      { email, password, retrunSecureToken: true }
    );
  }

  setUserInLocalStorage(user:user){
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user:user){
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(()=>{
      //logout functionality or  get refresh token
      // this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  getUserFromLocalStorage(){
    const userDataString = localStorage.getItem('userData');
    if(userDataString){
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const userr = new user(userData.email,userData.token, userData.localId,expirationDate)
      this.runTimeoutInterval(userr);
      return userr;
    }    
    return null;
  }

  logout(){
    localStorage.removeItem('userData');
    if(this.timeoutInterval){
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval=null;
    }
  }
}
