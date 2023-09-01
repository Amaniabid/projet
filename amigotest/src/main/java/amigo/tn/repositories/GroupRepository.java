package amigo.tn.repositories;

import amigo.tn.entities.Publication;
import amigo.tn.security.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import amigo.tn.entities.Group;

import java.util.List;

@Repository
public interface GroupRepository extends MongoRepository<Group, String>{
    List<Group> findByUser(User user);
    Group save(Group group);

}