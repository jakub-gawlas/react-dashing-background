(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DashingBackground = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Canvas = (function () {
  function Canvas(_ref) {
    var canvas = _ref.canvas;
    var width = _ref.width;
    var height = _ref.height;
    var gradient = _ref.gradient;
    var lines = _ref.lines;

    _classCallCheck(this, Canvas);

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.setDimensions({ width: width, height: height });
    this.setProps({ gradient: gradient, lines: lines });
  }

  _createClass(Canvas, [{
    key: 'setDimensions',
    value: function setDimensions(_ref2) {
      var width = _ref2.width;
      var height = _ref2.height;

      this.canvas.width = width;
      this.canvas.height = height;
      this.width = width;
      this.height = height;
    }
  }, {
    key: 'setProps',
    value: function setProps(_ref3) {
      var gradient = _ref3.gradient;
      var lines = _ref3.lines;

      this.gradient = gradient;
      this.lines = lines;
    }
  }, {
    key: 'getLinearGradient',
    value: function getLinearGradient(_ref4) {
      var stops = _ref4.stops;

      var linearGradient = this.context.createLinearGradient(0, 0, 0, this.height);
      stops.forEach(function (stop) {
        return linearGradient.addColorStop(stop.offset, stop.color);
      });
      return linearGradient;
    }
  }, {
    key: 'drawGradient',
    value: function drawGradient(gradient) {
      var linearGradient = this.getLinearGradient(gradient);
      this.context.fillStyle = linearGradient;
      this.context.fillRect(0, 0, this.width, this.height);
    }
  }, {
    key: 'prepareDash',
    value: function prepareDash(_ref5) {
      var segments = _ref5.segments;
      var offset = _ref5.offset;

      this.context.setLineDash(segments);
      this.context.lineDashOffset = offset;
    }
  }, {
    key: 'prepareShadow',
    value: function prepareShadow(_ref6) {
      var color = _ref6.color;
      var blur = _ref6.blur;
      var offset = _ref6.offset;

      this.context.shadowColor = color;
      this.context.shadowBlur = blur;
      this.context.shadowOffsetX = offset.x;
      this.context.shadowOffsetY = offset.y;
    }
  }, {
    key: 'prepareContextToDrawLines',
    value: function prepareContextToDrawLines(_ref7) {
      var color = _ref7.color;
      var dash = _ref7.dash;
      var shadow = _ref7.shadow;

      this.context.strokeStyle = color;
      this.prepareDash(dash);
      this.prepareShadow(shadow);
    }
  }, {
    key: 'randomFromRange',
    value: function randomFromRange(_ref8) {
      var _ref8$min = _ref8.min;
      var min = _ref8$min === undefined ? 0 : _ref8$min;
      var _ref8$max = _ref8.max;
      var max = _ref8$max === undefined ? 10 : _ref8$max;

      return Math.random() * Math.abs(max - min) + Math.min(min, max);
    }
  }, {
    key: 'drawLine',
    value: function drawLine(_ref9) {
      var x1 = _ref9.x1;
      var y1 = _ref9.y1;
      var x2 = _ref9.x2;
      var y2 = _ref9.y2;
      var width = _ref9.width;

      var lineWidth = typeof width === 'number' ? width : this.randomFromRange({ min: width.min, max: width.max });

      this.context.lineWidth = lineWidth;
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.stroke();
    }
  }, {
    key: 'calculateCountLines',
    value: function calculateCountLines(_ref10) {
      var dimension = _ref10.dimension;
      var offset = _ref10.offset;
      var interval = _ref10.interval;
      var angle = _ref10.angle;

      var countLines = (dimension + offset) / interval * angle;
      return Math.ceil(countLines);
    }
  }, {
    key: 'getCountLines',
    value: function getCountLines(_ref11) {
      var offset = _ref11.offset;
      var interval = _ref11.interval;
      var angle = _ref11.angle;

      var widthCountLines = this.calculateCountLines({ dimension: this.width, offset: offset.x, interval: interval, angle: angle });
      var heightCountLines = this.calculateCountLines({ dimension: this.height, offset: offset.y, interval: interval, angle: angle });
      return Math.max(heightCountLines, widthCountLines);
    }
  }, {
    key: 'drawLines',
    value: function drawLines(_ref12) {
      var _ref12$width = _ref12.width;
      var lineWidth = _ref12$width === undefined ? 1 : _ref12$width;
      var interval = _ref12.interval;
      var angle = _ref12.angle;
      var offset = _ref12.offset;

      this.prepareContextToDrawLines(arguments[0]);

      var centerWidth = this.width / 2;
      var countLines = this.getCountLines({ offset: offset, interval: interval, angle: angle });
      var offsetCountLines = Math.floor(centerWidth / interval);

      //[...Array(countLines)].forEach( (_, idx) => {
      for (var i = 0; i <= countLines * 2; ++i) {
        var k = i - countLines - offsetCountLines;
        var lineProps = {
          x1: centerWidth + interval * k,
          y1: -offset.y,
          x2: centerWidth + interval * k + angle * (this.height + offset.y),
          y2: this.height
        };
        this.drawLine(_extends({}, lineProps, { width: lineWidth }));
      }

      for (var i = 0; i <= countLines * 2; ++i) {
        var k = i - countLines + offsetCountLines;
        var lineProps = {
          x1: centerWidth + interval * k,
          y1: -offset.y,
          x2: centerWidth + interval * k - angle * (this.height + offset.y),
          y2: this.height
        };
        this.drawLine(_extends({}, lineProps, { width: lineWidth }));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.drawGradient(this.gradient);
      this.drawLines(this.lines);
    }
  }]);

  return Canvas;
})();

exports['default'] = Canvas;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

function _debounce(func, ms) {
  var timeout = undefined;
  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, ms);
  };
}

var DashingBackground = (function (_Component) {
  _inherits(DashingBackground, _Component);

  function DashingBackground(props) {
    _classCallCheck(this, DashingBackground);

    _get(Object.getPrototypeOf(DashingBackground.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DashingBackground, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _elementContainer$getBoundingClientRect = this.elementContainer.getBoundingClientRect();

      var width = _elementContainer$getBoundingClientRect.width;
      var height = _elementContainer$getBoundingClientRect.height;

      this.state = { width: width, height: height };
      this.canvas = new _Canvas2['default'](_extends({}, this.state, this.props, { canvas: this.elementCanvas }));
      this.canvas.render();

      this.onWindowResize = _debounce(this.onWindowResize.bind(this), 100);
      this.onWindowResizeListener = window.addEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.canvas.setProps(nextProps);
      this.canvas.render();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {
      var _this = this;

      var _elementContainer$getBoundingClientRect2 = this.elementContainer.getBoundingClientRect();

      var width = _elementContainer$getBoundingClientRect2.width;
      var height = _elementContainer$getBoundingClientRect2.height;

      this.setState({ width: width, height: height }, function () {
        _this.canvas.setDimensions(_this.state);
        _this.canvas.render();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2['default'].createElement(
        'div',
        {
          ref: function (container) {
            return _this2.elementContainer = container;
          },
          style: { width: '100%', height: '100%' }
        },
        _react2['default'].createElement(
          'canvas',
          {
            ref: function (canvas) {
              _this2.elementCanvas = canvas;
            },
            width: this.props.width,
            height: this.props.height
          },
          this.props.children
        )
      );
    }
  }]);

  return DashingBackground;
})(_react.Component);

exports['default'] = DashingBackground;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Canvas":1}]},{},[2])(2)
});