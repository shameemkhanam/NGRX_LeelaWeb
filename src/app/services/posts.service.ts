import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPost } from '../state/postsState/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>(`https://authngrx-1-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: IPost[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: IPost): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://authngrx-1-default-rtdb.firebaseio.com/posts.json`,
      post
    );
  }

  updatePost(post: IPost) {
    const postData = {[post.id] : {title: post.title, description : post.description} };
    return this.http.patch(
      `https://authngrx-1-default-rtdb.firebaseio.com/posts.json`,
      postData
    );
  }

  deletePost(id:string){
    return this.http.delete(`https://authngrx-1-default-rtdb.firebaseio.com/posts/${id}.json`);
  }

  getPost_byId(id:string):Observable<IPost>{
    return this.http.get<IPost>(`https://authngrx-1-default-rtdb.firebaseio.com/posts/${id}.json`);
  }


}
