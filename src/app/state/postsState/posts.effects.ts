import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from 'src/app/services/posts.service';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  dummyAction,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import { filter, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { appStateModel } from '../GlobalAppStore/app.model';
import { setErrorMessage } from '../sharedState/shared.actions';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATION, RouterNavigatedAction, routerNavigationAction } from '@ngrx/router-store';
import { IPost } from './posts.model';
import { Update } from '@ngrx/entity';
import { getPosts } from './posts.selectors';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<appStateModel>,
    private router: Router
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action,posts]) => {
        if(!posts.length){
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostsSuccess({ posts });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post, redirect: true });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            const updatedPost: Update<IPost>= {
              id: action.post.id,
              changes:{
                ...action.post
              }
            };
            return updatePostSuccess({ post: updatedPost, redirect: true });
          })
        );
      })
    );
  });

  // loginRedirect$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(...[loginSuccess, signupSuccess]),
  //       tap((action) => {
  //         this.store.dispatch(setErrorMessage({ message: '' }));
  //         if (action.redirect) {
  //           this.router.navigate(['/']);
  //         }
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  onPostRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[addPostSuccess, updatePostSuccess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['posts']);
          }
        })
      );
    },
    { dispatch: false }
  );

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction)=>{
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id,posts])=>{
        if(!posts.length){
          return this.postsService.getPosts().pipe(map((post)=>{
            // const postData = [{...post,id}];
            return loadPostsSuccess({posts:post});
          }));
        }
        return of(dummyAction());
      })
    );
  });
}
