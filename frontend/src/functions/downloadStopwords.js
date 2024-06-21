export const downloadStopwords = async (array, description, filename) => {
  // Join the array of strings with newline characters
  const textContent = array.join("\n");
  // Create a blob with the text content
  const blob = new Blob([textContent], {
    type: "text/plain;charset=utf-8",
  });
  // Check if showSaveFilePicker is available in the window
  if ("showSaveFilePicker" in window) {
    const opts = {
      types: [
        {
          description: description,
          suggestedName: filename,
          accept: { "text/plain": [".txt"] },
        },
      ],
    };
    // Show the save file picker and get the handle
    const handle = await window.showSaveFilePicker(opts);
    // Create a writable stream
    const writable = await handle.createWritable();
    // Write the blob content to the file
    await writable.write(blob);
    // Close the writable stream
    await writable.close();
  } else {
    // Fallback for browsers that do not support showSaveFilePicker
    const link = document.createElement("a");
    // Create an object URL for the blob
    link.href = URL.createObjectURL(blob);
    // Set the download attribute with the filename
    link.setAttribute("download", filename);
    // Programmatically click the link to trigger the download
    link.click();
  }
};
