package amigo.tn.controller;

import java.util.Date;
import java.util.List;

import amigo.tn.entities.Annonce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import amigo.tn.entities.Event;
import amigo.tn.services.EventService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/retriev/{id}")
    public List<Event> getEvents(@PathVariable String id,@RequestParam(required = false) Date start,
                                  @RequestParam(required = false) Date end,
                                  @RequestParam(required = false) String attendee,
                                  @RequestParam(required = false) String location) {
        if (start != null && end != null) {
            return eventService.getEventsBetween(start, end);
        } else if (attendee != null) {
            return eventService.getEventsByAttendee(attendee);
        } else if (location != null) {
            return eventService.getEventsByLocation(location);
        } else {
            return eventService.getAllEvents(id);
        }
    }

    @PostMapping("/addE")
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }
    @PutMapping("/{id}")
    public Event updatePublication(@PathVariable String id, @RequestBody Event event) {
        return eventService.updateEvent(id, event);
    }
}