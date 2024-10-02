import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpCode, HttpStatus } from '@nestjs/common';
import { PolizasService } from './polizas.service';
import { PolizaDto } from './polizas.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from '../response/response.dto';


@Controller('polizas')
export class PolizasController {
  constructor(private readonly polizasService: PolizasService) { }

  @Get()
  async findAll() {
    return await this.polizasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.polizasService.findOne(+id) || "null";
  }

  @Post()
  @ApiBody({
    type: [PolizaDto]
  })
  @ApiOperation({
    summary: 'Crear polizas',
    description: 'Crear polizas'
  })
  @ApiResponse({
    type: ResponseDto,
    status: 201,
    description: 'Polizas creadas correctamente'
  })
  @ApiResponse({
    type: ResponseDto,
    status: 500,
    description: 'Error en el servidor'
  })
  async create(
    @Body() polizas: PolizaDto[],
    @Response() res
  ) {
    try {
      return res.status(HttpStatus.CREATED).json(await this.polizasService.create(polizas));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        type: "error",
        message: "Error al crear polizas",
        data: error
      });
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePolizaDto: UpdatePolizaDto) {
  //   return this.polizasService.update(+id, updatePolizaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.polizasService.remove(+id);
  // }
}
