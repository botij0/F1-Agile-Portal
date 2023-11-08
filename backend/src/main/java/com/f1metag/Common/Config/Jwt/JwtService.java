package com.f1metag.Common.Config.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;



@Service
public class JwtService {

    // Clave secreta para firmar el token
    private static final String SECRET_KEY = "1FC3DC72A47F702E31BA566298BF57BF4DB4BC451C5468DB35A982524DBBB785";

    public String getToken(UserDetails usuario) {
        return getToken(new HashMap<>(), usuario);
    }

    private String getToken(Map<String, Object> extraClaims, UserDetails usuario) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(usuario.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 *24))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();

    }

    /*
    * El método generateToken() es el encargado de generar el token.
     */

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    /* El método getUsernameFromToken() es el encargado de obtener el nombre de usuario del token.
    *  Para ello, se utiliza el método getClaim() que recibe como parámetro el token y una función que
    * se encarga de obtener el nombre de usuario del token, que se setea en el campo subject del token.
    */

    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    /* El método isTokenValid() es el encargado de validar el token.
    *  Para ello, se obtiene el nombre de usuario del token y se verifica que el nombre de usuario del token
    *  sea igual al nombre de usuario del usuario que se recibe como parámetro, y que el token no esté expirado.
    *  */

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /*
    * El método getAllClaims() es el encargado de obtener los claims del token.
     */

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /*
    * El método getClaim() es el encargado de obtener los claims del token.
     */

    public <T> T getClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /*
    * El método getExpirationDateFromToken() es el encargado de obtener la fecha de expiración del token de los claims.
     */

    private Date getExpirationDateFromToken(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    /*
    * El método isTokenExpired() es el encargado de verificar si el token está expirado, basándose en la fecha de expiración del token y la fecha actual.
     */

    private boolean isTokenExpired(String token) {
        return getExpirationDateFromToken(token).before(new Date());
    }


}
