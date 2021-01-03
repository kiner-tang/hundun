"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadImage = void 0;
var react_1 = __importDefault(require("react"));
var BaseComponent_1 = require("@/components/BaseComponent");
require("./PreloadImage.scss");
var PreloadImage = /** @class */ (function (_super) {
    __extends(PreloadImage, _super);
    function PreloadImage(props) {
        var _this = _super.call(this, props, props.stores) || this;
        _this.doLoadImage = function (imgs) {
            if (imgs === void 0) { imgs = []; }
            if (imgs.length === 0) {
                _this.setState({
                    progress: 100
                });
                _this.props.onComplete && _this.props.onComplete();
                return;
            }
            imgs.forEach(function (url) {
                var handleSuccess = function () {
                    var newIdx = _this.state.curIndex + 1;
                    _this.setState({
                        curIndex: newIdx,
                        progress: Math.ceil((newIdx / imgs.length) * 100)
                    });
                    if (newIdx === imgs.length - 1) {
                        _this.props.onComplete && _this.props.onComplete();
                    }
                };
                var img = new Image();
                img.src = url;
                img.onload = handleSuccess;
                img.onerror = handleSuccess;
            });
        };
        _this.state = {
            progress: 0,
            curIndex: 0
        };
        return _this;
    }
    PreloadImage.prototype.componentDidMount = function () {
        this.doLoadImage(window.imgPreloadArr);
    };
    PreloadImage.prototype.render = function () {
        var _a = this.props, bgColor = _a.bgColor, bgImage = _a.bgImage, _b = _a.isShowTips, isShowTips = _b === void 0 ? true : _b, _c = _a.loadingTips, loadingTips = _c === void 0 ? '${progress}%' : _c;
        var progress = this.state.progress;
        var style = {
            backgroundColor: bgColor
        };
        if (bgImage) {
            style.backgroundImage = "url(" + bgImage + ")";
        }
        return (<div className="preload-image-container" style={style}>
                <div className="progress-box">
                    <div className="progress-bar">
                        <div className="progress-bg"/>
                        <div className="progress-front" style={{ width: this.state.progress + "%" }}/>
                    </div>
                    {isShowTips && <div className="tips" style={{ left: this.state.progress + "%" }}>{loadingTips.replace(/\$\{([^\}]*)\}/g, String(progress))}</div>}
                </div>
            </div>);
    };
    return PreloadImage;
}(BaseComponent_1.BaseComponent));
exports.PreloadImage = PreloadImage;
