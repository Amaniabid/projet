package amigo.tn.security.token;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;



public interface TokenRepository extends MongoRepository<Token, String> {

	 @Query(value = "{" +
	          "'user._id': ?0, " +
	          "'$or': [ " +
	          "    {'expired': false}, " +
	          "    {'revoked': false} " +
	          "] " +
	  "}")
	 List<Token> findAllValidTokenByUser(String id);

	  Optional<Token> findByToken(String token);
}