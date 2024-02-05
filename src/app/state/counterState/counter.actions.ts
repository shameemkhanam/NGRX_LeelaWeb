import { createAction, props } from "@ngrx/store";

export const increment = createAction('Increment');
export const decrement = createAction('Decrement');
export const reset = createAction('Reset');
export const customInput = createAction('Custom input', props<{value:number}>());
export const changeChannel = createAction('Change channel');