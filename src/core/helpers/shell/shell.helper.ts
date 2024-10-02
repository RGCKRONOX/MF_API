import { spawn } from "child_process";

interface IEjecutableParams {
    path: string;
    name: string;
}

export const runCommand = (ejecutable: IEjecutableParams | string, argsArray: string[]): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        let process = null;
        if (typeof ejecutable === "string") {
            process = await spawn(ejecutable, argsArray, { shell: true });
        } else if (typeof ejecutable === "object") {
            process = await spawn(ejecutable.name, argsArray, { shell: true, cwd: ejecutable.path });
        }
        let responseCLI = "";

        // async spawn
        process.stdout.setEncoding("utf8");
        process.stdout.on("data", (data) => {
            responseCLI += data;
            // console.log("data", data);
        });
        process.stderr.setEncoding("utf8");
        process.stderr.on("data", (err) => {
            console.log("err", err)
            reject(err);
        });
        process.on('close', function (code) {
            console.log("closed with code - ", code)
            resolve(responseCLI)
        });
    });
};
