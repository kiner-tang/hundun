"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.failSpinner = exports.resumeSpinner = exports.pauseSpinner = exports.stopSpinner = exports.logWithSpinner = void 0;
var chalk_1 = __importDefault(require("chalk"));
var ora = require("ora");
var spinner = ora();
var lastMsg;
var isPaused = false;
function logWithSpinner(msg, successMsg, symbol) {
    if (successMsg === void 0) { successMsg = ""; }
    if (symbol === void 0) { symbol = chalk_1.default.green("✔"); }
    if (lastMsg) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text
        });
    }
    spinner.text = msg;
    lastMsg = {
        symbol: symbol,
        text: successMsg || msg
    };
    spinner.start();
}
exports.logWithSpinner = logWithSpinner;
function stopSpinner(persist) {
    if (lastMsg && persist) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text
        });
    }
    else {
        spinner.stop();
    }
    lastMsg = null;
}
exports.stopSpinner = stopSpinner;
function pauseSpinner() {
    if (spinner.isSpinning) {
        spinner.stop();
        isPaused = true;
    }
}
exports.pauseSpinner = pauseSpinner;
function resumeSpinner() {
    if (isPaused) {
        spinner.start();
        isPaused = false;
    }
}
exports.resumeSpinner = resumeSpinner;
function failSpinner(text) {
    spinner.fail(text);
}
exports.failSpinner = failSpinner;
