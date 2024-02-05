import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateModel } from 'src/app/state/GlobalAppStore/app.model';
import { IPost } from 'src/app/state/postsState/posts.model';
import { getPostById } from 'src/app/state/postsState/posts.selectors';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  post!: Observable<IPost>;

  constructor(private store: Store<appStateModel>) {}

  ngOnInit(): void {
    this.post = this.store.select(getPostById);
  }
}
