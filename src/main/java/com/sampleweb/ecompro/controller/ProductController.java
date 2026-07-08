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
        List<ProductResponse> products = service.getAllProducts();
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

    @GetMapping("/products/page")
    public ResponseEntity<Page<ProductResponse>> getProductsByPage(
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> pageProducts = service.getProductByPage(page, size);
        return ResponseEntity.ok(pageProducts);
    }

    @GetMapping("/products/asc/page")
    public ResponseEntity<Page<ProductResponse>> findAllByOrderByNameAsc(
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> products = service.findAllByOrderByNameAsc(page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/price/asc/page")
    public ResponseEntity<Page<ProductResponse>> findAllByOrderByPriceAsc(
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> products = service.findAllByOrderByPriceAsc(page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/price/desc/page")
    public ResponseEntity<Page<ProductResponse>> findAllByOrderByPriceDesc(
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> products = service.findAllByOrderByPriceDesc(page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/quantity/asc/page")
    public ResponseEntity<Page<ProductResponse>> findAllByOrderByQuantityAsc(
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> products = service.findAllByOrderByQuantityAsc(page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/quantity/desc/page")
    public ResponseEntity<Page<ProductResponse>> findAllByOrderByQuantityDesc(
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> products = service.findAllByOrderByQuantityDesc(page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/low-stock/page")
    public ResponseEntity<Page<ProductResponse>> getLowStock(
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> lowStock = service.findByQuantityLessThan(page, size);
        return ResponseEntity.ok(lowStock);
    }

    @GetMapping("/products/bycategory/{categoryKeyword}/page")
    public ResponseEntity<Page<ProductResponse>> findByCategoryContainingIgnoreCase(
            @PathVariable String categoryKeyword,
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> byCategory = service.findByCategoryContainingIgnoreCase(categoryKeyword, page, size);
        return ResponseEntity.ok(byCategory);
    }

    @GetMapping("/products/byname/{nameKeyword}/page")
    public ResponseEntity<Page<ProductResponse>> findByNameContainingIgnoreCase(
            @PathVariable String nameKeyword,
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> byName = service.findByNameContainingIgnoreCase(nameKeyword, page, size);
        return ResponseEntity.ok(byName);
    }

    @GetMapping("/products/byavailability/{availability}/page")
    public ResponseEntity<Page<ProductResponse>> findByAvailability(
            @PathVariable boolean availability,
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> byAvailability = service.findByAvailability(availability, page, size);
        return ResponseEntity.ok(byAvailability);
    }

    @GetMapping("/products/bybrand/{brandKeyword}/page")
    public ResponseEntity<Page<ProductResponse>> findByBrandContainingIgnoreCase(
            @PathVariable String brandKeyword,
            @RequestParam int page, @RequestParam int size){

        Page<ProductResponse> byBrand = service.findByBrandContainingIgnoreCase(brandKeyword, page, size);
        return ResponseEntity.ok(byBrand);
    }

}
