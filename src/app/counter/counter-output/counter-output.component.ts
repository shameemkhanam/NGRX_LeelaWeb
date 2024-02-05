import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { appStateModel } from 'src/app/state/GlobalAppStore/app.model';
import { Icounter } from 'src/app/state/counterState/counter.model';
import { getCounter } from 'src/app/state/counterState/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit{
  counter!:number;
  counter$! : Observable<number>;
  counterSubs!:Subscription;

  // @Input() counter!: number;

  constructor(private store: Store<appStateModel>){}

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }

  

}
