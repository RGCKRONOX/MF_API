import { Injectable } from '@nestjs/common';
import { CuentasDataFileContentConectorDto, NewCuentaDto, SearchCuentaDto } from './cuentas.dto';
import sqlServerConfig from '../core/database/SqlServerDataSource';
import { filePutContent } from '../core/helpers/files/files.helper';
import * as path from 'path';
import { runCommand } from '../core/helpers/shell/shell.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuentas } from './cuentas.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { ConfigurationService } from 'src/core/config/configuration.service';

@Injectable()
export class CuentasService {
  private conectorContabilidadPath = "C:\\Program Files (x86)\\KronoxDev\\PREMIUMAPI";
  private conectorContabilidadName = "ConectorContabilidadCLI.exe";

  constructor(
    @InjectRepository(Cuentas)
    private readonly cuentasRepository: Repository<Cuentas>,
    private readonly loggerService: LoggerService,
    private readonly configurationService: ConfigurationService
  ) { }

  private createCuentasDataFile(filePath: string, cuentas: NewCuentaDto[]) {
    try {
      let fileData: CuentasDataFileContentConectorDto = {
        ...this.configurationService.configuration,
        cuentas
      };
      filePutContent(filePath, JSON.stringify(fileData));
      this.loggerService.info(`Accounts file data created`);
    } catch (error) {
      console.log(error);
    }
  }

  async create(data: NewCuentaDto[]) {
    try {
      // se crea el archivo de datos
      let filePath = path.join(this.conectorContabilidadPath, "data.json");
      this.loggerService.info(`Creating tax accounts (Data source: ${filePath})`);
      this.createCuentasDataFile(filePath, data);
      // se crea la poliza de contabilidad con el conector
      let resoponseStr = await runCommand({
        path: this.conectorContabilidadPath,
        name: this.conectorContabilidadName
      }, ["-a", "crear", "-r", "cuentas", "-f", `"${filePath}"`]);
      this.loggerService.info(`Creating tax accounts result [${resoponseStr}]`);
      console.log(resoponseStr)
      let response = JSON.parse(resoponseStr);
      return response;
    } catch (error) {
      this.loggerService.err(`Creating tax accounts error [${JSON.stringify(error)}]`);
      console.log(error);
      return null;
    }
  }

  async findAll(): Promise<Cuentas[]> {
    return await this.cuentasRepository.find();
  }

  async findBy(where: SearchCuentaDto): Promise<Cuentas[]> {
    return await this.cuentasRepository.find({ where });
  }

  async findOne(id: number): Promise<Cuentas> {
    return await this.cuentasRepository.findOne({ where: { Id: id } });
  }

  // update(id: number, updateCuentaDto: UpdateCuentaDto) {
  //   return `This action updates a #${id} cuenta`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cuenta`;
  // }
}
