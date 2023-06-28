import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts!: any[]; // Add definite assignment assertion

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllPosts().subscribe({
      next: (posts: any[]) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error(error); // Handle any potential errors
      }
    });
  }
}
