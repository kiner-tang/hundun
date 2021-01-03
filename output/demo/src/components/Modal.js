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
exports.Modal = void 0;
var react_1 = __importDefault(require("react"));
var BaseComponent_1 = require("@/components/BaseComponent");
var App_1 = require("../App");
require("./Modal.scss");
var maskRef = react_1.default.createRef();
var contentRef = react_1.default.createRef();
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        var _this = _super.call(this, props, props.stores || App_1.stores) || this;
        _this.state = {
            isShowing: false
        };
        return _this;
    }
    Modal.prototype.handleClose = function () {
        this.props.onClose && this.props.onClose();
    };
    Modal.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        var _this = this;
        var _a, _b;
        if (nextProps.visible) {
            document.body.classList.add('hidden');
        }
        else {
            if (nextProps.visible !== this.props.visible) {
                (_a = maskRef.current) === null || _a === void 0 ? void 0 : _a.classList.add('out');
                (_b = contentRef.current) === null || _b === void 0 ? void 0 : _b.classList.add('out');
                this.setState({
                    isShowing: true
                }, function () {
                    setTimeout(function () {
                        _this.setState({
                            isShowing: false
                        });
                    }, 500);
                    document.body.classList.remove('hidden');
                });
            }
        }
    };
    Modal.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.showClose, showClose = _b === void 0 ? true : _b, _c = _a.clickMask2close, clickMask2close = _c === void 0 ? false : _c, closeBtn = _a.closeBtn, visible = _a.visible;
        if (!visible && !this.state.isShowing) {
            return null;
        }
        return (<div className="modal-container">
                <div ref={maskRef} className="mask" onClick={function () {
            if (clickMask2close) {
                _this.handleClose();
            }
        }}/>
                <div ref={contentRef} className="content-box">
                    {this.props.children}
                    {showClose && (<div className="close" onClick={function () { return _this.handleClose(); }}>
                            {closeBtn}
                        </div>)}
                </div>
            </div>);
    };
    return Modal;
}(BaseComponent_1.BaseComponent));
exports.Modal = Modal;
