import { MovimientoPolizaDto } from "../movimientos-poliza/movimientos-polizas.dto";
import { Polizas } from "./polizas.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseConfigurationDto } from "src/core/config/dto/BaseConfiguration.dto";

export class PolizaSqlServerDto extends Polizas { }

export class PolizaDto {
    @ApiProperty()
    Id: number;
    @ApiProperty()
    Numero: number;
    @ApiProperty()
    Fecha: string;
    @ApiProperty()
    Ajuste: number;
    @ApiProperty()
    Concepto: string;
    @ApiProperty()
    Guid: string;
    @ApiProperty()
    Tipo: number;
    @ApiProperty({
        type: MovimientoPolizaDto,
        isArray: true
    })
    Movimientos: MovimientoPolizaDto[];
}

export class PolizasDataFileContentConectorDto extends BaseConfigurationDto {
    polizas: PolizaDto[];
}   