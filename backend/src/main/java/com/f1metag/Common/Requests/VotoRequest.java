package com.f1metag.Common.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VotoRequest {
    Long votacionId;
    Long opcionId;
    String nombre;
    String email;
}