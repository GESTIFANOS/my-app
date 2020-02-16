import Axios from "axios";

const getAuthToken = () => {
    return '12312312'
}
export const GET = function (url) {

    // let config = {
    //     headers: {
    //         'Authorization': `Token ${getAuthToken()}`
    //     }
    // }
    // return Axios.get(url, config = config)
    return Axios.get(url)

}

export const DELETE = function (url) {

    let config = {
        headers: {
            'Authorization': `Token ${getAuthToken()}`
        }
    }
    return Axios.delete(url, config = config)
}


export const UPDATE = function (url, method, data, config = null) {
    if (config) {
        alert("unknown config")
    }
    let headers = {
        'content-type': 'multipart/form-data',
        'Authorization': `Token '${getAuthToken()}'`
    }

    return Axios(
        {
            url: url,
            method: method,
            data: data,
            headers: headers,
        }
    )
}

