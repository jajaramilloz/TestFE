import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() dish;
  comments;

  constructor() {
    this.comments = this.dish.comments.map((c) => {
      return {
        comment: c.comment,
        rating: c.rating,
        author: c.author,
        date: c.createdAt
      };
    })
   }

  ngOnInit(): void {
  }

}