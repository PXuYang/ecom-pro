package com.sampleweb.ecompro.repository;

import com.sampleweb.ecompro.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepo extends JpaRepository<AppUser, Integer> {

    Optional<AppUser> findByUserName(String userName);

    boolean existsByUserName(String userName);
}
