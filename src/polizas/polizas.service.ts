import { Injectable } from '@nestjs/common';
import { Polizas } from './polizas.entity';
import { PolizaDto, PolizaSqlServerDto, PolizasDataFileContentConectorDto } from './polizas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { runCommand } from '../core/helpers/shell/shell.helper';
import { filePutContent } from '../core/helpers/files/files.helper';
import * as path from 'path';
import { ResponseDto } from '../response/response.dto';
import sqlServerConfig from '../core/database/SqlServerDataSource';
import { LoggerService } from '../logger/logger.service';
import { ConfigurationService } from 'src/core/config/configuration.service';

@Injectable()
export class PolizasService {
  private conectorContabilidadPath = "C:\\Program Files (x86)\\Kronox y Kairos\\Contabilidad API\\conector_contabilidad";
  private conectorContabilidadName = "ConectorContabilidadCLI.exe";

  constructor(
    @InjectRepository(Polizas)
    private readonly polizasRepository: Repository<Polizas>,
    private readonly loggerService: LoggerService,
    private readonly configurationService: ConfigurationService
  ) {}

  async findAll(): Promise<PolizaSqlServerDto[]> {
    return this.polizasRepository.find();
  }

  findOne(id: number): Promise<PolizaSqlServerDto> {
    return this.polizasRepository.findOne({
      where: {
        Id: id
      }
    });
  }

  private createPolizasDataFile(filePath: string, polizas: PolizaDto[]) {
    try {
      let fileData: PolizasDataFileContentConectorDto = {
        ...this.configurationService.configuration,
        polizas
      };
      filePutContent(filePath, JSON.stringify(fileData));
      this.loggerService.info(`Policies file created`);
    } catch (error) {
      this.loggerService.err(`Creating policies file error [${JSON.stringify(error)}]`);
      console.log(error);
    }
  }

  async create(polizas: PolizaDto[]): Promise<ResponseDto> {
    try {
      // se crea el archivo de datos
      //let filePath = path.join(process.env.CONECTOR_CONTABILIDAD_PATH, "data.json");
      let filePath = path.join(this.conectorContabilidadPath, "data.json");
      this.loggerService.info(`Creating policies records (Data source: ${filePath})`);
      this.createPolizasDataFile(filePath, polizas);
      // se crea la poliza de contabilidad con el conector
      let resoponseStr = await runCommand({
        path: this.conectorContabilidadPath,
        name: this.conectorContabilidadName
      }, ["-a", "crear", "-r", "polizas", "-f", `"${filePath}"`])
      this.loggerService.info(`Creating policies records result [${resoponseStr}]`);
      console.log(resoponseStr)
      let response = JSON.parse(resoponseStr);
      return response;
    } catch (error) {
      this.loggerService.err(`Creating policies record error [${JSON.stringify(error)}]`);
      console.log(error);
      return null;
    }
  }

  // update(id: number, updatePolizaDto: UpdatePolizaDto) {
  //   return `This action updates a #${id} poliza`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} poliza`;
  // }
}
