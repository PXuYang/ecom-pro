package com.sampleweb.ecompro.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class JwtService {

    @Value("${jwt.expiration}")
    private long jwtExpirationSeconds;

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    public JwtService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
    }

    public String generateJwt(AppUserDetails appUserDetails){

        String username = appUserDetails.getUsername();

        Instant now = Instant.now();
        Instant issuedAt = now;
        Instant expiresAt = now.plusSeconds(jwtExpirationSeconds);

        List<String> roles = appUserDetails.getAuthorities()
                .stream().map(GrantedAuthority::getAuthority)
                .toList();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(username)
                .issuedAt(issuedAt)
                .expiresAt(expiresAt)
                .claim("roles", roles)
                .build();

        Jwt jwt = jwtEncoder.encode(JwtEncoderParameters.from(claims));

        return jwt.getTokenValue();
    }

    public Jwt decodeToken(String token){

        return jwtDecoder.decode(token);
    }

}
