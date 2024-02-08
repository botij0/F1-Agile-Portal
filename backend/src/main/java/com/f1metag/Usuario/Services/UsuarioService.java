package com.f1metag.Usuario.Services;

import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Usuario.Models.Rol;
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
import java.util.Optional;

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

    public ArrayList<Usuario> getNotValidatedUsers(){
        Optional<ArrayList<Usuario>> optional = usuarioRepository.findByEstadoFalse();
        ArrayList<Usuario> noValidados = new ArrayList<Usuario>();
        if (optional.isPresent()){
            noValidados = optional.get();
        }
        return noValidados;
    }

    public ApiResponse getMiembrosSinEquipo(){
        return ApiResponse.successRequest("Miembros obtenidos correctamente",
                usuarioRepository.findByRolAndEquipoIsNull(Rol.RESPONSABLE)).getBody();
    }

    public ApiResponse actualizarResponsable(Long id){

        Optional<Usuario> optional = usuarioRepository.findById(id);
        if(optional.isPresent()) {
            Usuario usuario = optional.get();
            usuario.setEstado(true);
            usuario.setRol(Rol.RESPONSABLE);
            usuarioRepository.save(usuario);
            return ApiResponse.successRequest("Responsable actualizado correctamente en la base de datos", usuario).getBody();
        }
        return ApiResponse.successRequest("Responsable no se ha actualizado correctamente en la base de datos", optional.get()).getBody();

    }

    public ApiResponse actualizarAdmin(Long id){

        Optional<Usuario> optional = usuarioRepository.findById(id);
        if(optional.isPresent()) {
            Usuario usuario = optional.get();
            usuario.setEstado(true);
            usuario.setRol(Rol.ADMIN);
            usuarioRepository.save(usuario);
            return ApiResponse.successRequest("Administrador actualizado correctamente en la base de datos", usuario).getBody();
        }
        return ApiResponse.successRequest("Administrador no se ha actualizado correctamente en la base de datos", optional.get()).getBody();

    }

    public ApiResponse rechazarSolicitud(Long id){
        usuarioRepository.deleteById(id);
        return ApiResponse.successRequest("Solicitud rechazada correctamente, usuario eliminado",id).getBody();
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

    public ApiResponse aniadirMiembroEquipo(Long id){
        Usuario usuarioAuten = getAuthenticatedUser();
        if(usuarioAuten.getEquipo() == null)
            return ApiResponse.errorRequest("El usuario no pertenece a ningún equipo").getBody();

        Usuario miembroAAniadir = getUsuario(id);
        miembroAAniadir.setEquipo(usuarioAuten.getEquipo());
        usuarioRepository.save(miembroAAniadir);

        return ApiResponse.successRequest("Equipo actualizado correctamente", miembroAAniadir).getBody();
    }

    public ApiResponse eliminarEquipoUsuario(Long id){

        Usuario miembroAEliminarEquipo = getUsuario(id);
        miembroAEliminarEquipo.setEquipo(null);
        usuarioRepository.save(miembroAEliminarEquipo);

        return ApiResponse.successRequest("Miembro actualizado correctamente", miembroAEliminarEquipo).getBody();
    }


    public void deleteUser (long id){
        usuarioRepository.deleteById(id);
    }


}
