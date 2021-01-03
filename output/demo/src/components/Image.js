"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
var react_1 = __importStar(require("react"));
var util_1 = require("@/core/util");
require("./Image.scss");
exports.Image = function (props) {
    var _a = react_1.useState({
        loading: true,
        imgWidth: props.width,
        imgHeight: props.height,
        isError: false
    }), state = _a[0], setState = _a[1];
    var updateState = util_1.createUpdateState(setState);
    var handleImageLoaded = function () {
        console.log('图片加载完成...');
        updateState({
            loading: false
        });
    };
    var handleImageLoadError = function () {
        updateState({
            isError: true,
            loading: false
        });
    };
    return (<div className="image-container">
            {state.loading && <div className="loading-tip">{props.loadingTip || '图片加载中，请稍后...'}</div>}
            {state.isError && <div className="error-tip">图片加载失败</div>}
            {(!state.isError) && <img src={props.src} alt={props.alt} onLoad={handleImageLoaded} onError={handleImageLoadError}/>}
        </div>);
};
