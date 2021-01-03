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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stores = void 0;
var react_1 = __importStar(require("react"));
require("./App.scss");
var Route_1 = __importDefault(require("./routes/Route"));
var mobx_react_1 = require("mobx-react");
var common_1 = require("@/store/common");
var PreloadImage_1 = require("@/components/PreloadImage");
var util_1 = require("@/core/util");
var BgMusic_1 = require("@/components/BgMusic");
exports.stores = {
    commonStore: new common_1.CommonStore(),
};
function App() {
    var _a = react_1.useState({
        isPreloadComplete: false
    }), state = _a[0], setState = _a[1];
    var updateState = util_1.createUpdateState(setState);
    var handleComplete = function () {
        updateState({
            isPreloadComplete: true
        });
    };
    return (<mobx_react_1.Provider stores={exports.stores}>
            <div className="App">
                <BgMusic_1.BgMusic src={'https://www.w3school.com.cn/i/horse.ogg'}/>
                {!state.isPreloadComplete ?
        <PreloadImage_1.PreloadImage loadingTips='当前加载进度为${progress}%' bgColor={'#40a9ff'} imgs={window.imgPreloadArr} onComplete={function () { return handleComplete(); }}/> :
        <Route_1.default />}
            </div>
        </mobx_react_1.Provider>);
}
exports.default = App;
