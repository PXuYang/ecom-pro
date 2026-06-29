package com.sampleweb.ecompro.DTO;

import lombok.Data;

@Data
public class ProductStatResponse {

    private int totalProductCount;
    private int lowStockCount;
    private int categoryCount;
}
