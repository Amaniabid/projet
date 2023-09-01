package amigo.tn.controller;

import java.util.*;

import amigo.tn.BadWordFilter;
import amigo.tn.entities.Commentaires;
import amigo.tn.repositories.CommentRepository;
import amigo.tn.repositories.PublicationRepository;
import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import amigo.tn.entities.Publication;
import amigo.tn.services.PublicationService;
@RequestMapping("/publications")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PublicationController {
    @Autowired
    private PublicationService publicationService;
    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private CommentRepository commentRepository;

    @PostMapping("/publications")
    public Publication addPublication(@RequestBody Publication publication) {
        publication.setDate(new Date());
        return publicationService.addPublication(publication);
    }
    @PostMapping("/{publicationId}/comments")
    public ResponseEntity<Commentaires> addCommentToPublication(
            @PathVariable String publicationId,
            @RequestBody Commentaires comment
    ) {
        // Find the publication
        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new IllegalArgumentException("Publication not found"));
        // Set the date for the comment

        comment.setDate(new Date());
        if(publication.getCommentaires()==null)
            publication.setCommentaires(new ArrayList<Commentaires>());
        // Apply censorship to the comment
        comment.setContent(BadWordFilter.getCensoredText(comment.getContent()));
        Commentaires newCom=commentRepository.save(comment);
        // Add the comment to the publication
        publication.getCommentaires().add(newCom);
        publicationRepository.save(publication);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCom);
    }
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Commentaires> updateComment(
            @PathVariable String commentId,
            @RequestBody Commentaires updatedComment
    ) {
        Commentaires existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        // Apply censorship to the updated comment's content
        existingComment.setContent(BadWordFilter.getCensoredText(updatedComment.getContent()));

        Commentaires updatedCom = commentRepository.save(existingComment);
        return ResponseEntity.ok(updatedCom);
    }

    @GetMapping("/publications")
    public List<Publication> getAllPublications() {
        return publicationService.getAllPublications();
    }
    @GetMapping("/publications/user/{id}")
    public List<Publication> getAllPublicationsByUser(@PathVariable String id) {
        List<Publication> publications = publicationRepository.findByUserIdOrderByDate(id, Sort.by(Sort.Direction.DESC, "date"));

        for (Publication publication : publications) {
            publication.sortCommentsByDate();
        }
        return publications;
    }

    @GetMapping("/publications/{id}")
    public Publication getPublicationById(@PathVariable String id) {
        return publicationService.getPublicationById(id);
    }

    @PutMapping("/publications/{id}")
    public Publication updatePublication(@PathVariable String id, @RequestBody Publication publication) {
        return publicationService.updatePublication(id, publication);
    }
    @PutMapping("/publications/like/{id}")
    public Publication updatePublicationlike(@PathVariable String id, @RequestBody Publication publication) {
        return publicationService.updatePublicationLike(id, publication);
    }
    @DeleteMapping("/publications/{id}")
    public String deletePublication(@PathVariable String id) {
        publicationService.deletePublication(id);
        return "Publication with ID: " + id + " deleted successfully";
    }
}