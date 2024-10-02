import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpStatus, Query } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { NewCuentaDto, SearchCuentaDto } from './cuentas.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from '../response/response.dto';
import { Cuentas } from './cuentas.entity';

@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear cuentas en contpaqi contabilidad',
    description: 'Crear cuentas en contpaqi contabilidad'
  })
  @ApiResponse({
    type: ResponseDto,
    status: 201,
    description: 'Cuentas creadas correctamente'
  })
  @ApiResponse({
    type: ResponseDto,
    status: 500,
    description: 'Error en el servidor'
  })
  @ApiBody({
    type: NewCuentaDto,
    isArray: true,
    description: 'Array de objetos de cuentas a crear'
  })
  async create(
    @Body() data: NewCuentaDto[],
    @Response() res
  ) {
    try {
      return res.status(HttpStatus.CREATED).json(await this.cuentasService.create(data));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        type: "error",
        message: "Error al crear las cuentas",
        data: error
      });
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Consultar cuentas en contpaqi contabilidad',
    description: 'Consultar cuentas en contpaqi contabilidad'
  })
  @ApiResponse({
    type: Cuentas,
    isArray: true,
    status: 200,
    description: 'Cuentas consultadas'
  })
  @ApiResponse({
    type: ResponseDto,
    status: 500,
    description: 'Error en el servidor'
  })
  async findAll(
    @Response() res,
    @Query('code') code: string,
  ) {
    try {
      let where: SearchCuentaDto = {};
      if (code) where.Codigo = code;
      return res.status(HttpStatus.OK).json(await this.cuentasService.findBy(where));
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        type: "error",
        message: "Error al consultar las cuentas",
        data: error
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar una cuenta en contpaqi contabilidad',
    description: 'Consultar una cuenta en contpaqi contabilidad'
  })
  @ApiResponse({
    type: Cuentas,
    status: 200,
    description: 'Cuenta consultada'
  })
  @ApiResponse({
    type: ResponseDto,
    status: 500,
    description: 'Error en el servidor'
  })
  async findOne(
    @Param('id') id: string,
    @Response() res,
  ) {
    try {
      return res.status(HttpStatus.OK).json(await this.cuentasService.findOne(+id));
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        type: "error",
        message: "Error al consultar la cuenta",
        data: error
      });
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCuentaDto: UpdateCuentaDto) {
  //   return this.cuentasService.update(+id, updateCuentaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cuentasService.remove(+id);
  // }
}
