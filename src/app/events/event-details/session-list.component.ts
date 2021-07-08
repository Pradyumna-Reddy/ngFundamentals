import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ISession } from "../shared";

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[] | undefined
  @Input () filterBy: string = 'all'
  visibleSessions: ISession[] | undefined
  ngOnChanges(changes: SimpleChanges): void {
    if(this.sessions) {
      this.filterSessions(this.filterBy)
    }
  }

  filterSessions(filter: string) {
    if(filter === 'all') {
      this.visibleSessions = this.sessions?.slice(0)
    } else {
      this.visibleSessions = this.sessions?.filter(session =>
        session.level.toLocaleLowerCase() === filter)
    }
  }
}
