import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  post: any = {};
  comments: any[] = [];
  postId: number = 0;
  filter: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = +params['postId'];
      this.loadPost();
      this.loadComments();
    });
  }

  loadPost() {
    this.apiService.getPost(this.postId).subscribe(
      (post: any) => {
        this.post = post;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadComments() {
    this.apiService.getPostComments(this.postId)
      .pipe(
        map((response: any) => response as any[])
      )
      .subscribe(
        (comments: any[]) => {
          this.comments = comments;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  filterComments(filterValue: string) {
    this.filter = filterValue.trim();
    if (this.filter) {
        const filteredComments = this.comments.filter(comment =>
            comment.name.includes(this.filter) ||
            comment.email.includes(this.filter) ||
            comment.body.includes(this.filter)
        );
        this.comments = filteredComments;
    } else {
        this.loadComments();
    }
  }

}
