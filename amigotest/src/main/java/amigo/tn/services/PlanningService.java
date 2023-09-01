package amigo.tn.services;


import amigo.tn.entities.Planning;
import amigo.tn.repositories.PlanningRepository;
import amigo.tn.security.user.User;
import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PlanningService {
    @Autowired
    private PlanningRepository planningRepository;

    @Autowired
    private UserRepository userRepository;

    public Planning createPlanning(Planning annonce) {
        return planningRepository.save(annonce);
    }

    public void deletePlanning(String id) {
        planningRepository.deleteById(id);
    }

    public List<Planning> getAllPlannings(String idUser) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        // TODO Auto-generated method stub
        return planningRepository.findByUser(user);
    }
    public Planning updatePlanning(String id, Planning planning) {
        Planning existingPlanning = planningRepository.findById(id).orElse(null);
        if (existingPlanning != null) {
            existingPlanning.setDate(planning.getDate());
            existingPlanning.setTitre(planning.getTitre());
            existingPlanning.setDescription(planning.getDescription());
            return planningRepository.save(existingPlanning);
        }
        return null;
    }
}