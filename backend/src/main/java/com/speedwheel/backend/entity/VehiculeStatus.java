package com.speedwheel.backend.entity;

public enum VehiculeStatus {
    // Statuts principaux
    A_LOUER("À louer"),
    A_VENDRE("À vendre"),
    LOUER("Loué"),
    VENDU("Vendu"),
    IMPORTE("Importé"),
    EXPORTE("Exporté"),
    EN_MAINTENANCE("En maintenance"),
    DISPONIBLE("Disponible");

    private final String displayName;

    VehiculeStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}