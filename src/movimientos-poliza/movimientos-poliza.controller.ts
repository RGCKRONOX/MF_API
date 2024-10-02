import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientosPolizaService } from './movimientos-poliza.service';

@Controller('movimientos-poliza')
export class MovimientosPolizaController {
  constructor(private readonly movimientosPolizaService: MovimientosPolizaService) {}

  // @Post()
  // create(@Body() createMovimientosPolizaDto: CreateMovimientosPolizaDto) {
  //   return this.movimientosPolizaService.create(createMovimientosPolizaDto);
  // }

  // @Get()
  // findAll() {
  //   return this.movimientosPolizaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.movimientosPolizaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMovimientosPolizaDto: UpdateMovimientosPolizaDto) {
  //   return this.movimientosPolizaService.update(+id, updateMovimientosPolizaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.movimientosPolizaService.remove(+id);
  // }
}
