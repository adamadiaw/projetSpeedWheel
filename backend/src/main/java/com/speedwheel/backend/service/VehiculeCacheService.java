package com.speedwheel.backend.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class VehiculeCacheService {

    private final StringRedisTemplate redisTemplate;

    private final CacheJsonService jsonService;

    VehiculeCacheService(StringRedisTemplate redisTemplate, CacheJsonService jsonService) {
        this.redisTemplate = redisTemplate;
        this.jsonService = jsonService;
    }

    public void cacheVehiculeData(String key, Object data) {
        String json = jsonService.serialize(data);
        redisTemplate.opsForValue().set(key, json, Duration.ofMinutes(10));
    }

    public String getRawCachedData(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public <T> T getCachedData(String key, Class<T> clazz) {
        String json = getRawCachedData(key);
        if (json == null) {
            return null;
        }
        return jsonService.deserialize(json, clazz);
    }

    public <T> java.util.List<T> getCachedList(String key, Class<T> clazz) {
        String json = getRawCachedData(key);
        if (json == null) {
            return null;
        }
        return jsonService.deserializeList(json, clazz);
    }

    public void deleteCachedData(String key) {
        redisTemplate.delete(key);
    }
}