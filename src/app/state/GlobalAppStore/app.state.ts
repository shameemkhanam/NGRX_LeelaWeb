import { routerReducer } from "@ngrx/router-store";
import { AuthReducer } from "../authState/auth.reducer";
import { AUTH_STATE_NAME } from "../authState/auth.selectors";
import { counterReducer } from "../counterState/counter.reducer";
import { postsReducer } from "../postsState/posts.reducer";
import { sharedReducer } from "../sharedState/shared.reducer";
import { SHARED_STATE_NAME } from "../sharedState/shared.selectors";

export const appReducer={
    // counter:counterReducer,
    // posts:postsReducer
    [SHARED_STATE_NAME]:sharedReducer,
    [AUTH_STATE_NAME]: AuthReducer,
    router: routerReducer
}