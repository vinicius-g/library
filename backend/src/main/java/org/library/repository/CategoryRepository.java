package org.library.repository;


import org.library.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Set<Category> findAllByIdIn(Set<Long> ids);
}
