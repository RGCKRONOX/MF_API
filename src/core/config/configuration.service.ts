import { Injectable } from "@nestjs/common";
import { fileExists, fileGetContent, filePutContent } from "../helpers/files/files.helper";
import { BaseConfigurationDto } from "./dto/BaseConfiguration.dto";

@Injectable()
export class ConfigurationService {
    private configurationFilePath: string;
    public configuration: BaseConfigurationDto;

    constructor() {
        this.configurationFilePath = "C:\\Program Files (x86)\\KronoxDev\\PREMIUMAPI\\conf.kron";
        this.configuration = {
            sqlServer: {
                host: "",
                db: "",
                password: "",
                user: ""
            },
            contabilidad: {
                user: "",
                password: "",
                empresaDB: ""
            }
        };
        this.init();
    }

    init() {
        if (!fileExists(this.configurationFilePath)) {
            this.setConfigurationFile(this.configuration);
        }else {
            this.configuration = this.getConfiguration();
        }
    }

    setConfigurationFile(configurationFileContent: BaseConfigurationDto) {
        // create file
        filePutContent(this.configurationFilePath, JSON.stringify(configurationFileContent, null, 2));   
    }

    getConfiguration(): BaseConfigurationDto {
        return JSON.parse(fileGetContent(this.configurationFilePath));
    }
}