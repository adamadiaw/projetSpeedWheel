package com.speedwheel.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class VehiculeDTO {

    @NotBlank(message = "La marque est obligatoire")
    private String marque;

    @NotBlank(message = "Le modèle est obligatoire")
    private String modele;

    @NotNull(message = "L'année est obligatoire")
    private Integer annee;

    @NotBlank(message = "La couleur est obligatoire")
    private String couleur;

    @NotNull(message = "Le prix est obligatoire")
    @Positive(message = "Le prix doit être positif")
    private BigDecimal prix;

    @NotNull(message = "Le kilométrage est obligatoire")
    @Positive(message = "Le kilométrage doit être positif")
    private Integer kilometrage;

    @NotBlank(message = "Le carburant est obligatoire")
    private String carburant;

    @NotBlank(message = "La transmission est obligatoire")
    private String transmission;

    private String description;
}