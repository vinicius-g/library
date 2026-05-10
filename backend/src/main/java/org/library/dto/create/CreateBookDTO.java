package org.library.dto.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.ISBN;

import java.util.Set;

public record CreateBookDTO(

        @NotBlank
        String title,

        @NotBlank
        String author,

        @ISBN(message = "O ISBN precisa ser válido")
        String isbn,

        @NotEmpty
        Set<Long> categoriesIds
) {
}
