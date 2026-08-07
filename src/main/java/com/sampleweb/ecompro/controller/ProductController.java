package com.sampleweb.ecompro.controller;

import com.sampleweb.ecompro.DTO.PageResponse;
import com.sampleweb.ecompro.DTO.ProductResponse;
import com.sampleweb.ecompro.DTO.ProductStatResponse;
import com.sampleweb.ecompro.DTO.ProductUploadRequest;
import com.sampleweb.ecompro.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/products/findProducts/page")
    public ResponseEntity<PageResponse<ProductResponse>> findProducts(
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

        PageResponse<ProductResponse> products = service.findProducts(name, brand, category, availability, lowStock, sortBy, sortOrder, page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable int id){
        ProductResponse pro = service.getProductById(id);
        return ResponseEntity.ok(pro);
    }

    @PostMapping(value = "/products/with-image",
                consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> addProductWithImage(@Valid @ModelAttribute ProductUploadRequest newPro)
            throws IOException {
        ProductResponse pro = service.addProductWithImage(newPro);
        return ResponseEntity.status(HttpStatus.CREATED).body(pro);
    }

    @PutMapping(value = "/products/update/{id}/with-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable int id, @Valid @ModelAttribute ProductUploadRequest newPro)
            throws IOException {
        ProductResponse pro = service.updateProduct(id, newPro);
        return ResponseEntity.ok(pro);
    }

    @DeleteMapping("/products/delete/{id}")
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
