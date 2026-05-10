package org.library.controller;

import org.library.dto.BookDTO;
import org.library.dto.create.CreateBookDTO;
import org.library.dto.update.UpdateBookDTO;
import org.library.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;


    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<BookDTO> create(@RequestBody CreateBookDTO dto) {
        return ResponseEntity.ok(bookService.create(dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> update(@RequestBody UpdateBookDTO dto, @PathVariable Long id) {
        return ResponseEntity.ok(bookService.update(dto, id));
    }

    @GetMapping
    public ResponseEntity<Page<BookDTO>> getAll(Pageable pageable) {
        return ResponseEntity.ok(bookService.findAll(pageable));
    }
}
