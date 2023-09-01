package amigo.tn.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import amigo.tn.entities.Publication;
import amigo.tn.security.user.User;
@Repository
public interface PublicationRepository extends MongoRepository<Publication, String>  {
    List<Publication> findByUser(User user);
    @Query("{'user.id': ?0}")
    List<Publication> findByUserIdOrderByDate(String userId, Sort sort);
}
