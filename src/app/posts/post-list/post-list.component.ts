import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() posts: Post[] = [ ];
    // {title:"First Post", content: "qwertyu12345678"},
    // {title:"Second Post", content: "qwerty567890"},
    // {title:"Third Post", content: "qwerty0987654e3wqu"}
  // ]
  constructor() { }

  ngOnInit() {
  }

}
