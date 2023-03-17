package rubikscubeapp.rubikscube.controller;

import rubikscubeapp.rubikscube.model.Cuber;
import rubikscubeapp.rubikscube.service.CuberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cuber")
public class CuberController {
    private final CuberService cuberService;

    public CuberController(CuberService cuberService) {
        this.cuberService = cuberService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cuber>> getAllCubers() {
        List<Cuber> cubers = cuberService.findAllCubers();
        return new ResponseEntity<>(cubers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Cuber> getCuber(@PathVariable("id") Long id) {
        Cuber cuber = cuberService.findCuberById(id);
        return new ResponseEntity<>(cuber, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Cuber> addCuber(@RequestBody Cuber cuber) {
        Cuber newCuber = cuberService.addCuber(cuber);
        return new ResponseEntity<>(newCuber, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Cuber> updateCuber(@RequestBody Cuber cuber) {
        Cuber newCuber = cuberService.updateCuber(cuber);
        return new ResponseEntity<>(newCuber, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCuber(@PathVariable("id") Long id) {
        cuberService.deleteCuber(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
