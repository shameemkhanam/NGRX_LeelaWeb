import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Icounter } from "./counter.model";

export const COUNTER_STATE_NAME = 'counter';

const getCounterState = createFeatureSelector<Icounter>(COUNTER_STATE_NAME);

export const getCounter = createSelector(getCounterState, (state)=>{
    return state.counter;
})

export const getChannelName = createSelector(getCounterState, (state)=>{
    return state.channelName;
})