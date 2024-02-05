import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from '../state/postsState/posts.reducer';
import { POSTS_STATE_NAME } from '../state/postsState/posts.selectors';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from '../state/postsState/posts.effects';
import { SinglePostComponent } from './single-post/single-post.component';
const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      { path: 'add-post', component: AddPostComponent },
      { path: 'edit-post/:id', component: EditPostComponent },
    ],
  },
];
@NgModule({
  declarations: [PostsListComponent, AddPostComponent, EditPostComponent, SinglePostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature(POSTS_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects])
  ],
})
export class PostsModule {}
