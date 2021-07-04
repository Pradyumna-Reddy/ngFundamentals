import { Component } from "@angular/core";

@Component({
  selector: 'events-list',
  template: `
  <div>
    <h1>Upcoming Angular Events</h1>
    <hr>
    <event-thumbnail (eventClick)="handleEventClicked($event)" [event]="event1"></event-thumbnail>
  </div>
  `
})

export class EventsListComponent{
  event1 = {
    id: 1,
    name: 'Angular Connect',
    date: '9/06/2051',
    time: '10:00am',
    price: 466.66,
    imageUrl: '/assets/images/angularconnect-shield.png',
    location: {
      address: '1010 NJ',
      city: 'Kondi',
      country: 'Wakanda'
    }
  }
  handleEventClicked(data: any){
    console.log(data);
  }
}
