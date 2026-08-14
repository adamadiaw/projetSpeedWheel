package com.speedwheel.backend.controller;

import com.speedwheel.backend.entity.Order;
import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.repository.UserRepository;
import com.speedwheel.backend.service.OrderService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    private final UserRepository userRepository;

    OrderController(OrderService orderService, UserRepository userRepository) {
        this.orderService = orderService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Order createOrder(@RequestParam Long vehiculeId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return orderService.createOrder(user.getId(), vehiculeId);
    }

    @GetMapping
    public List<Order> getMyOrders() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return orderService.getOrdersByUserId(user.getId());
    }
}