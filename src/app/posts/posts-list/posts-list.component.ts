import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateModel } from 'src/app/state/GlobalAppStore/app.model';
import { deletePost, loadPosts } from 'src/app/state/postsState/posts.actions';
import { IPost } from 'src/app/state/postsState/posts.model';
import { getCount, getPosts } from 'src/app/state/postsState/posts.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit{

  posts!: Observable<IPost[]>;
  count!: Observable<number>;

  constructor(private store: Store<appStateModel>){}

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.count = this.store.select(getCount);
    this.store.dispatch(loadPosts());
  }

  onDelete(id:any){
    if(confirm('Are u sure to delete?')){
      console.log('delete the post');
      this.store.dispatch(deletePost({id}));
    }
  }

}
