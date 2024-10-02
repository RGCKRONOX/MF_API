declare global {
    namespace NodeJS {
        interface ProcessEnv {
            //ENVIRONMENT
            NODE_ENV: 'development' | 'production';
            API_LOGS_FILE_PATH: string;
            //conector contabilidad
            CONECTOR_CONTABILIDAD_PATH: string;
            CONECTOR_CONTABILIDAD_NAME: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }