import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { appStateModel } from './state/GlobalAppStore/app.model';
import { Store } from '@ngrx/store';
import { getErrorMessage, getLoading } from './state/sharedState/shared.selectors';
import { autoLogin } from './state/authState/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'counterWithInputOutput';
  showLoading!:Observable<boolean>;
  errorMsg!:Observable<string>;

  constructor(private store: Store<appStateModel>){}

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMsg = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
