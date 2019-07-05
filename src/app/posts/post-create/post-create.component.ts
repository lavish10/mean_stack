import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle=''
  enteredContent=''
  @Output() postCreated= new EventEmitter<Post>();

  // onAddPost(postInput: HTMLTextAreaElement)
  // {
  //   // alert("You clicked");
  //   // console.log(postInput);
  //   console.dir(postInput);
  //   // this.dummyVar='Hello lavish';
  //   this.dummyVar=postInput.value;
  // }
  onAddPost()
  {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);
  }
}
