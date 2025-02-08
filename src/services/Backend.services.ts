import axios from 'axios'
import Config from '../config/config'

export class BackendServices {

    static checkUserId = (userId: string) => {
        return axios.post(`${Config.basePath}/getUserName`, { "userId": userId }, {})
    }

    static postMsgToUser = (userName: string, msg: string) => {
        return axios.post(`${Config.basePath}/postMessage`, { userName: userName, message: msg })
    }

    static userLogin = (userName: string, password: string) => {
        return axios.post(`${Config.basePath}/auth`, { user: userName, pwd: password })
    }

    static getMessages = () => {
        const authToken = localStorage.getItem('authToken')
        return new Promise((resolve, reject) => {
            axios.get(`${Config.basePath}/getMessages`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }).then(
                (res) => { resolve(res) },
                (error: any) => {
                    console.log(error)
                    if(error?.response?.status === 401 || error?.response?.status === 403){
                        console.log("Unauthorised OR Forbidden ! ")
                        window.location.href = '/login'
                    }
                    reject(error)
                })
        })

    }

    static userSignUp = (username: string, password: string) => {
        return axios.post(`${Config.basePath}/register`, {user: username, pwd: password})
    }
}