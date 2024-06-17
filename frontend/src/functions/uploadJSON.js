export const handleJsonUpload = (event, validateStructure, onJsonParsed) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if (validateStructure(json)) {
                onJsonParsed(json);
            } else {
                alert(
                    "Invalid JSON format. Please upload a file with the correct structure."
                );
            }
        } catch (error) {
            alert("Invalid file format. Please upload a valid JSON file.");
        }
    };
    reader.readAsText(file);
};
