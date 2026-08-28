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

    @Column(nullable = false)
    private Integer garantie; // Durée de garantie en mois (ex: 12, 24, 36)

    @Column(name = "date_ajout", nullable = false)
    private LocalDateTime dateAjout;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehiculeStatus status;

    @PrePersist
    public void prePersist() {
        this.dateAjout = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}