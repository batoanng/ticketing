import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@joker7nbt-ticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
