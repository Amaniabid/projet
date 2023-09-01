package amigo.tn.entities;

import amigo.tn.security.user.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Data
@Getter
@Setter
@Document(collection = "plannings")
public class Planning {
    @Id
    private String id;
    private Date date;
    private String description;
    private String titre;
    @DBRef
    private User user;

    // constructeurs, getters et setters
}