import { User } from "./user";

export class Reclamation {
    id: string;
    titre: string;
    description: string;
    dateCreation: Date;
    dateModification: Date;
    statut: StatutReclamation;
    user: User;
  }
  
  export enum StatutReclamation {
    EN_ATTENTE = 'EN_ATTENTE',
    EN_COURS = 'EN_COURS',
    TERMINEE = 'TERMINEE',
    ANNULEE = 'ANNULEE'
  }