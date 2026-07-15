package com.sampleweb.ecompro.repository;

import com.sampleweb.ecompro.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    @Query("""
           SELECT p FROM Product p
           WHERE (:name IS NULL
                      OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))
             AND (:brand IS NULL
                      OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :brand, '%')))
             AND (:category IS NULL
                      OR LOWER(p.category) LIKE LOWER(CONCAT('%', :category, '%')))
             AND (:lowStock IS NULL
                      OR :lowStock = false
                      OR p.quantity < 10)
             AND (:availability IS NULL
                      OR p.availability = :availability)
           """)
    Page<Product> findProducts(@Param("name") String name,
                               @Param("brand") String brand,
                               @Param("category") String category,
                               @Param("availability") Boolean availability,
                               @Param("lowStock") Boolean lowStock,
                                Pageable pageable);

    long countByQuantityLessThan(int i);
    @Query("SELECT COUNT(DISTINCT p.category) FROM Product p")
    long countByDistinctCategory();
}
