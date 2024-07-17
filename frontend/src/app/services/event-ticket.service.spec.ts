import { TestBed } from '@angular/core/testing';

import { EventTicketService } from './event-ticket.service';

describe('EventTicketService', () => {
  let service: EventTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
