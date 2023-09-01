package amigo.tn.controller;

import amigo.tn.entities.Annonce;
import amigo.tn.entities.Planning;
import amigo.tn.services.AnnonceService;
import amigo.tn.services.PlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/plannings")
public class PlanningController {
    @Autowired
    private PlanningService planningService;

    @GetMapping("/{id}")
    public List<Planning> getAnnonces(@PathVariable String id) {
        return planningService.getAllPlannings(id);
    }

    @PostMapping("/addP")
    public Planning createAnnonce(@RequestBody Planning planning) {
        return planningService.createPlanning(planning);
    }

    @DeleteMapping("/{id}")
    public void deleteAnnonce(@PathVariable String id) {
        planningService.deletePlanning(id);
    }
    @PutMapping("/{id}")
    public Planning updatePublication(@PathVariable String id, @RequestBody Planning planning) {
        return planningService.updatePlanning(id, planning);
    }
}