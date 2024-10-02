import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuentas } from './cuentas.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { ConfigurationModule } from 'src/core/config/configuration.module';

@Module({
  controllers: [CuentasController],
  providers: [CuentasService],
  imports: [
    TypeOrmModule.forFeature([Cuentas]),
    LoggerModule,
    ConfigurationModule
  ],
})
export class CuentasModule { }
