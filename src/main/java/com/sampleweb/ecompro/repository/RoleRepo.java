package com.sampleweb.ecompro.repository;

import com.sampleweb.ecompro.enums.RoleName;
import com.sampleweb.ecompro.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {

    Optional<Role> findByRoleName(RoleName roleName);
}
