import { RouterReducerState } from "@ngrx/router-store";
import { IAuth } from "../authState/auth.model";
import { AUTH_STATE_NAME } from "../authState/auth.selectors";
import { Icounter } from "../counterState/counter.model";
import { IPosts } from "../postsState/posts.model";
import { ISharedState } from "../sharedState/shared.model";
import { SHARED_STATE_NAME } from "../sharedState/shared.selectors";

export interface appStateModel{
    // counter: Icounter,
    // posts: IPosts
    [SHARED_STATE_NAME] : ISharedState;
    [AUTH_STATE_NAME] : IAuth;
    router: RouterReducerState
}