package com.sampleweb.ecompro.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    @Pattern(regexp = "\\S+", message = "User name cannot contain spaces!")
    private String userName;

    @NotBlank
    @Pattern(regexp = "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,}$",
             message = "Password must be at least eight characters " +
                     "\nand contain one uppercase letter," +
                     "\none lowercase letter" +
                     "\none number" +
                     "\none special character")
    private String userPassword;

}
