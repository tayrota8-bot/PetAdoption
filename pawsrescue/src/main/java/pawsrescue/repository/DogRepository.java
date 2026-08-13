package pawsrescue.repository;

import pawsrescue.model.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DogRepository extends JpaRepository<Dog, Long> {
    List<Dog> findByNameContainingIgnoreCaseOrBreedContainingIgnoreCase(String name, String breed);
    List<Dog> findBySize(String size);
}