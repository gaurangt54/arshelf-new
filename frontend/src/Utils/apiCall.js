/* eslint-disable */
import axios from 'axios';

const backendUrl1 = "http://localhost:2000";
const backendUrl = "https://api-arshelf.herokuapp.com";

const apiCall = (path, method, params, body) => {

    let url = `${backendUrl}/${path}/`;

    if(params!=null)
        url += `${params}`;

    const dataRetrieved = axios({
        url: url,
        method: method,
        headers:{'Content-Type':'application/json'},
        data: body ? body : null
    })
    .then(response=>{ return response })
    .catch(error=>{ return error })
    
    return dataRetrieved
}

export default apiCall;
