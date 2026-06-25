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

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id){
        return service.getProductById(id);
    }

    @PostMapping("/products")
    public void addProduct(@RequestBody Product newPro){
        service.addProduct(newPro);
    }

    @PutMapping("/products/{id}")
    public void updateProduct(@PathVariable int id, @RequestBody Product newPro){
        service.updateProduct(id, newPro);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable int id){
        service.deleteProduct(id);
    }

}
