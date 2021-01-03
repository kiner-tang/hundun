"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
var axios_1 = __importDefault(require("axios"));
var config_1 = require("@/config");
var BaseModel = /** @class */ (function () {
    function BaseModel(baseUrl) {
        this.baseUrl = baseUrl;
        this.axiosInstance = axios_1.default.create({
            baseURL: baseUrl || config_1.config.baseApi,
            timeout: config_1.config.timeout,
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        });
        this.axiosInstance.interceptors.request.use(function (config) {
            return config;
        }, function (err) {
            console.error('Axios请求配置异常:', err);
        });
        this.axiosInstance.interceptors.response.use(function (response) {
            var status = response.status, responseData = response.data, config = response.config;
            if (status === 200) {
                var code = responseData.code, data = responseData.data, message = responseData.message, success = responseData.success;
                if (code === 0) {
                    return responseData;
                }
                else {
                    console.warn('接口业务异常:', responseData);
                    return responseData;
                }
            }
            else {
                console.error('Axios请求异常:', response);
            }
            return response;
        }, function (err) {
            console.error('Axios响应异常:', err);
        });
    }
    BaseModel.prototype.send = function (options) {
        if (options.method.toLowerCase() === 'get') {
            return this.axiosInstance.get(options.action, {
                params: options.params,
            });
        }
        else {
            return this.axiosInstance.post(options.action, options.data);
        }
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
