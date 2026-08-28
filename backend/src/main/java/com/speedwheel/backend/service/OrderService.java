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

    private final NotificationService notificationService;


    OrderService(SaleRepository orderRepository, VehiculeRepository vehiculeRepository, UserRepository userRepository,NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.vehiculeRepository = vehiculeRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;

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
        Sale savedOrder = orderRepository.save(order);

        // Envoyer une notification WebSocket
        notificationService.sendNotification("Un véhicule a été acheté !");

        return savedOrder;
    }

    public List<Sale> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}