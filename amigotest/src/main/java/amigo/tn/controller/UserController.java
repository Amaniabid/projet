package amigo.tn.controller;

import amigo.tn.entities.Reclamation;

import amigo.tn.security.user.UserRepository;
import amigo.tn.services.AnnonceService;
import amigo.tn.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import amigo.tn.security.user.User;


import java.util.List;
import java.util.Optional;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/role")
    public List<User> getAllUsersByRoleUser() {
        return userService.getAllUsersByRoleUser();
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setFirstname(user.getFirstname());
            updatedUser.setLastname(user.getLastname());
            if(!user.getPassword().isEmpty())
                updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedReclamation = userRepository.save(updatedUser);
            return ResponseEntity.ok(savedReclamation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
