import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import ContpaqiContabilidadConfigDto from "../core/config/dto/ContpaqiContabilidadConfigDto";
import SqlServerConfigDto from "../core/config/dto/SqlServerConfigDto";
import { DateTime } from "luxon";
import { Cuentas } from "./cuentas.entity";
import { ECUENTADEMAYOR, ECUENTATIPO } from "./cuentas.enums";
import { BaseConfigurationDto } from "src/core/config/dto/BaseConfiguration.dto";

export class CuentaDto {
    @ApiProperty()
    Id: number = 0;
    @ApiProperty({ nullable: false })
    AgrupadorSAT: string = "";
    @ApiProperty({ nullable: false })
    Codigo: string = "";
    @ApiProperty({ nullable: false })
    CodigoCuentaAcumula: string = "";
    @ApiProperty({ nullable: false })
    FechaAlta: string = DateTime.now().toISO().replace("Z", " ").split(".")[0];
    @ApiProperty()
    Consume: string = "";
    @ApiProperty({
        enum: ECUENTADEMAYOR,
        nullable: true,
        default: ECUENTADEMAYOR.CUENTA_CUENTADEMAYORNO,
    })
    CtaMayor?: ECUENTADEMAYOR = ECUENTADEMAYOR.CUENTA_CUENTADEMAYORNO;
    @ApiProperty({
        enum: ECUENTATIPO,
        nullable: true,
        default: ECUENTATIPO.CUENTA_ACTIVODEUDORA
    })
    Tipo?: ECUENTATIPO = ECUENTATIPO.CUENTA_ACTIVODEUDORA;
    @ApiProperty()
    DigitoAgrupador: number = 0;
    @ApiProperty()
    DigitoFiscal1: number = 0;
    @ApiProperty()
    DigitoFiscal2: number = 0;
    @ApiProperty()
    AplicaSegNeg: number = 0;
    @ApiProperty()
    EsBaja: number = 0;
    @ApiProperty()
    Moneda: number = 0;
    @ApiProperty()
    Nombre: string = "";
    @ApiProperty()
    NomIdioma: string = "";
    @ApiProperty()
    RubroNIF: string = "";
    @ApiProperty()
    SegNeg: number = 0;
}

export class NewCuentaDto extends OmitType(CuentaDto, ['Id']) { }
export class SearchCuentaDto extends PartialType(Cuentas) { }

export class CuentasDataFileContentConectorDto extends BaseConfigurationDto {
    cuentas: NewCuentaDto[];
}

