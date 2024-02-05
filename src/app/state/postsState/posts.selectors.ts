import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPost, IPosts } from './posts.model';
import { getCurrentRoute } from '../sharedState/router/router.selector';
import { RouterStateUrl } from '../sharedState/router/custom-serializer';
import { postsAdapter } from './posts.state';

export const POSTS_STATE_NAME = 'posts';

export const postsSelectors = postsAdapter.getSelectors();

const getPostsState = createFeatureSelector<IPosts>(POSTS_STATE_NAME);

// export const getPosts = createSelector(getPostsState, (state) => {
//   return state.posts;
// });

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);
export const getPostEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  // getPosts,
  // getCurrentRoute,
  // (posts, route: RouterStateUrl) => {
  //   return posts ? posts.find((post: IPost) => post.id === route.params['id']) : null;
  // }

  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);

export const getCount = createSelector(getPostsState, (state)=>{
  return state.count;
})