import { Component } from '@angular/core';
import { ServersService } from './servers.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private serversService : ServersService) {}

  docName = this.serversService.getDocName();

  posts = [
    {
      userId : this.generateUserId(),
      id: this.generateId(),
      title: 'Delhi',
      body: 'Delhi is the capital of India.',
    },
    {
      userId : this.generateUserId(),
      id: this.generateId(),
      title: 'Mount Everest',
      body: 'It is the highest peak on earth.',
    }
  ];
  onAddPost(title: string, body: string) {
    this.posts.push({
      userId: this.generateUserId(),
      id: this.generateId(),
      title: title,
      body: body,
    });
  }

  onSave() {
    this.serversService.storeServers(this.posts)
      .subscribe((response) => {
        console.log(response);
      }, 
      (error) => {
        console.log(error);
      });
  }

  onGet() {
    this.serversService.getServers()
      .subscribe((posts : any[]) => {
        // this.posts = posts;
        console.log(posts);
      },
      (error) =>{
        console.log(error);
      });
  }

  onUpdate() {
    this.serversService.updateServer(this.posts[0])
      .subscribe((response) => {
        console.log(response);
      }, 
      (error) => {
        console.log(error);
      });
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  private generateUserId() {
    return Math.round(Math.random()*1000);
  }
}
