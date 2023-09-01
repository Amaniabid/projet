import { Publication } from "./publication";

export class User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    roles: string[];
    events: Event[];
    profileImage: File;
    publications: Publication[];
    userName:string;

  }