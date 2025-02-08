import Config from "../config/config"

export class GenericServices {
    static getShareLink = () => {
        return `${Config.uiBasePath}/record-message`
    }

    static handleLogout = () => {
        // remove auth from local storage.  Done
        // delete refresh token from BE.    
        // Redirect to login/signup page    Done

        localStorage.removeItem('authToken')
        window.location.href = '/login'
    }
}