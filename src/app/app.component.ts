import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'mean-first';
  storedPosts=[];

  onPostAdded(post)
  {
    console.dir(post);
    this.storedPosts.push(post);

  }
}
