package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.DTO.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class PageService {

    public <T> PageResponse<T> toResponse(Page<T> page){

        PageResponse<T> pageResponse = new PageResponse<>();
        pageResponse.setPage(page.getNumber());
        pageResponse.setSize(page.getSize());
        pageResponse.setTotalPages(page.getTotalPages());
        pageResponse.setTotalElements(page.getTotalElements());
        pageResponse.setContent(page.getContent());
        pageResponse.setFirst(page.isFirst());
        pageResponse.setLast(page.isLast());

        return pageResponse;
    }
}
