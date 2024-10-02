import { ApiProperty } from "@nestjs/swagger";

export class MovimientoPolizaDto {
    @ApiProperty()
    NumMovto: number;
    @ApiProperty()
    CodigoCuenta: string;
    @ApiProperty()
    Importe: number;
    @ApiProperty()
    TipoMovto: number;
    @ApiProperty()
    Guid: string;
    @ApiProperty({nullable: true})
    Concepto?: string | null;
    @ApiProperty({nullable: true})
    Referencia?: string | null;
    @ApiProperty({nullable: true})
    SegmentoNegocio?: string | null;
}