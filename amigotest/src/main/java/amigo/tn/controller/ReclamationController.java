package amigo.tn.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import amigo.tn.security.user.User;
import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import amigo.tn.entities.Reclamation;
import amigo.tn.entities.StatutReclamation;
import amigo.tn.repositories.ReclamationRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/reclamations")
public class ReclamationController {
    @Autowired
    private ReclamationRepository reclamationRepository;


    @Autowired
    private UserRepository userRepository;
    @PostMapping("addP")
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation) {
        reclamation.setDateCreation(new Date());
        reclamation.setDateModification(new Date());
        reclamation.setStatut(StatutReclamation.EN_ATTENTE);
        Reclamation savedReclamation = reclamationRepository.save(reclamation);
        return ResponseEntity.ok(savedReclamation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable("id") String id, @RequestBody Reclamation reclamation) {
        Optional<Reclamation> existingReclamation = reclamationRepository.findById(id);
        if (existingReclamation.isPresent()) {
            Reclamation updatedReclamation = existingReclamation.get();
            updatedReclamation.setTitre(reclamation.getTitre());
            updatedReclamation.setDescription(reclamation.getDescription());
            updatedReclamation.setDateModification(new Date());
            Reclamation savedReclamation = reclamationRepository.save(updatedReclamation);
            return ResponseEntity.ok(savedReclamation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/accept/{id}")
    public ResponseEntity<Reclamation> acceptReclamation(@PathVariable("id") String id) {
        Optional<Reclamation> existingReclamation = reclamationRepository.findById(id);
        if (existingReclamation.isPresent()) {
            Reclamation updatedReclamation = existingReclamation.get();
            updatedReclamation.setStatut(StatutReclamation.TERMINEE);
            Reclamation savedReclamation = reclamationRepository.save(updatedReclamation);
            return ResponseEntity.ok(savedReclamation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable("id") String id) {
        Optional<Reclamation> existingReclamation = reclamationRepository.findById(id);
        if (existingReclamation.isPresent()) {
            reclamationRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Reclamation>> getReclamations(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Reclamation> reclamations = reclamationRepository.findByUser(user);
        return ResponseEntity.ok(reclamations);
    }
    @GetMapping("/")
    public ResponseEntity<List<Reclamation>> getReclamationsAll() {
        List<Reclamation> reclamations = reclamationRepository.findAll();
        return ResponseEntity.ok(reclamations);
    }

    @GetMapping("/auteur/{auteur}")
    public ResponseEntity<List<Reclamation>> getReclamationsByAuteur(@PathVariable("auteur") String auteur) {
        List<Reclamation> reclamations = reclamationRepository.findByAuteur(auteur);
        return ResponseEntity.ok(reclamations);
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Reclamation>> getReclamationsByStatut(@PathVariable("statut") StatutReclamation statut) {
        List<Reclamation> reclamations = reclamationRepository.findByStatut(statut);
        return ResponseEntity.ok(reclamations);
    }
}