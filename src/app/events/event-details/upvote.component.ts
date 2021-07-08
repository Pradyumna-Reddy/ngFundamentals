import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'upvote',
  styleUrls: ['./upvote.component.css'],
  template: `
  <div class="votingWidgetContainer pointable" (click)="onClick()">
    <div class="well votingWidget">
      <div class="votingButton">
        <i [style.color]="iconColor" class="glyphicon glyphicon-heart"></i>
      </div>
      <div class="badge badge-inverse votingCount">
        <div>{{count}}</div>
      </div>
    </div>
</div>
  `
})
export class UpvoteComponent {
  @Input() count: number = 0
  @Input() set voted(val: boolean){
    this.iconColor = val ? 'red' : 'gray'
  }
  @Output() vote = new EventEmitter
  iconColor: string = 'gray'

  onClick() {
    this.vote.emit({})
  }
}
