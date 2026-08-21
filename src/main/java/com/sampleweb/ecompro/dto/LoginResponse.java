package com.sampleweb.ecompro.dto;

import com.sampleweb.ecompro.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String username;
    private Set<RoleName> roles;
    private String token;
}
