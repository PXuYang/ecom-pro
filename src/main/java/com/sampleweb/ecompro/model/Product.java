package com.sampleweb.ecompro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "Product name is required")
    private String name;
    @NotBlank(message = "Product description is required")
    private String description;
    @NotBlank(message = "Product brand is required")
    private String brand;
    @Positive(message = "Product price must be positive")
    private double price;
    @NotBlank(message = "Product category is required")
    private String category;
    @NotNull(message = "Product release date is required")
    private Date releaseDate;
    private boolean availability;
    @PositiveOrZero(message = "Product quantity must be positive or zero")
    private int quantity;

}
