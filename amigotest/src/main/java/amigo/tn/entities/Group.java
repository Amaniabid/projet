package amigo.tn.entities;

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
@Document(collection = "groups")
public class Group {

    @Id
    private String id;
    private String name;
    private String description;
    @DBRef
    private List<User> members;
    @DBRef
    private User user;

    public Group() {}

    public Group(String name, String description, List<User> members) {
        this.name = name;
        this.description = description;
        this.members = members;
    }
}
