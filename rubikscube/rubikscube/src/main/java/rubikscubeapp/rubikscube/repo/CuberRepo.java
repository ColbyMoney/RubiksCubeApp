package rubikscubeapp.rubikscube.repo;

import rubikscubeapp.rubikscube.model.Cuber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CuberRepo extends JpaRepository<Cuber, Long>{
    void deleteCuberById(Long id);

    Optional<Cuber> findCuberById(Long id);
}
