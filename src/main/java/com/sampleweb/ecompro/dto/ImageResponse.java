package com.sampleweb.ecompro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

@Data
@AllArgsConstructor
public class ImageResponse {

    private Resource resource;
    private MediaType mediaType;
}
