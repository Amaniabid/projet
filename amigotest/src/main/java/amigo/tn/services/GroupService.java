package amigo.tn.services;

import java.util.List;
import java.util.Optional;

import amigo.tn.security.user.User;
import amigo.tn.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amigo.tn.entities.Group;
import amigo.tn.repositories.GroupRepository;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;


    @Autowired
    private UserRepository userRepository;
    public List<Group> getAllGroups(String idUser) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return groupRepository.findByUser(user);
    }

    public Optional<Group> getGroupById(String id) {
        return groupRepository.findById(id);
    }

    public Group createGroup(Group group) {
        return groupRepository.save(new Group(group.getName(), group.getDescription(), group.getMembers()));
    }

    public Optional<Group> updateGroup(String id, Group group) {
        Optional<Group> groupData = groupRepository.findById(id);

        if (groupData.isPresent()) {
            Group updatedGroup = groupData.get();
            updatedGroup.setName(group.getName());
            updatedGroup.setDescription(group.getDescription());
            return Optional.of(groupRepository.save(updatedGroup));
        } else {
            return Optional.empty();
        }
    }

    public boolean deleteGroup(String id) {
        try {
            groupRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    

    }

	public Optional<Group> rejoindreGroup(String id, String userId) {
		// TODO Auto-generated method stub
		return null;
	}
    

    }
