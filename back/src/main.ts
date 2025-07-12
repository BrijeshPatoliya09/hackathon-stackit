import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeExceptionFactory } from './utils/helper';
import { JwtGuard } from './modules/auth/jwt.guard';
import { UserService } from './modules/user/user.service';

// Main function to bootstrap the Nest.js application
async function bootstrap() {
  // Create an instance of the Nest.js application
  const app = await NestFactory.create(AppModule);

  // Apply global guards to the application
  app.useGlobalGuards(new JwtGuard(new UserService()));

  // Apply global validation pipe to handle input validation
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationPipeExceptionFactory, // Set custom exception factory
    }),
  );

  // Enable CORS to allow requests from a different origin (e.g., React app)
  app.enableCors();

  // Start the application and listen on port 3999
  await app.listen(3999);
}

// Bootstrap the application
bootstrap();
