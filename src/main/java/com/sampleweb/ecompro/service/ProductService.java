package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.DTO.ProductResponse;
import com.sampleweb.ecompro.DTO.ProductStatResponse;
import com.sampleweb.ecompro.Exception.ProductNotFoundException;
import com.sampleweb.ecompro.model.Product;
import com.sampleweb.ecompro.repository.ProductRepo;
import com.sampleweb.ecompro.DTO.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public Page<ProductResponse> getProductByPage(int page, int size){
        Pageable pageable = PageRequest.of(page, size);

        return repo.findAll(pageable).map(this::toResponse);
    }

    private ProductResponse toResponse(Product pro){
        ProductResponse newPro = new ProductResponse();

        newPro.setId(pro.getId());
        newPro.setName(pro.getName());
        newPro.setDescription(pro.getDescription());
        newPro.setBrand(pro.getBrand());
        newPro.setPrice(pro.getPrice());
        newPro.setCategory(pro.getCategory());
        newPro.setReleaseDate(pro.getReleaseDate());
        newPro.setImageUrl(pro.getImageUrl());
        newPro.setAvailability(pro.isAvailability());
        newPro.setQuantity(pro.getQuantity());

        return newPro;
    }

    public List<ProductResponse> getAllProducts(){
        return repo.findAll().stream().map(this::toResponse).toList();
    }

    public ProductResponse getProductById(Integer id){
        Product pro = repo.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        return toResponse(pro);
    }

    public ProductResponse addProduct(ProductRequest newPro){
        Product product = new Product();
        product.setName(newPro.getName());
        product.setDescription(newPro.getDescription());
        product.setBrand(newPro.getBrand());
        product.setPrice(newPro.getPrice());
        product.setCategory(newPro.getCategory());
        product.setReleaseDate(newPro.getReleaseDate());
        product.setImageUrl(newPro.getImageUrl());
        product.setAvailability(newPro.isAvailability());
        product.setQuantity(newPro.getQuantity());

        return toResponse(repo.save(product));
    }

    public ProductResponse updateProduct(Integer id, ProductRequest newPro){
        Product oldPro = repo.findById(id).orElseThrow(() -> new ProductNotFoundException(id));

        oldPro.setName(newPro.getName());
        oldPro.setDescription(newPro.getDescription());
        oldPro.setBrand(newPro.getBrand());
        oldPro.setPrice(newPro.getPrice());
        oldPro.setCategory(newPro.getCategory());
        oldPro.setReleaseDate(newPro.getReleaseDate());
        oldPro.setImageUrl(newPro.getImageUrl());
        oldPro.setAvailability(newPro.isAvailability());
        oldPro.setQuantity(newPro.getQuantity());

        if(newPro.getQuantity() == 0){
            oldPro.setAvailability(false);
        }

        return toResponse(repo.save(oldPro));
    }

    public boolean deleteProduct(int id){
        if(!repo.existsById(id)){
            return false;
        }
        repo.deleteById(id);
        return true;
    }

    public ProductStatResponse getStatData(){

        ProductStatResponse productStatResponse = new ProductStatResponse();

        long totalCount = repo.count();
        long lowStockCount = repo.countByQuantityLessThan(10);
        long categoryCount = repo.countByDistinctCategory();

        productStatResponse.setTotalProductCount((int)totalCount);
        productStatResponse.setLowStockCount((int)lowStockCount);
        productStatResponse.setCategoryCount((int)categoryCount);

        return productStatResponse;
    }

    public Page<ProductResponse> findByQuantityLessThan(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findByQuantityLessThan(10, pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findByCategoryContainingIgnoreCase(String categoryKeyword, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findByCategoryContainingIgnoreCase(categoryKeyword, pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findByNameContainingIgnoreCase(String nameKeyword, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findByNameContainingIgnoreCase(nameKeyword, pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findByAvailability(boolean availability, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findByAvailability(availability, pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findByBrandContainingIgnoreCase(String brandKeyword, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findByBrandContainingIgnoreCase(brandKeyword, pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findAllByOrderByNameAsc(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAllByOrderByNameAsc(pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findAllByOrderByPriceAsc(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAllByOrderByPriceAsc(pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findAllByOrderByPriceDesc(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAllByOrderByPriceDesc(pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findAllByOrderByQuantityAsc(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAllByOrderByQuantityAsc(pageable).map(this::toResponse);
    }

    public Page<ProductResponse> findAllByOrderByQuantityDesc(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAllByOrderByQuantityDesc(pageable).map(this::toResponse);
    }

}
