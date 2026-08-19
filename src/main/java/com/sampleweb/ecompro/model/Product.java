package com.sampleweb.ecompro.model;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String brand;

    @Positive
    private double price;

    @NotBlank
    private String category;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
    private Date releaseDate;

    private String imageName;

    private boolean availability;

    @PositiveOrZero
    private int quantity;

}
