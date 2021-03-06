import Preconditions from '../util/Preconditions';

// const RESULT_OK = 200;
const NETWORK_ERROR_DEFAULT = '网络访问错误'

export default class ApiResponse {
    constructor() {
        this.isSuccess = true
    }

    setResponse(code, data, errorMsg,res){
        this.code = code;
        this.result = data;
        this.errorMsg = errorMsg;
        this.res = res;
    }

    setCode(_code){
        this.code = _code
    }

    getCode() {
        return this.code;
    }

    setResult(_data){
        this.result = _data
    }

    getResult() {
        return this.result;
    }

    
    setIsSuccess(boolean){
        this.isSuccess = boolean
    }

    isSuccess() {
        return this.isSuccess == true
    }

    setErrorMsg(_msg){
        this.errorMsg = _msg
    }

    getErrorMsg() {
        return Preconditions.isEmpty(this.errorMsg) ? NETWORK_ERROR_DEFAULT : this.errorMsg;
    }


}
