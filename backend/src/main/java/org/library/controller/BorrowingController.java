package org.library.controller;

import org.library.dto.BorrowingDTO;
import org.library.dto.create.CreateBorrowingDTO;
import org.library.entity.Borrowing;
import org.library.service.BorrowingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/borrowing")
public class BorrowingController {

    private final BorrowingService borrowingService;

    public BorrowingController(BorrowingService borrowingService) {
        this.borrowingService = borrowingService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<BorrowingDTO> borrowBook(@RequestBody CreateBorrowingDTO dto) {
        return ResponseEntity.ok(borrowingService.borrow(dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/return/{borrowingId}")
    public ResponseEntity<Void> returnBook(@PathVariable Long borrowingId) {
        borrowingService.returnBorrow(borrowingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Page<BorrowingDTO>> getBorrowingById(@PathVariable Long userId, Pageable pageable) {
        return ResponseEntity.ok(borrowingService.getBorrowingsByUserId(userId, pageable));
    }

}
