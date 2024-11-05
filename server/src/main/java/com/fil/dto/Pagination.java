package com.fil.dto;


import org.springframework.data.domain.PageRequest;

import java.awt.print.Pageable;
import java.util.HashMap;
import java.util.Map;

public class Pagination {
    private int page;
    private int size;

    public Pagination(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public static Map<String, Object> paginationMap(Pagination pagination, int total) {
        Map<String, Object> map = new HashMap<>();
        map.put("page", pagination.getPage());
        map.put("size", pagination.getSize());
        map.put("total", total);
        return map;
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }

    public int getSkip() {
        return Math.max(0, (page - 1) * size);
    }

    public Pageable toPageable() {
        return (Pageable) PageRequest.of(page, size);
    }
}
