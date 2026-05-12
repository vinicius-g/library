package org.library.mapper;

import org.library.dto.BookDTO;
import org.library.entity.Book;

public class BookMapper {
    public static BookDTO toDto(Book entity) {
        return new BookDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getAuthor(),
                entity.getIsbn(),
                CategoryMapper.toDtoSet(entity.getCategories()),
                entity.getCopies(),
                entity.getAvailableCopies()
        );
    }
}
