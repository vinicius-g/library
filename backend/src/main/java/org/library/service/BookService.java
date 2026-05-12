package org.library.service;

import org.library.dto.BookDTO;
import org.library.dto.create.CreateBookDTO;
import org.library.dto.update.UpdateBookDTO;
import org.library.entity.Book;
import org.library.entity.Category;
import org.library.mapper.BookMapper;
import org.library.repository.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        book.setCopies(dto.copies());
        book.setAvailableCopies(dto.copies());
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
        if (dto.copies() != null && !book.getCopies().equals(dto.copies())) {
            int difference = dto.copies() - book.getCopies();
            book.setCopies(dto.copies());
            book.setAvailableCopies(book.getAvailableCopies() + difference);
        }
        return BookMapper.toDto(bookRepository.save(book));
    }

    public Book findById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
    }

    public Book borrowBook(Book book) {
        if (book.getAvailableCopies() <= 0) {
            throw new RuntimeException("Não há cópias disponíveis para empréstimo");
        }
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        return bookRepository.save(book);
    }

    public void returnBook(Book book) {
        if (book.getAvailableCopies() >= book.getCopies()) {
            throw new RuntimeException("Todas as cópias já estão disponíveis");
        }
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);
    }

    public Page<BookDTO> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable).map(BookMapper::toDto);
    }
}
