package com.sampleweb.ecompro.controller;

import com.sampleweb.ecompro.model.Product;
import com.sampleweb.ecompro.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products = service.getALlProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id){
        Product pro = service.getProductById(id);
        if(pro == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pro);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@Valid@RequestBody Product newPro){
        Product pro = service.addProduct(newPro);
        return ResponseEntity.status(HttpStatus.CREATED).body(pro);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @Valid @RequestBody Product newPro){
        Product pro = service.updateProduct(id, newPro);
        if(pro == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pro);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id){
        boolean pro = service.deleteProduct(id);
        if(!pro){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

}
