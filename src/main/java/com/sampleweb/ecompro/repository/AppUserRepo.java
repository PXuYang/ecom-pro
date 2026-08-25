package com.sampleweb.ecompro.repository;

import com.sampleweb.ecompro.model.AppUser;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepo extends JpaRepository<AppUser, Integer> {

    @EntityGraph(attributePaths = "roles")
    Optional<AppUser> findByUsername(String username);

    boolean existsByUsername(String username);
}
