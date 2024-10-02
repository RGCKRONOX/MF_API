import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PolizasModule } from './polizas/polizas.module';
import { MovimientosPolizaModule } from './movimientos-poliza/movimientos-poliza.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import sqlServerConfig from './core/database/SqlServerDataSource';
import { ConfigModule } from '@nestjs/config';
import { CuentasModule } from './cuentas/cuentas.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigurationModule } from './core/config/configuration.module';
import { PremiumModule } from './premium/premium.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    // env config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    ConfigurationModule,
    // modules
    // database connections
    // TypeOrmModule.forRoot(sqlServerConfig),
    PremiumModule,



  ],
})
export class AppModule {}
