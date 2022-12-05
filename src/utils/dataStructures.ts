export const removeEmptyObjectKVs = (orignalObject: Record<string | number | symbol, unknown | undefined>): Record<string | number | symbol, unknown> => {
    const obj = JSON.parse(JSON.stringify(orignalObject));

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const element = obj[key];

            if(typeof element === "undefined" ){
                delete obj[key];
            }
        }
    }

    return obj;
}