import { Action, createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { IAuth } from './auth.model';
import { autoLogout, loginSuccess, signupSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, action) => {
    console.log(action);
    
    return{
        ...state,
        user: action.user
    }
  }),
  on(signupSuccess,(state, action)=>{
    return{
      ...state,
      user:action.user
    }
  }),
  on(autoLogout, (state)=>{
    return{
      ...state,
      user:null
    }
  })
);

export function AuthReducer(state: IAuth | undefined, action: Action) {
  return _authReducer(state, action);
}
