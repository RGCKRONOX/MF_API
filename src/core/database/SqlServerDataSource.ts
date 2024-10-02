
import { DataSource } from 'typeorm';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

// entities
import { Polizas } from '../../polizas/polizas.entity';
import { Cuentas } from '../../cuentas/cuentas.entity';
import { ConfigurationService } from '../config/configuration.service';

const sqlServerConfig: SqlServerConnectionOptions = {
  type: 'mssql',
  // host: process?.env?.DB_HOST || 'DEVHUSK\\SQL22',
  // username: process?.env?.DB_USER || 'sa',
  // password: process?.env?.DB_PASS || 'root',
  // database: process?.env?.DB_DATABASE || 'adMotores_Franklin',
  // options: {
  //   encrypt: false,
  //   trustServerCertificate:  true,
  //   cryptoCredentialsDetails: {
  //     minVersion: "TLSv1"
  //   },
  // },
  // entities: [
  //   Polizas,
  //   Cuentas
  // ],
};

// let configurationService = new ConfigurationService();
// let configuration = configurationService.configuration;

// const sqlServerConfig: SqlServerConnectionOptions = {
//   type: 'mssql',
//   host: configuration.sqlServer.host,
//   username: configuration.sqlServer.user,
//   password: configuration.sqlServer.password,
//   database: configuration.sqlServer.db,
//   options: {
//     encrypt: false,
//     trustServerCertificate:  true,
//     cryptoCredentialsDetails: {
//       minVersion: "TLSv1"
//     },
//   },
//   entities: [
//     Polizas,
//     Cuentas
//   ],
// };

export default sqlServerConfig;