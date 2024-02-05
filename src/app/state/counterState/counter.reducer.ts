import { createReducer, on } from '@ngrx/store';
import { initialState } from './counter.state';
import { changeChannel, customInput, decrement, increment, reset } from './counter.actions';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
        ...state,
        counter : state.counter+1
    }
  }),
  on(decrement, (state)=>{
    return {
        ...state,
        counter : state.counter-1
    }
  }),
  on(reset, (state)=>{
    return {
        ...state,
        counter : 0
    }
  }),
  on(customInput, (state, action)=>{
    console.log(action);
    
    return {
      ...state,
      counter:state.counter + action.value
    }
  }),
  on(changeChannel, (state)=>{
    return{
      ...state,
      channelName: 'Hello World!'
    }
  })
);

export function counterReducer(state:any, action:any) {
  return _counterReducer(state, action);
}
