import { Injectable } from '@nestjs/common';
import { CreatePremiumDto } from './dto/create-premium.dto';
import { UpdatePremiumDto } from './dto/update-premium.dto';
import * as path from 'path';
import { LoggerService } from 'src/logger/logger.service';
import { runCommand } from 'src/core/helpers/shell/shell.helper';
import { filePutContent } from 'src/core/helpers/files/files.helper';
import * as fs from 'fs';

@Injectable()
export class PremiumService {
  private conectorCLIPath = "C:\\Program Files (x86)\\KronoxDev\\PREMIUMAPI";
  private conectorCLIName = "ConectorComercialCLI.exe";

  async create(createPremiumDto: CreatePremiumDto) {
    try {
      let filePath = path.join(this.conectorCLIPath, "dataCLI.json");
      if (!fs.existsSync(this.conectorCLIPath)) {
        fs.mkdirSync(this.conectorCLIPath, { recursive: true });
      }
      if (fs.existsSync(filePath)) {
        console.log(`El archivo ${filePath} ya existe. Se reemplazará con el nuevo contenido.`);
      }
      fs.writeFileSync(filePath, JSON.stringify(createPremiumDto, null, 2), 'utf8');
      let resoponseStr = await runCommand({
        path: this.conectorCLIPath,
        name: this.conectorCLIName
      }, ["-a", "crear", "-r", "documentos", "-f", `"${filePath}"`])
      let response;
      try {
        response = JSON.parse(resoponseStr);
        console.log(response);
        console.log("****************************************************************************************");
        return response;
      } catch (parseError) {
        // console.error('Error parsing JSON:', parseError);
        return null;  // Manejo del error de parseo
      }
    } catch (error) {
      return null;
    }
  }

  async createPay(createPremiumDto: CreatePremiumDto) {
    try {
      let filePath = path.join(this.conectorCLIPath, "dataCLI.json");
      if (!fs.existsSync(this.conectorCLIPath)) {
        fs.mkdirSync(this.conectorCLIPath, { recursive: true });
      }
      if (fs.existsSync(filePath)) {
        console.log(`El archivo ${filePath} ya existe. Se reemplazará con el nuevo contenido.`);
      }
      fs.writeFileSync(filePath, JSON.stringify(createPremiumDto, null, 2), 'utf8');
      let resoponseStr = await runCommand({
        path: this.conectorCLIPath,
        name: this.conectorCLIName
      }, ["-a", "aplicar", "-r", "pagos", "-f", `"${filePath}"`])
      console.log(resoponseStr)
      let response;
      try {
        response = JSON.parse(resoponseStr);
        console.log(response);
        console.log("****************************************************************************************");
        return response;
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async createNC(createPremiumDto: CreatePremiumDto) {
    try {
      let filePath = path.join(this.conectorCLIPath, "dataCLI.json");
      if (!fs.existsSync(this.conectorCLIPath)) {
        fs.mkdirSync(this.conectorCLIPath, { recursive: true });
      }
      if (fs.existsSync(filePath)) {
        console.log(`El archivo ${filePath} se reemplazo la informacion en JSON.`);
      }
      fs.writeFileSync(filePath, JSON.stringify(createPremiumDto, null, 2), 'utf8');
      let resoponseStr = await runCommand({
        path: this.conectorCLIPath,
        name: this.conectorCLIName
      }, ["-a", "crearNC", "-r", "documentos", "-f", `"${filePath}"`])
      let response;
      try {
        response = JSON.parse(resoponseStr);
        console.log(response);
        console.log("****************************************************************************************");
        return response;
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return null;  // Manejo del error de parseo
      }
    } catch (error) {
      return null;
    }
  }
}
