package com.speedwheel.backend.controller;

import com.speedwheel.backend.dto.LoginRequest;
import com.speedwheel.backend.entity.User;
import com.speedwheel.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        // Chercher l'utilisateur par email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Vérifier le mot de passe (pour l'instant, on compare en clair)
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        //  Retourner un faux token (on le générera plus tard)
        return "token-simulé-pour-" + user.getEmail();
    }
}