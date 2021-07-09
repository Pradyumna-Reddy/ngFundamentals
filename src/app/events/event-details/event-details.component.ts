import { Component, OnInit } from "@angular/core";
import { EventService } from "../shared/event.service";
import { ActivatedRoute, Params } from "@angular/router";
import { IEvent, ISession } from "../shared";

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left: 20px; padding-right: 20px; }
    .event-image { height: 100px }
    a { cursor: pointer }
  `]
})
export class EventDetailsComponent implements OnInit {
  event: IEvent | undefined
  addMode: boolean = false
  filterBy: string = "all"
  sortBy: string = 'votes'
  constructor(private eventService: EventService,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.data.forEach((data: any) => {
        this.event = data['event']
        // resetting other state of the component or you can call a method which resets state
        this.addMode = false
      })
    // this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  }

  addSession() {
    this.addMode = true
  }

  saveNewSession(session: ISession) {
    let nextId = 0
    if(this.event?.sessions)
      nextId = Math.max.apply(null, this.event?.sessions.map(s => s.id))
    session.id = nextId + 1
    this.event?.sessions.push(session)
    if(this.event)
      this.eventService.saveEvent(this.event).subscribe()
    this.addMode = false
  }

  cancelAddSession() {
    this.addMode = false
  }
}
