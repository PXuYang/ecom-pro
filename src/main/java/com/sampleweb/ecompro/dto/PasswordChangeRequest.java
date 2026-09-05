package com.sampleweb.ecompro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PasswordChangeRequest {

    @NotBlank(message = "Current password cannot be empty")
    private String currentPassword;

    @NotBlank(message = "Password cannot be empty")
    @Pattern(regexp = ".{8,}", message = "Password must be at least eight characters")
    @Pattern(regexp = ".*[a-z].*", message = "Password must contain one lowercase letter")
    @Pattern(regexp = ".*\\d.*", message = "Password must contain one number")
    @Pattern(regexp = ".*[^A-Za-z0-9].*", message = "Password must contain one special character")
    @Pattern(regexp = ".*[A-Z].*", message = "Password must contain one uppercase letter")
    private String newPassword;
}
