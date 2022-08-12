import axios from 'axios';

export var APIURL = 'http://www.localhost:4500/api/';
//export var APIURL = 'http://3.141.33.10:3100/api/';

function handleErrorObservable(error) {
   var response = error.message || error;
   let responseJson = { is_error: true, message: response };
   return responseJson;
}

function Headers() {
   let UserToken = JSON.parse(localStorage.getItem('userToken'));
   let AdminToken = JSON.parse(localStorage.getItem('adminToken'));
   if (UserToken) {
      let headers = {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${UserToken.toString()}`,
      }
      return headers;
   } else if (AdminToken) {
      let headers = {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${AdminToken.toString()}`,
      }
      return headers;
   } else {
      return null;
   }
}

export const PostAPI = async (URL, Data) => {
    try {
       const response = await axios.post(APIURL + URL, Data, { headers: Headers() });
       return response.data;
    }
    catch (error) {
       handleErrorObservable(error);
    }
}

export const GetAPI = async (URL, props) => {
   try {
      const response = await axios.get(APIURL + URL, { headers: Headers() });
      return response.data;
   }
   catch (error) {
      handleErrorObservable(error);
   }
}

export const PutAPI = async (URL, Data) => {
   try {
      const response = await axios.put(APIURL + URL, Data, { headers: Headers() });
      return response.data;
   }
   catch (error) {
      handleErrorObservable(error);
   }
}

export const DeleteAPI = async (URL) => {
   try {
      const response = await axios.delete(APIURL + URL, { headers: Headers() });
      return response;
   }
   catch (error) {
      handleErrorObservable(error);
   }
}