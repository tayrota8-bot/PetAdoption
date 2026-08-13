package pawsrescue.controller;

import pawsrescue.model.Adoption;
import pawsrescue.repository.AdoptionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/adoptions")
public class Adoptioncontroller {

    private final AdoptionRepository adoptionRepository;

    public Adoptioncontroller(AdoptionRepository adoptionRepository) {
        this.adoptionRepository = adoptionRepository;
    }

    @PostMapping
    public ResponseEntity<Adoption> submitAdoption(@RequestBody Adoption adoption) {
        Adoption saved = adoptionRepository.save(adoption);
        return ResponseEntity.status(201).body(saved);
    }
}

