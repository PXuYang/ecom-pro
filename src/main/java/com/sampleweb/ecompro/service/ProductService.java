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

    public void addProduct(Product newPro){
        repo.save(newPro);
    }

    public void updateProduct(Product newPro){
        repo.save(newPro);
    }

    public void deleteProduct(int id){
        repo.deleteById(id);
    }

}
