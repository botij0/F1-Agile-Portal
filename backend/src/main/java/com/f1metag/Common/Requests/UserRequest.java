package com.f1metag.Common.Requests;


import com.f1metag.Usuario.Models.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    Long id;
    String nombre;
    String username;
    String email;
    Rol rol;
}
