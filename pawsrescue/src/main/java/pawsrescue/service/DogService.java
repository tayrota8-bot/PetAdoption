package pawsrescue.service;

import pawsrescue.model.Dog;
import pawsrescue.repository.DogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DogService {

    private final DogRepository dogRepository;

    public DogService(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
    }

    public List<Dog> getAllDogs() {
        return dogRepository.findAll();
    }

    public Optional<Dog> getDogById(Long id) {
        return dogRepository.findById(id);
    }

    public Dog createDog(Dog dog) {
        return dogRepository.save(dog);
    }

    public Optional<Dog> updateDog(Long id, Dog updatedDog) {
        return dogRepository.findById(id).map(dog -> {
            dog.setName(updatedDog.getName());
            dog.setBreed(updatedDog.getBreed());
            dog.setAge(updatedDog.getAge());
            dog.setGender(updatedDog.getGender());
            dog.setSize(updatedDog.getSize());
            dog.setDescription(updatedDog.getDescription());
            dog.setPersonality(updatedDog.getPersonality());
            dog.setMedicalInfo(updatedDog.getMedicalInfo());
            dog.setImageUrl(updatedDog.getImageUrl());
            dog.setAdoptionFee(updatedDog.getAdoptionFee());
            return dogRepository.save(dog);
        });
    }

    public boolean deleteDog(Long id) {
        if (dogRepository.existsById(id)) {
            dogRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Dog> searchDogs(String query) {
        return dogRepository.findByNameContainingIgnoreCaseOrBreedContainingIgnoreCase(query, query);
    }
}
