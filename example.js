require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDashingBackground = require('react-dashing-background');

var _reactDashingBackground2 = _interopRequireDefault(_reactDashingBackground);

var App = (function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);

    this.state = {
      gradient: {
        stops: [{
          offset: 0,
          color: 'rgb(28,82,123)'
        }, {
          offset: 1,
          color: 'rgb(18,53,80)'
        }]
      },
      lines: {
        width: 2,
        color: 'rgb(47,115,162)',
        interval: 200,
        angle: Math.PI / 2,
        offset: {
          x: 0,
          y: 0
        },
        dash: {
          segments: [10, 12],
          offset: 0
        },
        shadow: {
          color: 'white',
          blur: 0,
          offset: {
            x: 0,
            y: 0
          }
        }
      }
    };

    this.animationStep = this.animationStep.bind(this);
    window.requestAnimationFrame(this.animationStep);
  }

  _createClass(App, [{
    key: 'animationStep',
    value: function animationStep() {
      var dashOffset = this.state.lines.dash.offset;
      this.setState({
        lines: _extends({}, this.state.lines, {
          dash: _extends({}, this.state.lines.dash, {
            offset: dashOffset + 0.3
          })
        })
      });
      window.requestAnimationFrame(this.animationStep);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { style: {
            width: '100%',
            height: '500px',
            overflow: 'hidden'
          } },
        _react2['default'].createElement(
          _reactDashingBackground2['default'],
          this.state,
          _react2['default'].createElement(
            'p',
            null,
            'Your browser doesn\'t support canvas'
          )
        )
      );
    }
  }]);

  return App;
})(_react.Component);

_reactDom2['default'].render(_react2['default'].createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dashing-background":undefined,"react-dom":undefined}]},{},[1]);
