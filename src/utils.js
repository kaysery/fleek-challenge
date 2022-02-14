import { fabClasses } from "@mui/material";

export function ObjToQueryParamsString(obj) {
    return Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&');
}

export function isEmpty(obj) {
    let empty = true;

    Object.keys(obj).every(item => {
        if (obj[item]) {
            empty = false;
            return false;
        }
        return true;
    });

    return empty;
}

export function queryStringToObj(urlParams){
    const filterObj = {};
        for (const [key, value] of urlParams.entries()) {
            filterObj[key] = value;    
        }
        return filterObj;
}