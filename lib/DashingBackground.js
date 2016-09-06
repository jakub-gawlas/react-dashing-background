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

var _react = require('react');

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