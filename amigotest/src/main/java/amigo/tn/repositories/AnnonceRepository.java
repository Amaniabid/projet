package amigo.tn.repositories;

import amigo.tn.entities.Annonce;
import amigo.tn.security.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnonceRepository extends MongoRepository<Annonce, String> {
    List<Annonce> findByUser(User user);
}
