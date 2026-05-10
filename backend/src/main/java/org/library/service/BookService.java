package org.library.service;

import org.library.dto.BookDTO;
import org.library.dto.create.CreateBookDTO;
import org.library.dto.update.UpdateBookDTO;
import org.library.entity.Book;
import org.library.entity.Category;
import org.library.mapper.BookMapper;
import org.library.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class BookService {

    private final BookRepository bookRepository;

    private final CategoryService categoryService;

    public BookService(
            BookRepository bookRepository,
            CategoryService categoryService
    ) {
        this.bookRepository = bookRepository;
        this.categoryService = categoryService;
    }


    public BookDTO create(CreateBookDTO dto) {
        Set<Category> categories = categoryService.findAllByIdIn(dto.categoriesIds());
        Book book = new Book();
        book.setAuthor(dto.author());
        book.setTitle(dto.title());
        book.setIsbn(dto.isbn());
        book.setCategories(categories);
        return BookMapper.toDto(bookRepository.save(book));
    }

    public BookDTO update(UpdateBookDTO dto, Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
        if (dto.title() != null && !book.getTitle().equals(dto.title())) {
            book.setTitle(dto.title());
        }
        if (dto.author() != null && !book.getAuthor().equals(dto.author())) {
            book.setAuthor(dto.author());
        }
        if (dto.isbn() != null && !book.getIsbn().equals(dto.isbn())) {
            book.setIsbn(dto.isbn());
        }
        if (dto.categoriesIds() != null && !dto.categoriesIds().isEmpty()) {
            Set<Category> categories = categoryService.findAllByIdIn(dto.categoriesIds());
            book.setCategories(categories);
        }
        return BookMapper.toDto(bookRepository.save(book));

    }
}
