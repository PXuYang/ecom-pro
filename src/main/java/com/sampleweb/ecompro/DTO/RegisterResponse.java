package com.sampleweb.ecompro.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {

    private String userName;
    private String message;

}
