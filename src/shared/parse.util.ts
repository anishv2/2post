
export function parsePersistedData(data: { [key: string]: string }) {
    const parsedData: { [key: string]: string } = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            try {
                parsedData[key] = JSON.parse(data[key]);
            } catch (e) {
                parsedData[key] = data[key];
            }
        }
    }

    return parsedData;
}

