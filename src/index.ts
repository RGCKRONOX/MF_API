import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Logger, { ELoggerType } from './core/Logger';
import { ConfigurationService } from './core/config/configuration.service';


async function bootstrap() {
  //validate api logs file
  process.env.API_LOGS_FILE_PATH = "C:\\Program Files (x86)\\KronoxDev\\PREMIUMAPI";
  let fLogger = new Logger(ELoggerType.FILE);
  fLogger.info("Initializing API");
  // se inicializa la app con nestjs
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // let configService = app.get(ConfigurationService);
  // console.log("Loaded configuration -> ", configService.configuration);

  // se inicializa la configuracion de la documentacion de la api con swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Contpaqi Contabilidad API')
    .setDescription('API que nos permite realizar operaciones en el sistena de CONTPAQi Contabilidad , nos permite realizar operaciones como crear y consultar polizas, crear y consultar cuentas, etc.')
    .setVersion('beta')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css'
  });

  await app.listen(5055, () => fLogger.info("API listening on port 5055"));
}

bootstrap();
