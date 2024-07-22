package org.codelap_spring_project.controller;

import io.jsonwebtoken.*;
import org.codelap_spring_project.domain.UserInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.jsonwebtoken.SignatureAlgorithm.HS512;


@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    public String generateToken(UserInfo userDetails) {
//        UserInfo userDetails = (UserInfo) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(userDetails.getId())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(HS512, jwtSecret)
                .compact();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("잘못된 JWT 서명입니다.");
        } catch (MalformedJwtException ex) {
            logger.error("잘못된 JWT 토큰입니다.");
        } catch (ExpiredJwtException ex) {
            logger.error("JWT 토큰이 만료되었습니다.");
        } catch (UnsupportedJwtException ex) {
            logger.error("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT 클레임이 잘못되었습니다.");
        }
        return false;
    }

    public String getid(String authToken) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(authToken);
            Claims body = claimsJws.getBody();
            return body.getSubject()!=null?body.getSubject():"";
        } catch (Exception  e) {
            // 예외 처리 로직 추가
            e.printStackTrace(); // 예외를 출력하거나 로깅할 수 있음
            // 필요한 경우 예외를 더 높은 레벨로 throw할 수도 있음
            throw new RuntimeException("암호화 알고리즘을 가져오는 중 예외 발생", e);
        }
    }
}
