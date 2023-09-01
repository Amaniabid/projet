import { User } from "./user";

export class Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    attendees: any[];
    location: string;
    user: User;
  }




  