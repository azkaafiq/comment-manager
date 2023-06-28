import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'comments/:postId', component: CommentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
