package org.library.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @Email(message = "O email deve ser válido")
        String username,

        @Size(min = 8, message = "A senha deve conter pelo menos 8 caracteres")
        String password
) {}

