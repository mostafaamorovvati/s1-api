import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SendSmsEvent } from '@/modules/user/event/send-sms.event';

@EventsHandler(SendSmsEvent)
export class SendSmsEventHandler implements IEventHandler<SendSmsEvent> {
  constructor() {}

  handle(event: SendSmsEvent) {
    console.log(`"${event.displayName}" created`);
  }
}
