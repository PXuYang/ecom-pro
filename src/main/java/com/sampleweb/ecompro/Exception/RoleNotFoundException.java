package com.sampleweb.ecompro.Exception;

public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException(String roleName) {
        super("Role " + roleName + " is not found in system!");
    }
}
