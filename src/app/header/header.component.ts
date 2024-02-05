import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appStateModel } from '../state/GlobalAppStore/app.model';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../state/authState/auth.selectors';
import { autoLogout } from '../state/authState/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isauthenticated!:Observable<boolean>;

  constructor(private store: Store<appStateModel>){}

  ngOnInit(): void {
    this.isauthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }

}
