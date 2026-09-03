package com.speedwheel.backend.service;

import com.speedwheel.backend.entity.Vehicule;
import com.speedwheel.backend.repository.VehiculeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static org.mockito.Mockito.when;

import java.util.List;

@SpringBootTest
@ActiveProfiles("test")
public class VehiculeServiceTest {

    @Autowired
    private VehiculeService vehiculeService;

    @MockitoBean
    private VehiculeRepository vehiculeRepository;

    @Test
    public void testGetAll() {
        when(vehiculeRepository.findAll()).thenReturn(List.of());
        List<Vehicule> result = vehiculeService.getAll();
        org.junit.jupiter.api.Assertions.assertEquals(0, result.size());
    }
}