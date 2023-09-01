package amigo.tn.security.auth;


import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthentificationController {

  private final AuthentificationService service;
  @PostMapping("/register")
  public ResponseEntity<AuthentificationResponse> register(@RequestBody RegisterRequest request) {
    try {
      AuthentificationResponse response = service.register(request);
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      AuthentificationResponse errorResponse = new AuthentificationResponse();
      errorResponse.setAccessToken("L'email existe déjà.");
      return ResponseEntity.status(402).body(errorResponse);
    }
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthentificationResponse> authenticate(
          @RequestBody AuthentificationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }

}
