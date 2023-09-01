package amigo.tn.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import amigo.tn.entities.Group;
import amigo.tn.repositories.GroupRepository;
import amigo.tn.services.GroupService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;
    @Autowired
    private GroupRepository groupRepository;

    @GetMapping("/{id}")
    public List<Group> getAllGroups(@PathVariable String id) {
        return groupService.getAllGroups(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Group> createGroup(@RequestBody Group group) {
        Group newGroup = groupService.createGroup(group);
        newGroup.setUser(group.getUser());
        Group savedGroup = groupRepository.save(newGroup);
        return new ResponseEntity<>(savedGroup, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable("id") String id, @RequestBody Group group) {
        Optional<Group> existingGroup = groupService.getGroupById(id);

        if (existingGroup.isPresent()) {
            Group updatedGroup = existingGroup.get();
            updatedGroup.setName(group.getName());
            updatedGroup.setDescription(group.getDescription());
            updatedGroup.setMembers(group.getMembers());

            Group savedGroup = groupRepository.save(updatedGroup);

            return new ResponseEntity<>(savedGroup, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteGroup(@PathVariable("id") String id) {
        boolean deleted = groupService.deleteGroup(id);

        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/{id}/members")
    public ResponseEntity<Group> rejoindreGroup(@PathVariable("id") String id, @RequestBody String userId) {
        Optional<Group> updatedGroup = groupService.rejoindreGroup(id, userId);

        if (updatedGroup.isPresent()) {
            return new ResponseEntity<>(updatedGroup.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
