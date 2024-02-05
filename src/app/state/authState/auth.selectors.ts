import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuth } from "./auth.model";

export const AUTH_STATE_NAME= 'auth';

const getAuthState = createFeatureSelector<IAuth>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state)=>{
    return state.user? true: false;
});

export const getToken = createSelector(getAuthState, (state)=>{
    return state.user ? state.user.userToken : null;
})