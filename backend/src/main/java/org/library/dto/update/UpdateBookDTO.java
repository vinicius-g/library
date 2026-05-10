package org.library.dto.update;

import org.hibernate.validator.constraints.ISBN;

import java.util.Set;

public record UpdateBookDTO(
        String title,

        String author,

        @ISBN(message = "O ISBN precisa ser válido")
        String isbn,

        Set<Long> categoriesIds
) {
}
