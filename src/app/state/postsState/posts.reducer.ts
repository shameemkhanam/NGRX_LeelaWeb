import { createReducer, on } from '@ngrx/store';
import { postsAdapter, postsInitialState } from './posts.state';
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';

const _postsReducer = createReducer(
  postsInitialState,
  // on(addPost, (state, action) => {
  //   let post = { ...action.post };
  //   post.id = (state.posts.length + 1).toString();
  //   return {
  //     ...state,
  //     posts: [...state.posts, post],
  //   };
  // }),

  on(addPostSuccess, (state, action) => {
      // let post = { ...action.post };
      // return {
      //   ...state,
      //   posts: [...state.posts, post],
      // };
      // return postsAdapter.addOne(action.post, state);
      return postsAdapter.addOne(action.post, {...state, count: state.count+1});

    }),  
  // on(updatePost, (state, action) => {
  //   const updatedPost = state.posts.map((post)=>{
  //     return action.post.id === post.id ? action.post : post;
  //   })
  //   return {
  //     ...state,
  //     posts : updatedPost
  //   }
  // }),
  on(updatePostSuccess, (state, action) => {
    // const updatedPost = state.posts.map((post)=>{
    //   return action.post.id === post.id ? action.post : post;
    // })
    // return {
    //   ...state,
    //   posts : updatedPost
    // }

    return postsAdapter.updateOne(action.post,state);
  }),
  
  on(deletePostSuccess, (state, {id}) => {
    // const updatedPost = state.posts.filter((post)=>{
    //   return post.id !== id;
    // });
    // return {
    //   ...state,
    //   posts : updatedPost
    // }
    return postsAdapter.removeOne(id,state);
  }),
  on(loadPostsSuccess, (state,action)=>{
    // return{
    //   ...state,
    //   posts: action.posts
    // }
    return postsAdapter.setAll(action.posts, state);
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
