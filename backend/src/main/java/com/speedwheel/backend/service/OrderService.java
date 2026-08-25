package com.speedwheel.backend.service;

import com.speedwheel.backend.entity.Sale;
import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.repository.SaleRepository;
import com.speedwheel.backend.repository.UserRepository;
import com.speedwheel.backend.repository.VehiculeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    private final SaleRepository orderRepository;

    private final UserRepository userRepository;

    private final VehiculeRepository vehiculeRepository;

    OrderService(SaleRepository orderRepository, VehiculeRepository vehiculeRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.vehiculeRepository = vehiculeRepository;
        this.userRepository = userRepository;
    }

    public Sale createOrder(Long userId, Long vehiculeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        Vehicule vehicule = vehiculeRepository.findById(vehiculeId)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));

        Sale order = new Sale();
        order.setUser(user);
        order.setVehicule(vehicule);
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    public List<Sale> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}