package com.sampleweb.ecompro.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

import java.util.Date;

@Data
@JsonPropertyOrder({
        "id",
        "name",
        "description",
        "brand",
        "price",
        "category",
        "releaseDate",
        "imageUrl",
        "availability",
        "quantity"
})
public class ProductResponse {

    private Integer id;
    private String name;
    private String description;
    private String brand;
    private double price;
    private String category;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
    private Date releaseDate;
    private String imageUrl;
    private boolean availability;
    private int quantity;

    }
