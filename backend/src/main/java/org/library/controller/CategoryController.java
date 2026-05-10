package org.library.controller;

import org.library.dto.CategoryDTO;
import org.library.dto.create.CreateCategoryDTO;
import org.library.dto.update.UpdateCategoryDTO;
import org.library.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CreateCategoryDTO dto) {
        return ResponseEntity.ok(categoryService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody UpdateCategoryDTO dto, @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.update(dto, id));
    }

}
