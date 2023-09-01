package amigo.tn.services;

import java.util.List;

import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amigo.tn.entities.Publication;
import amigo.tn.repositories.PublicationRepository;




@Service
public class PublicationService {
    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private UserRepository userRepository;

    public Publication addPublication(Publication publication) {
        return publicationRepository.save(publication);
    }

    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }

    public Publication getPublicationById(String id) {
        return publicationRepository.findById(id).orElse(null);
    }

    public Publication updatePublication(String id, Publication publication) {
        Publication existingPublication = publicationRepository.findById(id).orElse(null);
        if (existingPublication != null) {
            existingPublication.setTitre(publication.getTitre());
            existingPublication.setContenu(publication.getContenu());
            existingPublication.setLikes(publication.getLikes());
            existingPublication.setCommentaires(publication.getCommentaires());
            existingPublication.setUser(publication.getUser());
            return publicationRepository.save(existingPublication);
        }
        return null;
    }
    public Publication updatePublicationLike(String id, Publication publication) {
        Publication existingPublication = publicationRepository.findById(id).orElse(null);
        if (existingPublication != null) {
            existingPublication.setLikes(publication.getLikes());;
            return publicationRepository.save(existingPublication);
        }
        return null;
    }

    public void deletePublication(String id) {
        publicationRepository.deleteById(id);
    }
}