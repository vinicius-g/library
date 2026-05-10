package org.library.mapper;

import org.library.dto.CategoryDTO;
import org.library.entity.Category;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {

    public static CategoryDTO toDto(Category entity) {
        return new CategoryDTO(entity.getId(), entity.getName());
    }

    public static Set<CategoryDTO> toDtoSet(Set<Category> entities) {
        return entities.stream().map(CategoryMapper::toDto).collect(Collectors.toSet());
    }
}
