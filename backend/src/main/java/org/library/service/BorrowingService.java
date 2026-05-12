package org.library.service;

import org.library.dto.BorrowingDTO;
import org.library.dto.create.CreateBorrowingDTO;
import org.library.dto.create.ReturnBorrowingDTO;
import org.library.entity.Borrowing;
import org.library.mapper.BorrowingMapper;
import org.library.repository.BorrowingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BorrowingService {

    private final BorrowingRepository borrowingRepository;
    private final BookService bookService;
    private final UserService userService;

    public BorrowingService(
            BorrowingRepository borrowingRepository,
            BookService bookService,
            UserService userService
    ) {
        this.borrowingRepository = borrowingRepository;
        this.bookService = bookService;
        this.userService = userService;
    }

    public BorrowingDTO borrow(CreateBorrowingDTO dto) {
        var user = userService.findById(dto.userId());
        var book = bookService.findById(dto.bookId());

        Borrowing borrowing = new Borrowing();
        borrowing.setUser(user);
        borrowing.setBorrowedAt(LocalDateTime.now());
        borrowing.setMustReturnAt(dto.mustReturnAt());
        borrowing.setBook(bookService.borrowBook(book));

        return BorrowingMapper.toDto(borrowingRepository.save(borrowing));
    }

    public void returnBorrow(ReturnBorrowingDTO dto) {
        var borrowing = borrowingRepository.findById(dto.borrowingId())
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));
        if (borrowing.getReturnedAt() != null) {
            throw new RuntimeException("Empréstimo já foi devolvido");
        }
        borrowing.setReturnedAt(dto.returnedAt());
        borrowing.setBookCondition(dto.bookCondition());
        
        // Só incrementa availableCopies se NÃO for DANIFICADO
        if (!"DANIFICADO".equalsIgnoreCase(dto.bookCondition())) {
            bookService.returnBook(borrowing.getBook());
        }
        
        borrowingRepository.save(borrowing);
    }

    public Page<BorrowingDTO> getBorrowingsByUserId(Long userId, Pageable pageable) {
        return borrowingRepository.findByUserId(userId, pageable).map(BorrowingMapper::toDto);
    }

    public Page<BorrowingDTO> getActiveBorrowingsByUserId(Long userId, Pageable pageable) {
        return borrowingRepository.findByUserIdAndReturnedAtIsNull(userId, pageable).map(BorrowingMapper::toDto);
    }

}
