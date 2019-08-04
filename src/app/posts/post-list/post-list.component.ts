import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  isLoading = false;
  posts: Post[] = [];
  private postsSub: Subscription;
  // {title:"First Post", content: "qwertyu12345678"},
  // {title:"Second Post", content: "qwerty567890"},
  // {title:"Third Post", content: "qwerty0987654e3wqu"}
  // ]

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    // this.posts = this.postsService.getPosts();
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
}
