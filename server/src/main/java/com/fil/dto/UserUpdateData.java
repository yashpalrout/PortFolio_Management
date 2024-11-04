package com.fil.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
public class UserUpdateData {
    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    @NotNull
    private Date dob;
}