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
exports.Pages = void 0;
var react_1 = __importDefault(require("react"));
var BaseComponent_1 = require("@/components/BaseComponent");
var mobx_react_1 = require("mobx-react");
var App_1 = require("@/App");
var react_2 = require("swiper/react");
// Import Swiper styles
require("swiper/swiper.scss");
require("./Pages.scss");
var Pages = /** @class */ (function (_super) {
    __extends(Pages, _super);
    function Pages(props) {
        return _super.call(this, props, props.stores || App_1.stores) || this;
    }
    Pages.prototype.render = function () {
        var _a = this.props, isSwiper = _a.isSwiper, pages = _a.pages, curPage = _a.curPage, onPageChange = _a.onPageChange, allPageShow = _a.allPageShow;
        return (<div className="pages-container">
                {isSwiper ? (<react_2.Swiper initialSlide={curPage} direction="vertical" onSlideChange={function (swiper) { return onPageChange(swiper.activeIndex); }}>
                            {pages.map(function (page, index) { return (<react_2.SwiperSlide key={index}>
                                        {page}
                                    </react_2.SwiperSlide>); })}
                        </react_2.Swiper>) : (pages.filter(function (page, index) { return allPageShow === true ? true : index === curPage; }).map(function (page, index) { return (<div className="page-container" key={index}>{page}</div>); }))}
            </div>);
    };
    Pages = __decorate([
        mobx_react_1.inject("stores"),
        mobx_react_1.observer
    ], Pages);
    return Pages;
}(BaseComponent_1.BaseComponent));
exports.Pages = Pages;
