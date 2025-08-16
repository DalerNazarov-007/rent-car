    import { NestFactory } from '@nestjs/core';
    import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
    import { AppModule } from './app.module';

    async function bootstrap() {
      const app = await NestFactory.create(AppModule);

      const config = new DocumentBuilder()
        .setTitle('Your API Title')
        .setDescription('Your API description')
        .setVersion('1.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT bearer token',
            in: 'header',
          },
          'access-token'
        )
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);

      await app.listen(4000);
    }
    bootstrap();