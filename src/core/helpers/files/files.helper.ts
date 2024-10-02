import * as fs from "fs";
import * as path from 'path';

const filesEncoding = "binary";
// const filesEncoding = null;

interface IDirOptions {
    includeDirToFileName: boolean;
    onlyExtensions?: string[];
}

// archivos
export const filePutContent = (path: string | undefined, content: string): void => {
    try {
        if (path) {
            fs.writeFileSync(
                path,
                content,
                {
                    encoding: filesEncoding || "utf8",
                }
            );
        } else {
            throw new Error("[filePutContent] El path es requerido");
        }
    } catch (e: any) {
        console.log(e.message);
    }
};

export const fileAppend = (path: string, text: string): void => {
    fs.appendFileSync(path, text, {
        encoding: filesEncoding || "utf8",
    });
};

export const fileGetContent = (path: string | undefined): string => {
    if (path)
        return fs
            .readFileSync(path, {
                encoding: filesEncoding || "utf8",
            })
            .toString();
    else {
        throw new Error("[fileGetContent] El path is required");
    }
};

export const fileExists = (path: string): boolean => {
    return fs.existsSync(path);
} 

export const fileGetExtension = (filePath: string): string => {
    let fileExt = filePath.toLowerCase().split(".");
    return fileExt[fileExt.length - 1];
};

// directorios

export const getAllFiles = (dir: string, options: IDirOptions) =>
    fs.readdirSync(dir).reduce((files: string[], file: string) => {
        const name = options?.includeDirToFileName ? path.join(dir, file) : file;
        const fullName = path.join(dir, file);
        const isDirectory = fs.statSync(fullName).isDirectory();
        return isDirectory ? files : [...files, name];
    }, []);

export const getFilesDir = (dir: string, options: IDirOptions): string[] => {
    let files = getAllFiles(dir, options);

    // se consultan solo los archivos con la extencion especificada
    if (options?.onlyExtensions) {
        files = files.filter((file) => {
            let ext = fileGetExtension(file);
            return !!options.onlyExtensions?.includes(ext);
        });
    }

    return files;
};
