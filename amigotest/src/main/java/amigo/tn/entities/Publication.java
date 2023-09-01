package amigo.tn.entities;

import java.util.Collections;
import java.util.Comparator;
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
@Document(collection = "publications")
public class Publication {
    @Id
    private String id;
    private String titre;
    private String contenu;
    private int likes;
    private Date date;
    @DBRef
    private List<Commentaires> commentaires;
    @DBRef
    private User user;
    public void sortCommentsByDate() {
        if(commentaires!=null)
            Collections.sort(commentaires, Comparator.comparing(Commentaires::getDate));
    }
}