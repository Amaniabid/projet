package amigo.tn.services;

import java.util.Date;
import java.util.List;

import amigo.tn.entities.Annonce;
import amigo.tn.security.user.User;
import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amigo.tn.entities.Event;
import amigo.tn.repositories.EventRepository;

@Service
public class EventService {
@Autowired
private EventRepository eventRepository;


    @Autowired
    private UserRepository userRepository;
public List<Event> getEventsBetween(Date start, Date end) {
    return eventRepository.findByStartDateBetween(start, end);
}

public List<Event> getEventsByAttendee(String attendee) {
    return eventRepository.findByAttendeesContains(attendee);
}

public List<Event> getEventsByLocation(String location) {
    return eventRepository.findByLocation(location);
}

public Event createEvent(Event event) {
    return eventRepository.save(event);
}

public void deleteEvent(String id) {
    eventRepository.deleteById(id);
}

public List<Event> getAllEvents(String idUser) {
    User user = userRepository.findById(idUser)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
	return eventRepository.findByUser(user);
}
    public Event updateEvent(String id, Event avent) {
        Event existingEvent = eventRepository.findById(id).orElse(null);
        if (existingEvent != null) {
            existingEvent.setTitle(avent.getTitle());
            existingEvent.setDescription(avent.getDescription());
            existingEvent.setStartDate(avent.getStartDate());
            existingEvent.setEndDate(avent.getEndDate());
            existingEvent.setLocation(avent.getLocation());
            return eventRepository.save(existingEvent);
        }
        return null;
    }
}