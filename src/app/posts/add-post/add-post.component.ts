import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appStateModel } from 'src/app/state/GlobalAppStore/app.model';
import { addPost } from 'src/app/state/postsState/posts.actions';
import { IPost } from 'src/app/state/postsState/posts.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{
  addPostForm!: FormGroup;

  constructor(private fb:FormBuilder, private store: Store<appStateModel>){}

  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      title : ['',Validators.required],
      description:['', Validators.required]
    })
  }

  showDescErrors(){
    const description = this.addPostForm.get('description');
    if(description?.touched && !description.valid){
      if(description?.errors?.['required']){
        return 'Description is required.';
      }
    }
    return undefined;
  }

  onAddPost(){
    if(!this.addPostForm.valid){
      return;
    }

    const post: IPost = {
      title: this.addPostForm.value.title,
      description: this.addPostForm.value.description
    }

    this.store.dispatch(addPost({post}));
    
  }


}
