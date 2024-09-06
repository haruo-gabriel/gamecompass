import fs from 'fs/promises';

export const saveFile = (fileName, data) => {
    fs.writeFile(`../files/${fileName}`, data, (err) => {
        if (err) {
            console.error('Error while saving file:', err);
            return;
        }
    });
}