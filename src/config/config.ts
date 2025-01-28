import DevConfig from './config.dev'
import ProdConfig from './config.prod'


class Config {
    static getConfig:any = () => {
        switch(process.env.REACT_APP_ENV){
            case 'dev':
                return DevConfig
            case 'prod':
                return ProdConfig
            default:
                return DevConfig
        }
    }
} 

export default Config.getConfig()