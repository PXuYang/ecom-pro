package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.DTO.ProductResponse;
import com.sampleweb.ecompro.DTO.ProductStatResponse;
import com.sampleweb.ecompro.Exception.ProductNotFoundException;
import com.sampleweb.ecompro.model.Product;
import com.sampleweb.ecompro.repository.ProductRepo;
import com.sampleweb.ecompro.DTO.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    private ProductResponse toResponse(Product pro){
        ProductResponse newPro = new ProductResponse();

        newPro.setId(pro.getId());
        newPro.setName(pro.getName());
        newPro.setDescription(pro.getDescription());
        newPro.setBrand(pro.getBrand());
        newPro.setPrice(pro.getPrice());
        newPro.setCategory(pro.getCategory());
        newPro.setReleaseDate(pro.getReleaseDate());
        newPro.setAvailability(pro.isAvailability());
        newPro.setQuantity(pro.getQuantity());

        return newPro;
    }

    public List<ProductResponse> getALlProducts(){
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
        List<Product> products = repo.findAll();
        ProductStatResponse productStatResponse = new ProductStatResponse();

        int lowStockCount = 0;

        List<String> category = new ArrayList<>();
        for(Product product : products){

            if(product.getQuantity() < 10){
                lowStockCount++;
            }
            if(!category.contains(product.getCategory())){
                category.add(product.getCategory());
            }
        }

        productStatResponse.setTotalProductCount(products.size());
        productStatResponse.setLowStockCount(lowStockCount);
        productStatResponse.setCategoryCount(category.size());

        return productStatResponse;
    }

    public List<ProductResponse> findByQuantityLessThan(){
        return repo.findByQuantityLessThan(10).stream().map(this::toResponse).toList();
    }

    public List<ProductResponse> findByCategoryContainingIgnoreCase(String category){
        return repo.findByCategoryContainingIgnoreCase(category).stream().map(this::toResponse).toList();
    }

    public List<ProductResponse> findByNameContainingIgnoreCase(String keyword){
        return repo.findByNameContainingIgnoreCase(keyword).stream().map(this::toResponse).toList();
    }

}
