package com.speedwheel.backend.security;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtil {

    private final javax.crypto.SecretKey key = Jwts.SIG.HS256.key().build();
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 heures

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}