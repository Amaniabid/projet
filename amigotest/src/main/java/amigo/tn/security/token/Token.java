package amigo.tn.security.token;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import amigo.tn.security.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tokens")
public class Token {

  @Id
  private String id;


  private String token;

  
  private TokenType tokenType = TokenType.BEARER;

  private boolean revoked;

  private boolean expired;

  @DBRef
  private User user;
}
