package org.library.repository;

import org.library.entity.Borrowing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BorrowingRepository extends JpaRepository<Borrowing, Long> {
    Page<Borrowing> findByUserId(Long userId, Pageable pageable);
    Page<Borrowing> findByUserIdAndReturnedAtIsNull(Long userId, Pageable pageable);
}
