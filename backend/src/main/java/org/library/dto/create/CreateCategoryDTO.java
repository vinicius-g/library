package org.library.dto.create;

import jakarta.validation.constraints.NotNull;
import lombok.NonNull;

public record CreateCategoryDTO(

        @NotNull(message = "O nome da categoria é obrigatório")
        String name
) {
}
