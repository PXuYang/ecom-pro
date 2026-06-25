package com.sampleweb.ecompro.controller;

import com.sampleweb.ecompro.model.Product;
import com.sampleweb.ecompro.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService service;

    @RequestMapping
    public String homePage(){
        return "Welcome to my first project";
    }

    @RequestMapping("/homepage")
    public String greet(){
        return "Hello, welcome to the home page";
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return service.getALlProducts();
    }

    @PostMapping("/products")
    public void addProduct(Product newPro){
        service.addProduct(newPro);
    }

    @PutMapping("/products")
    public void updateProduct(Product newPro){
        service.updateProduct(newPro);
    }

    @DeleteMapping("/products")
    public void deleteProduct(int id){
        service.deleteProduct(id);
    }

}
