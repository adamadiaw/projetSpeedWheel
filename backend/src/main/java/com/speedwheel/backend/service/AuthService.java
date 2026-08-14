package com.speedwheel.backend.service;

import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        // Vérifier si l'email existe déjà
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé");
        }
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Pour l'instant, on compare en clair (on ajoutera le hash plus tard)
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Mot de passe incorrect");
        }
        return user;
    }
}