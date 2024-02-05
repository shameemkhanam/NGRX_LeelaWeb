import { Action, createReducer, on } from '@ngrx/store';
import { initialSharedState } from './shared.state';
import { setErrorMessage, setLoadingSpinner } from './shared.actions';
import { ISharedState } from './shared.model';

const _sharedReducer = createReducer(
  initialSharedState,
  on(setLoadingSpinner, (state,action) => {
    return {
      ...state,
      show_loading:action.status
    };
  }),
  on(setErrorMessage, (state,action)=>{
    return {
        ...state,
        errorMessage : action.message
    }
  })
);

export function sharedReducer(state: ISharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
