package com.sampleweb.ecompro.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class ProductResponse {

    private int id;
    private String name;
    private String description;
    private String brand;
    private double price;
    private String category;
    private Date releaseDate;
    private boolean availability;
    private int quantity;

    }
