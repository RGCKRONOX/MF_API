import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cuentas {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    Id: number;
    @ApiProperty()
    @Column()
    Codigo: string;
    @ApiProperty()
    @Column()
    Nombre: string;
    @ApiProperty()
    @Column()
    NomIdioma?: string | null;
    @ApiProperty()
    @Column()
    Tipo?: string | null;
    @ApiProperty()
    @Column()
    EsBaja?: boolean | null;
    @ApiProperty()
    @Column()
    CtaMayor?: number | null;
    @ApiProperty()
    @Column()
    CtaEfectivo?: boolean | null;
    @ApiProperty()
    @Column()
    FechaRegistro?: Date | null;
    @ApiProperty()
    @Column()
    SistOrigen?: number | null;
    @ApiProperty()
    @Column()
    IdMoneda?: number | null;
    @ApiProperty()
    @Column()
    DigAgrup?: number | null;
    @ApiProperty()
    @Column()
    IdSegNeg?: number | null;
    @ApiProperty()
    @Column()
    SegNegMovtos?: boolean | null;
    @ApiProperty()
    @Column()
    Afectable?: number | null;
    @ApiProperty()
    @Column()
    IdRubro?: number | null;
    @ApiProperty()
    @Column()
    Consume?: number | null;
    @ApiProperty()
    @Column()
    IdAgrupadorSAT?: number | null;
    @ApiProperty()
    @Column()
    ConceptosConsume?: string | null;
}