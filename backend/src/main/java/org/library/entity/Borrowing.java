package org.library.entity;

import jakarta.persistence.*;
import jakarta.validation.Constraint;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@Entity
@Table(
        name = "borrowing",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "u_borrowing",
                        columnNames = {"user_id", "book_id", "borrowed_at"}
                )
        }
)
@NoArgsConstructor
@AllArgsConstructor

public class Borrowing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "borrowed_at", nullable = false)
    private LocalDateTime borrowedAt;

    @Column(name = "must_return_at", nullable = false)
    private LocalDateTime mustReturnAt;

    @Column(name = "returned_at")
    private LocalDateTime returnedAt;

    @Column(name = "book_condition")
    private String bookCondition;

}
