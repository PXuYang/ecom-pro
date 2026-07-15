package com.sampleweb.ecompro.controller;

import com.sampleweb.ecompro.DTO.ProductResponse;
import com.sampleweb.ecompro.DTO.ProductRequest;
import com.sampleweb.ecompro.DTO.ProductStatResponse;
import com.sampleweb.ecompro.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("products/findProducts/page")
    public ResponseEntity<Page<ProductResponse>> findProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean availability,
            @RequestParam(required = false) Boolean lowStock,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder,
            @RequestParam int page,
            @RequestParam int size
    ){

        Page<ProductResponse> products = service.findProducts(name, brand, category, availability, lowStock, sortBy, sortOrder, page, size);
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

}
