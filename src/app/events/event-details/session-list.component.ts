import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { AuthService } from "src/app/user/auth.service";
import { ISession } from "../shared";
import { VoterService } from "./voter.service";

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[] | undefined
  @Input () filterBy: string = 'all'
  @Input() sortBy : string = 'votes'
  @Input() eventId: number | undefined
  visibleSessions: ISession[] | undefined

  constructor(public auth: AuthService, private voterService: VoterService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.sessions) {
      this.filterSessions(this.filterBy)
      this.sortBy === 'name'
        ? this.visibleSessions?.sort(sortByNameAsc)
        : this.visibleSessions?.sort(sortByVotesDesc)
    }
  }

  toggleVote(session: ISession) {
    if(this.auth.currentUser?.userName && this.eventId) {
      if(this.userHasVoted(session)) {
        this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser?.userName)
      } else {
        this.voterService.addVoter(this.eventId, session, this.auth.currentUser?.userName)
      }
      if(this.sortBy === 'votes')
        this.visibleSessions?.sort(sortByVotesDesc)
    }
  }

  userHasVoted(session: ISession) {
    if(this.auth.currentUser?.userName) {
      return this.voterService.userHasVoted(session,
        this.auth.currentUser?.userName)
    }
    return false
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
