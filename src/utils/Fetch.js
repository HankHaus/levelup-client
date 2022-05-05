import { convertToCamelCase, convertToSnakeCase } from "./caseConverter";


// takes the target url, a method, and a body
export const fetchIt = (url, headers = {}, method = "GET",  body = null) => {
    // declare default options object
    let options = {
        "method": method,
        "headers": headers
    }
    // switch case based on method type
    switch (method) {
        // these need content-type header key
        case "POST":
        case "PUT":
            const copy = JSON.parse(JSON.stringify(options.headers))
            copy["Content-Type"] = "application/json"
            options.headers = copy
            break;
        default:
            break;
    }
    // adds body to request
    if (body !== null) {
        options.body = JSON.stringify(convertToSnakeCase(body))
    }

    // send request with options, convert response to json
    return fetch(url, options)
            .then(r => {
                if(method != "DELETE" && method != "PUT"){
                    return r.json()  
                }
            })
            .then(r => {
                return convertToCamelCase(r)
            })
}