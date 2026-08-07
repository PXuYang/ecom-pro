package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.DTO.ImageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {

    private final Path UPLOADPATH;

    public ImageService( @Value("${file.upload-dir}") String uploads){
        this.UPLOADPATH = Paths.get(uploads);
    }

    public String uploadImage(MultipartFile file)
            throws IOException {

        String fileName = file.getOriginalFilename();
        if(fileName == null){
            throw new IllegalArgumentException("File Name cannot be null");
        }
        String extension = fileName.substring(fileName.lastIndexOf("."));

        String uuid = UUID.randomUUID().toString();
        String imageName = uuid + extension;

        if(!Files.exists(UPLOADPATH)){
            Files.createDirectories(UPLOADPATH);
        }

        file.transferTo(UPLOADPATH.resolve(imageName));

        return imageName;
    }

    public ImageResponse getImage(String fileName)
            throws IOException {

        Path imagePath = UPLOADPATH.resolve(fileName);

        if(!Files.exists(imagePath)){
            return null;
        }

        String resourceType = Files.probeContentType(imagePath);

        if(resourceType == null){
            resourceType = "application/octet-stream";
        }

        MediaType mediaType = MediaType.parseMediaType(resourceType);

        Resource resource = new UrlResource(imagePath.toUri());

        return new ImageResponse(resource, mediaType);
    }
}
