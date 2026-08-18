package com.sampleweb.ecompro.Exception;

public class UsernameAlreadyExistsException extends RuntimeException {

    public UsernameAlreadyExistsException() {
        super("User name is already exists!");
    }
}
