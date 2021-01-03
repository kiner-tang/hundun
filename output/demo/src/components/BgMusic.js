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
exports.BgMusic = exports.bgMRef = void 0;
var react_1 = __importDefault(require("react"));
var BaseComponent_1 = require("@/components/BaseComponent");
require("./BgMusic.scss");
var util_1 = require("@/core/util");
exports.bgMRef = react_1.default.createRef();
var BgMusic = /** @class */ (function (_super) {
    __extends(BgMusic, _super);
    function BgMusic(props) {
        var _this = _super.call(this, props, props.stores) || this;
        _this.state = {
            isPlaying: false
        };
        return _this;
    }
    BgMusic.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props.autoPlay, autoPlay = _a === void 0 ? true : _a;
        var audio = exports.bgMRef === null || exports.bgMRef === void 0 ? void 0 : exports.bgMRef.current;
        if (autoPlay) {
            if (util_1.browser.isWeiXin()) {
                console.log("微信浏览器");
                window.wx.ready(function () {
                    _this.play();
                    console.log("微信jssdk准备完毕，播放音乐");
                });
                this.play();
            }
            else {
                this.play();
            }
        }
        audio === null || audio === void 0 ? void 0 : audio.addEventListener("play", function () {
            _this.setState({
                isPlaying: true
            });
        }, false);
        audio === null || audio === void 0 ? void 0 : audio.addEventListener("pause", function () {
            _this.setState({
                isPlaying: false
            });
        }, false);
    };
    BgMusic.prototype.play = function () {
        var _a;
        try {
            (_a = exports.bgMRef === null || exports.bgMRef === void 0 ? void 0 : exports.bgMRef.current) === null || _a === void 0 ? void 0 : _a.play();
            this.setState({
                isPlaying: true
            });
        }
        catch (e) {
        }
    };
    BgMusic.prototype.stop = function () {
        var _a;
        (_a = exports.bgMRef === null || exports.bgMRef === void 0 ? void 0 : exports.bgMRef.current) === null || _a === void 0 ? void 0 : _a.pause();
        this.setState({
            isPlaying: false
        });
    };
    BgMusic.prototype.render = function () {
        var _this = this;
        var _a = this.props, src = _a.src, _b = _a.autoPlay, autoPlay = _b === void 0 ? true : _b, _c = _a.showMusicBtn, showMusicBtn = _c === void 0 ? true : _c, _d = _a.loop, loop = _d === void 0 ? true : _d;
        var isPlaying = this.state.isPlaying;
        var style = {};
        if (!showMusicBtn) {
            style.opacity = 0;
            style.zIndex = -1;
        }
        return (<div className={"bgMusic " + (isPlaying ? '' : 'stopped')} style={style} onClick={function () {
            if (isPlaying) {
                _this.stop();
            }
            else {
                _this.play();
            }
        }}>
                <audio ref={exports.bgMRef} src={src} loop={loop} autoPlay={autoPlay}/>
            </div>);
    };
    return BgMusic;
}(BaseComponent_1.BaseComponent));
exports.BgMusic = BgMusic;
