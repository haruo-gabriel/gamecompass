import fs from 'fs/promises';

export const saveFile = async (fileName: string, data: string | Buffer): Promise<void> => {
    try {
        await fs.writeFile(`../files/${fileName}`, data);
    } catch (err) {
        console.error('Error while saving file:', err);
    }
}
