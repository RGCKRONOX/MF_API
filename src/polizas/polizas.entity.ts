import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Polizas {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    RowVersion: string;
    @Column()
    Ejercicio: number;
    @Column()
    Periodo: number;
    @Column()
    TipoPol: string;
    @Column()
    Folio: number;
    @Column()
    Clase: string;
    @Column()
    Impresa: number;
    @Column()
    Concepto: string;
    @Column()
    Fecha: Date;
    @Column()
    Cargos: number;
    @Column()
    Abonos: number;
    @Column()
    IdDiario: number;
    @Column()
    SistOrig: string;
    @Column()
    Ajuste: number;
    @Column()
    IdUsuario: number;
    @Column()
    ConFlujo: boolean;
    @Column()
    ConCuadre: boolean;
    @Column()
    TimeStamp: string;
    @Column()
    RutaAnexo: string;
    @Column()
    ArchivoAnexo: string;
    @Column()
    Guid: string;
    @Column()
    tieneDoctoBancario: boolean;
}