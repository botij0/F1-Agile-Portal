package com.f1metag.Usuario.Services;

import com.f1metag.Common.Requests.UserRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Usuario.Models.Usuario;
import com.f1metag.Usuario.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;


    public ArrayList<Usuario> getAllUsers(){
        return (ArrayList<Usuario>) usuarioRepository.findAll();
    }

    public Usuario getUsuario(Long id){
        return usuarioRepository.findById(id).orElseThrow();
    }

    public Usuario getAuthenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var username = authentication.getName();
        return usuarioRepository.findByUsername(username).orElseThrow();
    }

    public Usuario updateUser(UserRequest userRequest){
        Usuario oldUser = usuarioRepository.findById(userRequest.getId()).orElseThrow();
        oldUser.setNombre(userRequest.getNombre());
        oldUser.setUsername(userRequest.getUsername());
        oldUser.setEmail(userRequest.getEmail());
        oldUser.setRol(userRequest.getRol());
        usuarioRepository.save(oldUser);

        return oldUser;
    }

    public void deleteUser (long id){
        usuarioRepository.deleteById(id);
    }


}
