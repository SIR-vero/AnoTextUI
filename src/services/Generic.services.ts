import Config from "../config/config"

export class GenericServices {
    static getShareLink = () => {
        return `${Config}/record-message`
    }
}