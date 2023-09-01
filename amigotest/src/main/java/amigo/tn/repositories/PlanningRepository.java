package amigo.tn.repositories;

import amigo.tn.entities.Planning;
import amigo.tn.entities.Publication;
import amigo.tn.security.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanningRepository extends MongoRepository<Planning, String> {
    List<Planning> findByUser(User user);
}
