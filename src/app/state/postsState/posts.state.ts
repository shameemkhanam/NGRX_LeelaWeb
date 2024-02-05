import { createEntityAdapter } from '@ngrx/entity';
import { IPost, IPosts } from './posts.model';

export const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: sortByName
});

// export const postsInitialState: IPosts = {
//   posts: [],
// };

export const postsInitialState: IPosts = postsAdapter.getInitialState({
  count:0
});

export function sortByName(a:IPost, b:IPost){
  return a.title.localeCompare(b.title); //  posts in ascending order 

  //for posts in descending order
  // const desc = a.title.localeCompare(b.title);

  // if(desc > 0){
  //   return -1;
  // }
  // if(desc < 0){
  //   return 1;
  // }
  // return desc;
}