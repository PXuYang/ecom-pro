package com.sampleweb.ecompro.Exception;

public class OldNewPasswordSameException extends RuntimeException {
    public OldNewPasswordSameException(String message) {
        super(message);
    }
}
