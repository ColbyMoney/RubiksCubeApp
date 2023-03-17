package rubikscubeapp.rubikscube.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Cuber implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String username;
    private String password;
    private double singlePB;
    private double ao5PB;
    private double ao12PB;
    @Column(nullable = false, updatable = false)
    private String cuberCode;

    public Cuber() {}

    public Cuber(Long id, String username, String password, double singlePB, double ao5PB, double ao12PB, String cuberCode) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.singlePB = singlePB;
        this.ao5PB = ao5PB;
        this.ao12PB = ao12PB;
        this.cuberCode = cuberCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getSinglePB() {
        return singlePB;
    }

    public void setSinglePB(double singlePB) {
        this.singlePB = singlePB;
    }

    public double getAo5PB() {
        return ao5PB;
    }

    public void setAo5PB(double ao5PB) {
        this.ao5PB = ao5PB;
    }

    public double getAo12PB() {
        return ao12PB;
    }

    public void setAo12PB(double ao12PB) {
        this.ao12PB = ao12PB;
    }

    public String getCuberCode() {
        return cuberCode;
    }

    public void setCuberCode(String cuberCode) {
        this.cuberCode = cuberCode;
    }
}
