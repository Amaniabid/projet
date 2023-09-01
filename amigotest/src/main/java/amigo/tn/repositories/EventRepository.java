package amigo.tn.repositories;

import java.util.Date;
import java.util.List;

import amigo.tn.entities.Publication;
import amigo.tn.security.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import amigo.tn.entities.Event;

@Repository

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByUser(User user);
    List<Event> findByStartDateBetween(Date start, Date end);
    List<Event> findByAttendeesContains(String attendee);
    List<Event> findByLocation(String location);
}