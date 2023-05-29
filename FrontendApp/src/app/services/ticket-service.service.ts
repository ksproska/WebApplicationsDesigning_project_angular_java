import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketInfo} from "../models/ticket-info";
import {environment} from "../../environments/environment";
import {VerificationMessage} from "../models/verification-message";

const host = environment.backendEndpoint;
const userApiPrefix = '/passenger/tickets'
const ticketCollectorApiPrefix = '/ticket-collector/tickets'

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {
  constructor(private readonly http: HttpClient) {
  }

  getAllTicketInfoForUserId(userId: number): Observable<TicketInfo[]> {
    return this.http.get<TicketInfo[]>(`${host}${userApiPrefix}/${userId}`);
  }

  putSingleTicket(offerId: number, userId: number, tramId: string) {
    return this.http.put(`${host}${userApiPrefix}/buy/singleticket`,
      {
        "offerId": offerId,
        "userId": userId
      }
    );
  }

  putSeasonTicket(offerId: number, userId: number) {
    return this.http.put(`${host}${userApiPrefix}/buy/seasonticket`,
      {
        "offerId": offerId,
        "userId": userId
      }
    );
  }

  putCommuterPass(offerId: number, userId: number) {
    return this.http.put(`${host}${userApiPrefix}/buy/commuterpass`,
      {
        "offerId": offerId,
        "userId": userId
      }
    );
  }

  isTicketActive(ticketId: any, tramId: any="null"): Observable<VerificationMessage> {
    if (tramId == "") {
      tramId = "null"
    }
    return this.http.get<VerificationMessage>(`${host}${ticketCollectorApiPrefix}/${ticketId}/verify/${tramId}`);
  }

  activeTicket(ticketId: number, tramId: string="null") {
    if (tramId == "") {
      tramId = "null"
    }
    return this.http.put(`${host}${ticketCollectorApiPrefix}/${ticketId}/activate/${tramId}`, {});
  }
}
