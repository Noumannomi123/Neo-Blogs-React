const getSizeInMBFromJson = (jsonData) => {
    const dataInString = JSON.stringify(jsonData);
    const encoder = new TextEncoder();
    const sizeInBytes = encoder.encode(dataInString).length;
    return sizeInBytes / (1024 * 1024);
}
export default getSizeInMBFromJson;