package amigo.tn.entities;

import amigo.tn.security.user.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Document(collection = "comments")
@Getter
@Setter
public class Commentaires {

    @Id
    private String id;
    private String content;
    private User user;
    private Date date;
}
