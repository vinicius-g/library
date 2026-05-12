package org.library.dto.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ReturnBorrowingDTO(
        @NotNull(message = "É necessário informar o ID do empréstimo")
        Long borrowingId,

        @NotNull(message = "É necessário informar a data de devolução")
        LocalDateTime returnedAt,

        @NotBlank(message = "É necessário informar o estado do livro")
        String bookCondition
) {
}
