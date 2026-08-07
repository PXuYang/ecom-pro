package com.sampleweb.ecompro.DTO;

import lombok.Data;

import java.util.List;

@Data
public class PageResponse<T> {

    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
    private List<T> content;
    private boolean first;
    private boolean last;

}
