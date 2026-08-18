package com.sampleweb.ecompro.service;

import com.sampleweb.ecompro.DTO.AppUserDetails;
import com.sampleweb.ecompro.model.AppUser;
import com.sampleweb.ecompro.repository.AppUserRepo;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final AppUserRepo appUserRepo;

    public AppUserDetailsService(AppUserRepo appUserRepo) {
        this.appUserRepo = appUserRepo;
    }

    @Override
    public @NonNull UserDetails loadUserByUsername(@NonNull String userName)
            throws UsernameNotFoundException {

        AppUser user =
                appUserRepo.findByUserName(userName)
                        .orElseThrow(() -> new UsernameNotFoundException(userName));

        return new AppUserDetails(user);

    }

}
