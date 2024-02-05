import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { appStateModel } from 'src/app/state/GlobalAppStore/app.model';
import { increment, decrement, reset } from 'src/app/state/counterState/counter.actions';
import { Icounter } from 'src/app/state/counterState/counter.model';


@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent {
  // @Output() increment = new EventEmitter<void>();
  // @Output() decrement = new EventEmitter<void>();
  // @Output() reset = new EventEmitter<void>();

  // onIncrement(){
  //   this.increment.emit();
  // }

  // onDecrement(){
  //   this.decrement.emit();
  // }

  // onReset(){
  //   this.reset.emit();
  // }

  constructor(private store: Store<appStateModel>){}

  onIncrement(){
    this.store.dispatch(increment());
  }
  
  onDecrement(){
    this.store.dispatch(decrement());
  }

  onReset(){
    this.store.dispatch(reset());
  }

}
