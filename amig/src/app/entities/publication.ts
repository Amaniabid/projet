import { Commentaires } from "./comment";
import { User } from "./user";

export class Publication {
    id: string;
    titre: string;
    contenu: string;
    date: string;
    likes: number;
    commentaires: Commentaires[];
    user: User;
  }