package com.sampleweb.ecompro.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.util.Date;

@Data
public class ProductRequest {

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
