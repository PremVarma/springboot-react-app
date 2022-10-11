package com.prem.demo;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class EmailValidatorTest {
    private final EmailValidator emailValidator = new EmailValidator();
    @Test
    public void isShouldValidateCorrectEmail(){
        assertThat(emailValidator.test("prem@gmail.com")).isTrue();
    }

    @Test
    public void isShouldValidateInCorrectEmail(){
        assertThat(emailValidator.test("premgmail.com")).isFalse();
    }

    @Test
    public void isShouldValidateCorrectEmailWithoutDotAtTheEnd(){
        assertThat(emailValidator.test("prem@gmailcom")).isFalse();
    }
}