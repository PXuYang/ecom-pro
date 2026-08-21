package com.sampleweb.ecompro.dto;

import lombok.Data;

@Data
public class ProductStatResponse {

    private int totalProductCount;
    private int lowStockCount;
    private int categoryCount;
}
