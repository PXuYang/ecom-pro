package com.sampleweb.ecompro.security;

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
    public @NonNull UserDetails loadUserByUsername(@NonNull String username)
            throws UsernameNotFoundException {

        AppUser user =
                appUserRepo.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException(username));

        return new AppUserDetails(user);

    }

}
