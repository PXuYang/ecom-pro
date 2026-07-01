package com.sampleweb.ecompro.repository;

import com.sampleweb.ecompro.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    List<Product> findByQuantityLessThan(int quantity);
    List<Product> findByCategoryContainingIgnoreCase(String category);
    List<Product> findByNameContainingIgnoreCase(String keyword);


}
