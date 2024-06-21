export const downloadJSON = async (obj, description, filename) => {
    const blob = new Blob([JSON.stringify(obj)], {
        type: "text/json;charset=utf-8",
    });
    if ("showSaveFilePicker" in window) {
        const opts = {
            types: [
                {
                    description: description,
                    suggestedName: filename,
                    accept: { "text/json": [".json"] },
                },
            ],
        };
        const handle = await window.showSaveFilePicker(opts);
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
    } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", filename);
        link.click();
    }
};
