package amigo.tn.entities;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import amigo.tn.security.user.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Document(collection = "reclamations")
public class Reclamation {
    @Id
    private String id;
    private String titre;
    private String description;
    private String auteur;
    private Date dateCreation;
    private Date dateModification;
    private StatutReclamation statut;
    @DBRef
    private User user;
}