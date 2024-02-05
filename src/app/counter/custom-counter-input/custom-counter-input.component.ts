import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { appStateModel } from 'src/app/state/GlobalAppStore/app.model';
import { customInput, changeChannel } from 'src/app/state/counterState/counter.actions';
import { Icounter } from 'src/app/state/counterState/counter.model';
import { getChannelName } from 'src/app/state/counterState/counter.selectors';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  channelName!: string;
  channelName$!: Observable<string>;
  channelSubs!: Subscription;

  constructor(private store: Store<appStateModel>) {}

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd() {
    this.store.dispatch(customInput({ value: +this.value }));
  }

  onChange() {
    this.store.dispatch(changeChannel());
  }
}
