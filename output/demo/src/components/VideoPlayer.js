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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayer = void 0;
var react_1 = __importDefault(require("react"));
var BaseComponent_1 = require("@/components/BaseComponent");
var App_1 = require("@/App");
var aliplayer_react_1 = __importDefault(require("aliplayer-react"));
var VideoPlayer = /** @class */ (function (_super) {
    __extends(VideoPlayer, _super);
    function VideoPlayer(props) {
        var _this = _super.call(this, props, props.stores || App_1.stores) || this;
        _this.defaultConfig = {};
        _this.defaultConfig = {
            source: "//player.alicdn.com/video/aliyunmedia.mp4",
            width: "100%",
            height: "200px",
            autoplay: true,
            isLive: false,
            rePlay: false,
            playsinline: true,
            preload: true,
            controlBarVisibility: "hover",
            useH5Prism: true,
            "skinLayout": [
                {
                    "name": "bigPlayButton",
                    "align": "cc",
                    "x": 0,
                    "y": 0
                },
                {
                    "name": "H5Loading",
                    "align": "cc"
                },
                {
                    "name": "errorDisplay",
                    "align": "tlabs",
                    "x": 0,
                    "y": 0
                },
                {
                    "name": "infoDisplay"
                },
                {
                    "name": "tooltip",
                    "align": "blabs",
                    "x": 0,
                    "y": 56
                },
                {
                    "name": "thumbnail"
                },
                {
                    "name": "controlBar",
                    "align": "blabs",
                    "x": 0,
                    "y": 0,
                    "children": [
                        {
                            "name": "progress",
                            "align": "blabs",
                            "x": 0,
                            "y": 44
                        },
                        {
                            "name": "playButton",
                            "align": "tl",
                            "x": 15,
                            "y": 12
                        },
                        {
                            "name": "timeDisplay",
                            "align": "tl",
                            "x": 10,
                            "y": 7
                        },
                        {
                            "name": "fullScreenButton",
                            "align": "tr",
                            "x": 10,
                            "y": 12
                        },
                        {
                            "name": "volume",
                            "align": "tr",
                            "x": 5,
                            "y": 10
                        }
                    ]
                }
            ]
        };
        return _this;
    }
    VideoPlayer.prototype.render = function () {
        var config = __assign(__assign(__assign({}, this.defaultConfig), this.props.config), { components: this.props.components });
        return (<aliplayer_react_1.default config={config}/>);
    };
    return VideoPlayer;
}(BaseComponent_1.BaseComponent));
exports.VideoPlayer = VideoPlayer;
