import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ISession } from "../shared";

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[] | undefined
  @Input () filterBy: string = 'all'
  @Input() sortBy : string = 'votes'
  visibleSessions: ISession[] | undefined
  ngOnChanges(changes: SimpleChanges): void {
    if(this.sessions) {
      this.filterSessions(this.filterBy)
      this.sortBy === 'name'
        ? this.visibleSessions?.sort(sortByNameAsc)
        : this.visibleSessions?.sort(sortByVotesDesc)
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

function sortByNameAsc(a: ISession, b: ISession) {
  if(a.name > b.name) return 1
  else if (a.name === b.name) return 0
  else return -1
}

function sortByVotesDesc(a: ISession, b: ISession) {
  return b.voters.length - a.voters.length
}
