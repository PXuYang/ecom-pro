package com.sampleweb.ecompro.repository;

import com.sampleweb.ecompro.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    Page<Product> findByQuantityLessThan(int quantity, Pageable pageable);
    Page<Product> findByCategoryContainingIgnoreCase(String categoryKeyword, Pageable pageable);
    Page<Product> findByNameContainingIgnoreCase(String nameKeyword, Pageable pageable);
    Page<Product> findByAvailability(boolean availability, Pageable pageable);
    Page<Product> findByBrandContainingIgnoreCase(String brandKeyword, Pageable pageable);
    @Query("Select p From Product p Order By LOWER(p.name) ASC")
    Page<Product> findAllByOrderByNameAsc(Pageable pageable);
    Page<Product> findAllByOrderByPriceAsc(Pageable pageable);
    Page<Product> findAllByOrderByPriceDesc(Pageable pageable);
    Page<Product> findAllByOrderByQuantityAsc(Pageable pageable);
    Page<Product> findAllByOrderByQuantityDesc(Pageable pageable);

    long countByQuantityLessThan(int i);
    @Query("SELECT COUNT(DISTINCT p.category) FROM Product p")
    long countByDistinctCategory();
}
