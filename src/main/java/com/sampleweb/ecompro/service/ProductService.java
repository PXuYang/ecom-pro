package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.DTO.ProductResponse;
import com.sampleweb.ecompro.DTO.ProductStatResponse;
import com.sampleweb.ecompro.DTO.ProductUploadRequest;
import com.sampleweb.ecompro.Exception.ProductImageException;
import com.sampleweb.ecompro.Exception.ProductNotFoundException;
import com.sampleweb.ecompro.model.Product;
import com.sampleweb.ecompro.repository.ProductRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ProductService {

    private final ProductRepo repo;
    private final ImageService imageService;

    public ProductService(ProductRepo repo, ImageService imageService){
        this.repo = repo;
        this.imageService = imageService;
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

    public ProductResponse getProductById(Integer id){
        Product pro = repo.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        return toResponse(pro);
    }

    public ProductResponse addProductWithImage(ProductUploadRequest newPro)
        throws IOException {

        MultipartFile image = newPro.getImage();

        if (image == null || image.isEmpty()){
            throw new ProductImageException("Product image is required");
        }

        String imageName = imageService.uploadImage(image);

        Product product = new Product();
        product.setName(newPro.getName());
        product.setDescription(newPro.getDescription());
        product.setBrand(newPro.getBrand());
        product.setPrice(newPro.getPrice());
        product.setCategory(newPro.getCategory());
        product.setReleaseDate(newPro.getReleaseDate());
        product.setImageUrl(imageName);
        product.setAvailability(newPro.isAvailability());
        product.setQuantity(newPro.getQuantity());

        return toResponse(repo.save(product));
    }

    public ProductResponse updateProduct(Integer id, ProductUploadRequest newPro)
            throws IOException {
        Product oldPro = repo.findById(id).orElseThrow(() -> new ProductNotFoundException(id));

        MultipartFile image = newPro.getImage();

        oldPro.setName(newPro.getName());
        oldPro.setDescription(newPro.getDescription());
        oldPro.setBrand(newPro.getBrand());
        oldPro.setPrice(newPro.getPrice());
        oldPro.setCategory(newPro.getCategory());
        oldPro.setReleaseDate(newPro.getReleaseDate());
        if (image != null && !image.isEmpty()){
            oldPro.setImageUrl(imageService.uploadImage(image));
        }
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

    public Page<ProductResponse> findProducts(String name, String brand, String category, Boolean availability, Boolean lowStock,
                                              String sortBy, String sortOrder, int page, int size){
        Sort sort = Sort.unsorted();
        if(sortBy != null && !sortBy.isBlank()){
            if(sortBy.equalsIgnoreCase("name")){
                sort = JpaSort.unsafe("LOWER(name)").ascending();
            } else{
                if(sortOrder != null && sortOrder.equalsIgnoreCase("desc")){
                    sort = Sort.by(sortBy).descending();
                } else{
                    sort = Sort.by(sortBy).ascending();
                }
            }
        }

        Pageable pageable = PageRequest.of(page, size, sort);
        return repo.findProducts(name, brand, category, availability, lowStock, pageable).map(this::toResponse);
    }

}
