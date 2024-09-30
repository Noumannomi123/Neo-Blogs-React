const getSizeInMBFromJson = (jsonData) => {
    const dataInString = JSON.stringify(jsonData);
    const sizeInBytes = Buffer.byteLength(dataInString, 'utf8');
    return sizeInBytes / (1024 * 1024);
}
export default getSizeInMBFromJson;