package amigo.tn.services;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import amigo.tn.security.user.User;
import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amigo.tn.entities.Reclamation;
import amigo.tn.entities.StatutReclamation;
import amigo.tn.repositories.ReclamationRepository;
import javassist.NotFoundException;

@Service
public class ReclamationService {
    @Autowired
    private ReclamationRepository reclamationRepository;

    @Autowired
    private UserRepository userRepository;

    public Reclamation createReclamation(Reclamation reclamation) {
        reclamation.setDateCreation(new Date());
        reclamation.setDateModification(new Date());
        reclamation.setStatut(StatutReclamation.EN_ATTENTE);
        return reclamationRepository.save(reclamation);
    }

    public Reclamation updateReclamation(String id, Reclamation reclamation) {
        try {
            Optional<Reclamation> existingReclamation = reclamationRepository.findById(id);
            if (existingReclamation.isPresent()) {
                Reclamation updatedReclamation = existingReclamation.get();
                updatedReclamation.setTitre(reclamation.getTitre());
                updatedReclamation.setDescription(reclamation.getDescription());
                updatedReclamation.setDateModification(new Date());
                return reclamationRepository.save(updatedReclamation);
            } else {
                throw new NotFoundException("Reclamation non trouvée");
            }
        } catch (NotFoundException ex) {
            // handle the exception here, for example:
            System.out.println("Exception caught: " + ex.getMessage());
            return null; // or throw a different exception, or handle it in some other way
        }
    }

    public void deleteReclamation(String id) throws NotFoundException {
        Optional<Reclamation> existingReclamation = reclamationRepository.findById(id);
        if (existingReclamation.isPresent()) {
            reclamationRepository.deleteById(id);
        } else {
            throw new NotFoundException("Reclamation non trouvée");
        }
    }

    public List<Reclamation> getReclamations(String idUser) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return reclamationRepository.findByUser(user);
    }

    public Reclamation getReclamation(String id) throws NotFoundException {
        Optional<Reclamation> reclamation = reclamationRepository.findById(id);
        if (reclamation.isPresent()) {
            return reclamation.get();
        } else {
            throw new NotFoundException("Reclamation non trouvée");
        }
    }

    public List<Reclamation> getReclamationsByAuteur(String auteur) {
        return reclamationRepository.findByAuteur(auteur);
    }

    public List<Reclamation> getReclamationsByStatut(StatutReclamation statut) {
        return reclamationRepository.findByStatut(statut);
    }
}
