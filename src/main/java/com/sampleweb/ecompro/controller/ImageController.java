package com.sampleweb.ecompro.controller;

import com.sampleweb.ecompro.DTO.ImageResponse;
import com.sampleweb.ecompro.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    ImageService imageService;

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file)
            throws IOException {

        return imageService.uploadImage(file);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName)
            throws IOException{

        ImageResponse image = imageService.getImage(fileName);

        if(image == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().contentType(image.getMediaType()).body(image.getResource());
    }
}
