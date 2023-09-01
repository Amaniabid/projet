package amigo.tn;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import amigo.tn.security.auth.AuthentificationService;
import amigo.tn.security.auth.RegisterRequest;
import org.springframework.context.annotation.ComponentScan;

import static amigo.tn.security.user.Role.*;

@SpringBootApplication
public class AmigotestApplication {

	public static void main(String[] args) {
		SpringApplication.run(AmigotestApplication.class, args);
	}
	@Bean
	public CommandLineRunner commandLineRunner(
			AuthentificationService service
	) {
		return args -> {
			try {
				var admin = RegisterRequest.builder()
						.firstname("admin")
						.lastname("admin")
						.email("admin@mail.com")
						.password("password")
						.role(ADMIN)
						.build();
				System.out.println("Admin token: " + service.register(admin).getAccessToken());

				var manager = RegisterRequest.builder()
						.firstname("manger")
						.lastname("manger")
						.email("manger@mail.com")
						.password("password")
						.role(MANAGER)
						.build();
				System.out.println("Manager token: " + service.register(manager).getAccessToken());
			}

			catch(Exception ex) {
				System.out.println(ex);

			}

		};
	}
}
