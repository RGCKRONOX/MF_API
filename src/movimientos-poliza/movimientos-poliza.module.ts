import { Module } from '@nestjs/common';
import { MovimientosPolizaService } from './movimientos-poliza.service';
import { MovimientosPolizaController } from './movimientos-poliza.controller';

@Module({
  controllers: [MovimientosPolizaController],
  providers: [MovimientosPolizaService]
})
export class MovimientosPolizaModule {}
