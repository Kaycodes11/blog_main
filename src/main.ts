import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { options } from 'tsconfig-paths/lib/options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  const configService = app.get<ConfigService>(ConfigService);

  //swagger setup
  const config = new DocumentBuilder()
    .setTitle('Main Blog')
    .setDescription('This is Main Blog')
    .setVersion('1.0')
    .addTag('Blog')
    .addBearerAuth()
    .build();

  // if used setGlobalPrefix('v1') then the URL becomes from localhost:3000/api to localhost:3000/v1/api
  // if needed customer swagger-ui with ExpressSwaggerCustomOptions
  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'My Blog apis here',
  };

  SwaggerModule.setup('api', app, document, customOptions);
  const logger: Logger = new Logger();
  const PORT = +configService.get<number>('PORT');
  await app.listen(PORT, () => {
    process.env.MODE === `DEV` &&
      logger.log(`Application hosted on http://localhost:${PORT}`);
  });
}
bootstrap()
  .then(() =>
    console.log(
      `SERVER: `,
      `Server is running successfully at ${process.env.PORT}`,
    ),
  )
  .catch((e: any) => console.error(e.message));
