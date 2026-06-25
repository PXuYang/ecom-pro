package com.sampleweb.ecompro.Exception;

public class ProductNotFoundException extends RuntimeException{

    public ProductNotFoundException(Integer id){
        super("Product not found with id " + id);
    }

}
