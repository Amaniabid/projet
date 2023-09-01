import { User } from "./user";

export class Group {
    id: string;
    name: string;
    description: string;
    members: User[];
    user: User;
  }