package amigo.tn.controller;

import amigo.tn.entities.Annonce;
import amigo.tn.entities.Publication;
import amigo.tn.services.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/annonces")
public class AnnoncdController {
    @Autowired
    private AnnonceService annonceService;

    @GetMapping("/{id}")
    public List<Annonce> getAnnonces(@PathVariable String id) {
        return annonceService.getAllAnnonces(id);
    }

    @PostMapping("/addA")
    public Annonce createAnnonce(@RequestBody Annonce annonce) {
        return annonceService.createAnnonce(annonce);
    }

    @DeleteMapping("/{id}")
    public void deleteAnnonce(@PathVariable String id) {
        annonceService.deleteAnnonce(id);
    }
    @PutMapping("/{id}")
    public Annonce updatePublication(@PathVariable String id, @RequestBody Annonce annonce) {
        return annonceService.updateAnnonce(id, annonce);
    }
}
