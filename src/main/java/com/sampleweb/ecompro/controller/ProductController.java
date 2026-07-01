package com.sampleweb.ecompro.controller;

import com.sampleweb.ecompro.DTO.ProductResponse;
import com.sampleweb.ecompro.DTO.ProductRequest;
import com.sampleweb.ecompro.DTO.ProductStatResponse;
import com.sampleweb.ecompro.service.ProductService;
import jakarta.validation.Path;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
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
    public ResponseEntity<List<ProductResponse>> getAllProducts(){
        List<ProductResponse> products = service.getALlProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable int id){
        ProductResponse pro = service.getProductById(id);
        return ResponseEntity.ok(pro);
    }

    @PostMapping("/products")
    public ResponseEntity<ProductResponse> addProduct(@Valid @RequestBody ProductRequest newPro){
        ProductResponse pro = service.addProduct(newPro);
        return ResponseEntity.status(HttpStatus.CREATED).body(pro);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable int id, @Valid @RequestBody ProductRequest newPro){
        ProductResponse pro = service.updateProduct(id, newPro);
//        if(pro == null){
//            return ResponseEntity.notFound().build();
//        }
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

    @GetMapping("/products/stat")
    public ResponseEntity<ProductStatResponse> getProductsStat(){
        ProductStatResponse productStatResponse = service.getStatData();
        return ResponseEntity.ok(productStatResponse);
    }

    @GetMapping("/products/low-stock")
    public ResponseEntity<List<ProductResponse>> getLowStock(){
        List<ProductResponse> lowStock = service.findByQuantityLessThan();
        return ResponseEntity.ok(lowStock);
    }

    @GetMapping("/products/category/{category}")
    public ResponseEntity<List<ProductResponse>> findByCategoryContainingIgnoreCase(@PathVariable String category){
        List<ProductResponse> byCategory = service.findByCategoryContainingIgnoreCase(category);
        return ResponseEntity.ok(byCategory);
    }

    @GetMapping("/products/byname/{keyword}")
    public ResponseEntity<List<ProductResponse>> findByNameContainingIgnoreCase(@PathVariable String keyword){
        List<ProductResponse> byName = service.findByNameContainingIgnoreCase(keyword);
        return ResponseEntity.ok(byName);
    }

}
