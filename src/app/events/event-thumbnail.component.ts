import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IEvent } from "./shared/index";

@Component({
  selector: 'event-thumbnail',
  template: `
  <div [routerLink]="['/events', event?.id]" class="well hoverwell thumbnail">
    <h2>{{event?.name | uppercase}}</h2>
    <div>Date: {{event?.date | date:'shortDate'}}</div>
    <div [ngStyle]="getStartTimeStyle()"
      [ngSwitch]="event?.time">
      Time: {{event?.time}}
      <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
      <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
      <span *ngSwitchDefault>(Normal Start)</span>
    </div>
    <div>Price: {{event?.price | currency:'INR'}}</div>
    <div *ngIf="event?.location">
      <span>Location: {{event?.location?.address}}</span>
      <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
    </div>
    <div *ngIf="event?.onlineUrl">
      Online URL: {{event?.onlineUrl}}
    </div>
  </div>
  `,
  styles: [`
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
    .thumbnail { min-height: 210px; }
    .green { color: #003300 !important; }
    .bold { font-weight: bold }
    `]
})

export class EventThumbnailComponent {
  @Input() event: IEvent | undefined

  getStartTimeStyle(): any {
    // const isEarlyStart = this.event && this.event.time === '8:00 am'
    // return {green: isEarlyStart, bold: isEarlyStart}
    // if (this.event && this.event.time === '8:00 am') {
    //   return 'green bold'
    // }
    // return ''

    // [ngStyle]
    if (this.event && this.event.time === '8:00 am'){
      return { color: '#003300', 'font-weight': 'bold'} // Can use ternary exp to eval vals
    }
    return {}
  }
}
