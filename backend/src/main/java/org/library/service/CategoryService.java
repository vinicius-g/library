package org.library.service;

import org.library.dto.CategoryDTO;
import org.library.dto.create.CreateCategoryDTO;
import org.library.dto.update.UpdateCategoryDTO;
import org.library.entity.Category;
import org.library.mapper.CategoryMapper;
import org.library.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public CategoryDTO create(CreateCategoryDTO dto) {
        Category category = categoryRepository.save(Category.builder().name(dto.name()).build());

        return new CategoryDTO(category.getId(), category.getName());
    }

    public CategoryDTO update(UpdateCategoryDTO dto, Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        category.setName(dto.name());
        categoryRepository.save(category);

        return new CategoryDTO(category.getId(), category.getName());
    }

    public Set<Category> findAllByIdIn(Set<Long> ids) {
        return categoryRepository.findAllByIdIn(ids);
    }
}
