package amigo.tn.services;
import amigo.tn.security.user.Role;
import amigo.tn.security.user.User;
import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public List<User> getAllUsersByRoleUser() {
        return userRepository.findByRole(Role.USER);
    }

}
