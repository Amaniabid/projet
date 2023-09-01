package amigo.tn.repositories;

import amigo.tn.entities.Commentaires;
import amigo.tn.entities.Publication;
import amigo.tn.security.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Commentaires, String> {
    List<Commentaires> findByUser(User user);
}