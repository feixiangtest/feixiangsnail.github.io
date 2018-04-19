/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SoundManager {
    static get ins() {
        return this._instance || (this._instance = new SoundManager);
    }
    constructor() {
        this._click = RES.getRes("select_mp3");
        this._bgm = RES.getRes("bkgmusic_mp3");
        this._gameOver = RES.getRes("gameover_mp3");
    }
    PlayBGM() {
        if (this.IsMusic) {
            this._bgm_channel = this._bgm.play(0, 0);
        }
    }
    StopBGM() {
        if (this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    }
    PlayGameOver() {
        if (this.IsSound) {
            this._gameOver.play(0, 1);
        }
    }
    PlayClick() {
        if (this.IsSound) {
            this._click.play(0, 1);
        }
    }
    get IsMusic() {
        var b = egret.localStorage.getItem("ismusic");
        if (b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    }
    set IsSound(value) {
        if (value) {
            egret.localStorage.setItem("isSound", "1");
        }
        else {
            egret.localStorage.setItem("isSound", "0");
        }
    }
    get IsSound() {
        var b = egret.localStorage.getItem("isSound");
        if (b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    }
}
exports.default = SoundManager;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LoadingUI_1 = __webpack_require__(4);
const GameMainUI_1 = __webpack_require__(3);
const AssetAdapter_1 = __webpack_require__(2);
const ThemeAdapter_1 = __webpack_require__(5);
const SoundManager_1 = __webpack_require__(0);
class Main extends eui.UILayer {
    constructor() {
        super(...arguments);
        this.WID = 480;
        this.HEI = 800;
        this.isThemeLoadEnd = false;
        this.isResourceLoadEnd = false;
    }
    createChildren() {
        super.createChildren();
        var assetAdapter = new AssetAdapter_1.default();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter_1.default());
        this.loadingView = new LoadingUI_1.default();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    onConfigComplete(event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    onThemeLoadComplete() {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    onResourceLoadComplete(event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    }
    onItemLoadError(event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    onResourceLoadError(event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }
    onResourceProgress(event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    startCreateScene() {
        var bkg = new egret.Shape;
        bkg.graphics.beginFill(0xffffff);
        bkg.graphics.drawRect(0, 0, 480, 800);
        bkg.graphics.endFill();
        this.addChildAt(bkg, 0);
        var gameMainui = new GameMainUI_1.default;
        this.addChild(gameMainui);
        SoundManager_1.default.ins.PlayBGM();
    }
}
exports.default = Main;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AssetAdapter {
    getAsset(source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    }
}
exports.default = AssetAdapter;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MyMath_1 = __webpack_require__(6);
const SoundManager_1 = __webpack_require__(0);
class GameMainUI extends eui.Component {
    constructor() {
        super();
        this.sumsArray = [];
        this.score = 0;
        this.isGameOver = false;
        this.numbersArray = [-3, -2, -1, 1, 2, 3];
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/skins/GameMainUISkin.exml";
    }
    onComplete() {
        this.initUI();
    }
    initUI() {
        for (var i = 1; i < 5; i++) {
            this.sumsArray[i] = [[], [], []];
            for (var j = 1; j <= 3; j++) {
                this.buildThrees(j, 1, i, j);
            }
        }
        for (var i = 0; i < 3; i++) {
            this["btn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkAnswer, this);
            this["btn" + i].name = "btn" + i;
        }
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
        this.buttonMask = new egret.Shape;
        this.buttonMask.x = 42;
        this.buttonMask.y = 554;
        this.addChild(this.buttonMask);
        this.resultGroup.visible = false;
        this.mainGroup.visible = true;
        this.nextNumber();
    }
    onStart(e) {
        this.resultGroup.visible = false;
        this.mainGroup.visible = true;
        this.score = 0;
        this.nextNumber();
    }
    gameOver(gameOverString) {
        SoundManager_1.default.ins.PlayGameOver();
        this.mainGroup.visible = false;
        this.resultGroup.visible = true;
        if (gameOverString == "?") {
            this.desTxt.text = "你不会了嘛？！";
        }
        else {
            this.desTxt.text = "你是认真的？！";
        }
        this.questionText.text = this.questionText.text + " = " + gameOverString;
        this.questionText0.text = this.questionText.text;
        this.isGameOver = true;
        localStorage.setItem("topScore", "" + Math.max(this.score, this.topScore));
    }
    checkAnswer(e) {
        var idx = Number(e.currentTarget.name.substr(3));
        SoundManager_1.default.ins.PlayClick();
        console.log("check:" + idx);
        if (!this.isGameOver) {
            if (idx == this.randomSum) {
                this.score += Math.floor((this.buttonMask.x + 358) / 4);
                this.nextNumber();
            }
            else {
                if (this.score > 0) {
                    egret.Tween.removeAllTweens();
                }
                this.gameOver(idx + 1);
            }
        }
    }
    nextNumber() {
        this.topScore = localStorage.getItem("topScore") == null ? 0 : localStorage.getItem("topScore");
        this.isGameOver = false;
        this.scoreText0.text = this.scoreText.text = "Score: " + this.score + "\nBest Score: " + this.topScore;
        egret.Tween.removeAllTweens();
        this.buttonMask.graphics.clear();
        this.buttonMask.x = 42;
        this.buttonMask.graphics.beginFill(0x806470);
        this.buttonMask.graphics.drawRect(0, 0, 400, 200);
        this.buttonMask.graphics.endFill();
        this.timebar.mask = this.buttonMask;
        if (this.score > 0) {
            this.timeTween = egret.Tween.get(this.buttonMask);
            this.timeTween.to({ x: -358 }, 3000).call(function (params) {
                params.gameOver("?");
            }, this, [this]);
        }
        this.randomSum = MyMath_1.default.between(0, 2);
        this.questionText.text = this.sumsArray[Math.min(Math.round((this.score - 100) / 400) + 1, 4)][this.randomSum][MyMath_1.default.between(0, this.sumsArray[Math.min(Math.round((this.score - 100) / 400) + 1, 4)][this.randomSum].length - 1)];
        this.questionText0.text = this.questionText.text;
    }
    buildThrees(initialNummber, currentIndex, limit, currentString) {
        for (var i = 0; i < this.numbersArray.length; i++) {
            var sum = initialNummber + this.numbersArray[i];
            var outputString = currentString + (this.numbersArray[i] < 0 ? "" : "+") + this.numbersArray[i];
            if (sum > 0 && sum < 4 && currentIndex == limit) {
                this.sumsArray[limit][sum - 1].push(outputString);
            }
            if (currentIndex < limit) {
                this.buildThrees(sum, currentIndex + 1, limit, outputString);
            }
        }
    }
}
exports.default = GameMainUI;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LoadingUI extends egret.Sprite {
    constructor() {
        super();
        this.createView();
    }
    createView() {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    }
    setProgress(current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    }
}
exports.default = LoadingUI;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ThemeAdapter {
    getTheme(url, compFunc, errorFunc, thisObject) {
        function onGetRes(e) {
            compFunc.call(thisObject, e);
        }
        function onError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
                errorFunc.call(thisObject);
            }
        }
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
        RES.getResByUrl(url, onGetRes, this, RES.ResourceItem.TYPE_TEXT);
    }
}
exports.default = ThemeAdapter;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MyMath {
    constructor() {
    }
    static between(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }
}
exports.default = MyMath;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = __webpack_require__(1);
egret.registerClass(Main_1.default, "Main");
window["Main"] = Main_1.default;
egret.runEgret({ renderMode: "canvas" });


/***/ })
/******/ ]);