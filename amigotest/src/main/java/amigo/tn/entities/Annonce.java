package amigo.tn.entities;

import amigo.tn.security.user.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
@Data
@Getter
@Setter
@Document(collection = "annonces")
public class Annonce {
    @Id
    private String id;
    private String title;
    private String contact;
    private Date startDate;
    private String location;
    @DBRef
    private User user;

    // constructeurs, getters et setters
}
