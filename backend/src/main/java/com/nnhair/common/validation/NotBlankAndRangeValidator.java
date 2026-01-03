package com.nnhair.common.validation;

import com.nnhair.common.validation.annotation.NotBlankAndRange;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NotBlankAndRangeValidator implements ConstraintValidator<NotBlankAndRange, String> {

    private String fieldName;
    private int min;
    private int max;

    @Override
    public void initialize(NotBlankAndRange constraintAnnotation) {
        this.fieldName = constraintAnnotation.fieldName();
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.trim().isEmpty()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(fieldName + " cannot be blank")
                    .addConstraintViolation();
            return false;
        }

        if (value.length() < min || value.length() > max) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    fieldName + " must be between " + min + " and " + max + " characters")
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}