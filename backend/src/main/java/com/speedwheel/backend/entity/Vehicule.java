package com.speedwheel.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String marque;

    @Column(nullable = false)
    private String modele;

    @Column(nullable = false)
    private Integer annee;

    @Column(nullable = false, length = 50)
    private String couleur;

    @Column(nullable = false)
    private BigDecimal prix;

    @Column(nullable = false)
    private Integer kilometrage;

    @Column(nullable = false, length = 20)
    private String carburant;

    @Column(nullable = false, length = 20)
    private String transmission;

    @Column(length = 500)
    private String description;

    @Column(name = "date_ajout", nullable = false)
    private LocalDateTime dateAjout;

    @PrePersist
    public void prePersist() {
        this.dateAjout = LocalDateTime.now();
    }
}