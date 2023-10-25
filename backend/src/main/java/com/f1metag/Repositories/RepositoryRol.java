package com.f1metag.Repositories;

import com.f1metag.Entities.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryRol extends JpaRepository<Rol, Long>{
    Rol findById(long id);

}
