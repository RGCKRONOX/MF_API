import ContpaqiContabilidadConfigDto from "./ContpaqiContabilidadConfigDto";
import SqlServerConfigDto from "./SqlServerConfigDto";

export class BaseConfigurationDto {
    sqlServer:  SqlServerConfigDto;
    contabilidad: ContpaqiContabilidadConfigDto;
}