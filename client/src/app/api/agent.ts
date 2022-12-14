import axios, { AxiosError, AxiosResponse } from 'axios';

import {toast} from 'react-toastify';

axios.defaults.baseURL ="https://localhost:7023/api/";
axios.defaults.withCredentials=true;

axios.interceptors.response.use((res:AxiosResponse)=>{
    return res;
},(error:AxiosError)=>{
    const e:any = error?.response?.data;
    toast.error(e.title);
    return Promise.reject(error);
});

const responseBody = (response:AxiosResponse) => response.data;

const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    put: (url:string,body:{}) => axios.put(url,body).then(responseBody),
    post: (url:string,body:{}) => axios.post(url,body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    list:()=>requests.get('products'),
    details:(id:number)=>requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error:()=>requests.get('buggy/bad-request'),
    get401Error:()=>requests.get('buggy/unauthorized'),
    get404Error:()=>requests.get('buggy/not-found'),
    get500Error:()=>requests.get('buggy/server-error'),
    getValidationError:()=>requests.get('buggy/validation-error'),
}

const Basket = {
    get: () => requests.get('Basket'),
    addItem:(productId:number, quantity=1) => requests.post(`Basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number, quantity=1) => requests.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login:(values:any)=>requests.post('account/login',values),
    register:(values:any)=>requests.post('account/register',values),
    currentUser:()=>requests.get('account/currentUser')
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account
};

export default agent;

