package rubikscubeapp.rubikscube.service;

import rubikscubeapp.rubikscube.exception.UserNotFoundException;
import rubikscubeapp.rubikscube.repo.CuberRepo;
import rubikscubeapp.rubikscube.model.Cuber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class CuberService {
    private final CuberRepo cuberRepo;
    
    @Autowired
    public CuberService(CuberRepo cuberRepo) { this.cuberRepo = cuberRepo; }

    public Cuber addCuber(Cuber cuber) {
        cuber.setCuberCode(UUID.randomUUID().toString());
        return cuberRepo.save(cuber);
    }

    public List<Cuber> findAllCubers() {
        return cuberRepo.findAll();
    }

    public Cuber updateCuber(Cuber cuber) {
        return cuberRepo.save(cuber);
    }

    public Cuber findCuberById(Long id) {
        return cuberRepo.findCuberById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found."));
    }

    public void deleteCuber(Long id) {
        cuberRepo.deleteCuberById(id);
    }
}
