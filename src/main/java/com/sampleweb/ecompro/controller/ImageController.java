package com.sampleweb.ecompro.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file)
            throws IOException {

        Path uploadPath = Paths.get("uploads");

        String fileName = file.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf("."));

        String uuid = UUID.randomUUID().toString();
        String name = uuid + extension;

        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        file.transferTo(uploadPath.resolve(name));

        return name;
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName)
            throws IOException{

        Path imagePath = Paths.get("uploads").resolve(fileName);
        String resourceType = Files.probeContentType(imagePath);
        MediaType mediaType = MediaType.parseMediaType(resourceType);

        if(!Files.exists(imagePath)){
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(imagePath.toUri());

        return ResponseEntity.ok().contentType(mediaType).body(resource);
    }
}
