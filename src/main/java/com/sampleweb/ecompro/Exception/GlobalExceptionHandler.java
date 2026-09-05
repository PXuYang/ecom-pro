package com.sampleweb.ecompro.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> validationException(MethodArgumentNotValidException ex){
        Map<String, List<String>> errors = new HashMap<>();

        for(FieldError error : ex.getBindingResult().getFieldErrors()){
            errors.computeIfAbsent(error.getField(), key -> new ArrayList<>())
                    .add(error.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(ProductImageException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(ProductImageException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Map<String, String>> productNotFoundException(ProductNotFoundException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> bodyMissingException(HttpMessageNotReadableException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", "Wrong data type or Body is missing!");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> usernameAlreadyExistsException(UsernameAlreadyExistsException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(errors);
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<Map<String, String>> roleNotFoundException(RoleNotFoundException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Map<String, String>> handleAuthenticationException(AuthenticationException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", "Invalid username or password");

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errors);
    }

    @ExceptionHandler(PasswordIncorrectException.class)
    public ResponseEntity<Map<String, String>> passwordIncorrectException(PasswordIncorrectException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(OldNewPasswordSameException.class)
    public ResponseEntity<Map<String, String>> oldNewPasswordSameException(OldNewPasswordSameException ex){
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}
