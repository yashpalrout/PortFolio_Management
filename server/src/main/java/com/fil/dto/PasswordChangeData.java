package com.fil.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class PasswordChangeData {

    @NotBlank
    private String old_password;
    @NotBlank
    private String new_password;


}