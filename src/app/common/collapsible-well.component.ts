import { Component, Input } from "@angular/core";

@Component({
  selector: 'collapsible-well',
  template: `
  <div (click)="toggleContent()" class="well pointable">
    <h4 class="well-title">
      <ng-content select="[well-title]"></ng-content>
    </h4>
    <ng-content *ngIf="visible" select="[well-body]"></ng-content>
  </div>
  `
})
export class CollabsibleWellComponent {
  visible: boolean = false

  toggleContent() {
    this.visible = !this.visible
  }
}
