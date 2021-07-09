import { VoterService } from "./voter.service";
import { ISession } from "../index";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

describe('VoterService', () => {
  let voterService: VoterService
  let mockHttp: any
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
    voterService = new VoterService(mockHttp)
  })

  describe('deleteVoter', () => {
    it('should remove the voters from the list of voters', () => {
      let session = { id: 1, voters: ["joe", "john"] }

      mockHttp.delete.and.returnValue(of(false))
      voterService.deleteVoter(3, <ISession><unknown>session, "joe")

      expect(session.voters.length).toBe(1)
      expect(session.voters[0]).toBe("john")
    })
  })
})
