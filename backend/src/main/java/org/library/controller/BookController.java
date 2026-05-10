package org.library.controller;

import org.library.dto.BookDTO;
import org.library.dto.create.CreateBookDTO;
import org.library.dto.update.UpdateBookDTO;
import org.library.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;


    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public ResponseEntity<BookDTO> create(@RequestBody CreateBookDTO dto) {
        return ResponseEntity.ok(bookService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> update(@RequestBody UpdateBookDTO dto, @PathVariable Long id) {
        return ResponseEntity.ok(bookService.update(dto, id));
    }
}
