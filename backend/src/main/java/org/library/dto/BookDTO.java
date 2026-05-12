package org.library.dto;

import java.util.Set;

public record BookDTO(
        Long id,
        String title,
        String author,
        String isbn,
        Set<CategoryDTO> categories,
        Integer copies,
        Integer availableCopies
) {
}
