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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var BaseComponent_1 = require("@/components/BaseComponent");
require("./index.scss");
var mobx_react_1 = require("mobx-react");
var antd_1 = require("antd");
var config_1 = require("@/config");
var Image_1 = require("@/components/Image");
var App_1 = require("@/App");
var Modal_1 = require("@/components/Modal");
var Pages_1 = require("@/components/Pages");
var Page1_1 = require("@/modules/pages/Page1");
var Page2_1 = require("@/modules/pages/Page2");
var Page3_1 = require("@/modules/pages/Page3");
var VideoPlayer_1 = require("@/components/VideoPlayer");
var Demo = /** @class */ (function (_super) {
    __extends(Demo, _super);
    function Demo(props) {
        var _this = _super.call(this, props, props.stores || App_1.stores) || this;
        console.log(props.stores);
        _this.state = BaseComponent_1.genBaseComponentState({
            count: 0,
            modalShow: false,
            curPage: 1
        });
        return _this;
    }
    Demo.prototype.componentDidMount = function () {
        var _a;
        var obj = {
            userInfo: {
                name: "kiner"
            }
        };
        console.log(config_1.config, window.imgPreloadArr);
        console.log((_a = obj === null || obj === void 0 ? void 0 : obj.userInfo) === null || _a === void 0 ? void 0 : _a.name);
    };
    Demo.prototype.handlePageChange = function (curPage) {
        this.setState({
            curPage: curPage
        });
    };
    Demo.prototype.render = function () {
        var _this = this;
        var _a = this.props.msg, msg = _a === void 0 ? "kiner" : _a;
        var _b = this.state, count = _b.count, modalShow = _b.modalShow, curPage = _b.curPage;
        var loading = this.stores.commonStore.state.loading;
        var videoConfig = {
            source: '//www.runoob.com/try/demo_source/movie.mp4',
            cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2853553659,1775735885&fm=26&gp=0.jpg'
        };
        return (<div className="container">
                <VideoPlayer_1.VideoPlayer config={videoConfig}/>
                <antd_1.Button onClick={function () {
            _this.stores.commonStore.setGlobalLoading(!loading);
            _this.setState({
                count: count + 1,
            });
        }}>点击切换
                </antd_1.Button>
                <antd_1.Button onClick={function () {
            _this.setState({ modalShow: true });
        }}>
                    显示弹框
                </antd_1.Button>
                <Modal_1.Modal visible={modalShow} clickMask2close={false} showClose={true} onClose={function () { return _this.setState({ modalShow: false }); }} closeBtn={<div className="close-btn">×</div>}>
                  <div className="modal-box">
                    这个弹框内容
                  </div>
                </Modal_1.Modal>
                {msg} : {count} : {loading ? "是" : "否"}
                <Image_1.Image src={require("@/assets/images/1.jpeg").default} width={"100%"} height={"100px"}/>
                <Pages_1.Pages isSwiper={false} curPage={curPage} onPageChange={function (curPage) { return _this.handlePageChange(curPage); }} pages={[
            <Page1_1.Page1 />,
            <Page2_1.Page2 />,
            <Page3_1.Page3 />
        ]}/>
            </div>);
    };
    Demo = __decorate([
        mobx_react_1.inject("stores"),
        mobx_react_1.observer
    ], Demo);
    return Demo;
}(BaseComponent_1.BaseComponent));
exports.default = Demo;
