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
@Document(collection = "events")
public class Event {
    @Id
    private String id;
    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private List<String> attendees;
    private String location;
    @DBRef
    private User user;

    // constructeurs, getters et setters
}