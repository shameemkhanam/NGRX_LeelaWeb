import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { appStateModel } from 'src/app/state/GlobalAppStore/app.model';
import { updatePost } from 'src/app/state/postsState/posts.actions';
import { IPost } from 'src/app/state/postsState/posts.model';
import { getPostById } from 'src/app/state/postsState/posts.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  editPostForm!: FormGroup;
  postSubs!: Subscription;
  post!: IPost;

  constructor(
    // private route: ActivatedRoute,
    private store: Store<appStateModel>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.postSubs = this.store.select(getPostById).subscribe((post) => {
      if (post) {
        this.post = post;
        this.editPostForm.patchValue({
          title: post.title,
          description: post.description,
        });
      }
    });

    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   this.postSubs = this.store
    //     .select(getPostById, { id })
    //     .subscribe((data) => {
    //       this.post = data;
    //       console.log(this.post);
    //       this.createForm();
    //     });
    // });
  }

  showDescErrors() {
    const description = this.editPostForm.get('description');
    if (description?.touched && !description.valid) {
      if (description?.errors?.['required']) {
        return 'Description is required.';
      }
    }
    return undefined;
  }

  createForm() {
    this.editPostForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  onEditPost() {
    if (this.editPostForm.invalid) {
      return;
    }

    const title = this.editPostForm.value.title;
    const description = this.editPostForm.value.description;

    const post: IPost = {
      id: this.post.id,
      title,
      description,
    };

    this.store.dispatch(updatePost({ post }));
    // this.router.navigate(['posts']);
  }

  ngOnDestroy(): void {
    if (this.postSubs) {
      this.postSubs.unsubscribe();
    }
  }
}
