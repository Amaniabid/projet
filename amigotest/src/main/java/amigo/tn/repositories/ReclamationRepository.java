package amigo.tn.repositories;

import java.util.List;

import amigo.tn.entities.Publication;
import amigo.tn.security.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import amigo.tn.entities.Reclamation;
import amigo.tn.entities.StatutReclamation;

@Repository
public interface ReclamationRepository extends MongoRepository<Reclamation, String> {
    List<Reclamation> findByUser(User user);
    List<Reclamation> findByAuteur(String auteur);
    List<Reclamation> findByStatut(StatutReclamation statut);
}