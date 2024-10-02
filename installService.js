const path = require("path");
const colors = require("colors");
var Service = require('node-windows').Service;

var svc = new Service({
    name: 'CONTPAQiContabilidadAPI',
    description: 'Servicio como api para contpaqi contabilidad',
    script: `${path.join(__dirname, "./dist/index.js")}`,
    nodeOptions: [],
    env: [
        {
            name: "CONECTOR_CONTABILIDAD_PATH",     
            value: `C:\\Program Files (x86)\\Kronox y Kairos\\Contabilidad API\\conector_contabilidad`
        },
        {
            name: "CONECTOR_CONTABILIDAD_NAME",
            value: `ConectorContabilidadCLI.exe`
        }
    ]
});

svc.on('install', function () {
    console.log(colors.magenta("API como servicio instalada"))
});


svc.on('uninstall', function () {
    console.log(colors.magenta("Se desinstalo el servicio"))
});


// se valida si el servicio existe , si existe se desinstala
// if (svc.exists)
    svc.uninstall();

// var installIntents = 0;
// var interval = setInterval(() => {
//     // se instala el servicio
//     if (!svc.exists && installIntents < 3)
//         svc.install();

//     if (installIntents < 3)
//         clearInterval(interval);

//     installIntents++;
// }, 1000)
