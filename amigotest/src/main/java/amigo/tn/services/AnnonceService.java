package amigo.tn.services;

import amigo.tn.entities.Annonce;
import amigo.tn.entities.Publication;
import amigo.tn.repositories.AnnonceRepository;
import amigo.tn.repositories.AnnonceRepository;
import amigo.tn.security.user.User;
import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnonceService {
    @Autowired
    private AnnonceRepository annonceRepository;

    @Autowired
    private UserRepository userRepository;
    public Annonce createAnnonce(Annonce annonce) {
        return annonceRepository.save(annonce);
    }

    public void deleteAnnonce(String id) {
        annonceRepository.deleteById(id);
    }

    public List<Annonce> getAllAnnonces(String idUser) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return annonceRepository.findByUser(user);
    }
    public Annonce updateAnnonce(String id, Annonce annonce) {
        Annonce existingAnnonce = annonceRepository.findById(id).orElse(null);
        if (existingAnnonce != null) {
            existingAnnonce.setTitle(annonce.getTitle());
            existingAnnonce.setContact(annonce.getContact());
            existingAnnonce.setStartDate(annonce.getStartDate());
            existingAnnonce.setLocation(annonce.getLocation());
            return annonceRepository.save(existingAnnonce);
        }
        return null;
    }
}
