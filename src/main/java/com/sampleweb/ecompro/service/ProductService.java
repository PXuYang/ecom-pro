package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.model.Product;
import com.sampleweb.ecompro.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public List<Product> getALlProducts(){
        return repo.findAll();
    }

    public Product getProductById(Integer id){
        return repo.findById(id).orElse(new Product());
    }

    public Product addProduct(Product newPro){
        return repo.save(newPro);
    }

    public Product updateProduct(Integer id, Product newPro){
        Product oldPro = repo.findById(id).orElse(null);

        if (oldPro == null) {
            return null;
        }

        oldPro.setName(newPro.getName());
        oldPro.setDescription(newPro.getDescription());
        oldPro.setBrand(newPro.getBrand());
        oldPro.setPrice(newPro.getPrice());
        oldPro.setCategory(newPro.getCategory());
        oldPro.setReleaseDate(newPro.getReleaseDate());
        oldPro.setAvailability(newPro.isAvailability());
        oldPro.setQuantity(newPro.getQuantity());

        return repo.save(oldPro);
    }

    public void deleteProduct(int id){
        repo.deleteById(id);
    }

}
