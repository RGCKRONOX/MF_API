import { Module } from '@nestjs/common';
import { PolizasService } from './polizas.service';
import { PolizasController } from './polizas.controller';
import { Polizas } from './polizas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { ConfigurationModule } from 'src/core/config/configuration.module';

@Module({
  controllers: [PolizasController],
  providers: [PolizasService],
  imports: [
    TypeOrmModule.forFeature([Polizas]),
    LoggerModule,
    ConfigurationModule
  ],
})
export class PolizasModule {}
