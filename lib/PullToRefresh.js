"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _zscroller = require("zscroller");

var _zscroller2 = _interopRequireDefault(_zscroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// at lease 1s for ux
function fake() {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });
}

var defaultScrollerOptions = {
  scrollingX: false
};

var PullToRefresh = function (_React$Component) {
  _inherits(PullToRefresh, _React$Component);

  function PullToRefresh(props) {
    _classCallCheck(this, PullToRefresh);

    var _this = _possibleConstructorReturn(this, (PullToRefresh.__proto__ || Object.getPrototypeOf(PullToRefresh)).call(this, props));

    _this.finishPullToRefresh = _this.finishPullToRefresh.bind(_this);
    return _this;
  }

  _createClass(PullToRefresh, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var prefixCls = this.props.prefixCls;

      var containerClassList = this.container.classList;
      this.domScroller = new _zscroller2.default(this.content, _extends({}, defaultScrollerOptions, this.props.scrollerOptions));
      var scroller = this.domScroller.scroller;
      scroller.activatePullToRefresh(this.props.distanceToRefresh, function () {
        containerClassList.add(prefixCls + "-active");
      }, function () {
        containerClassList.remove(prefixCls + "-active");
        containerClassList.remove(prefixCls + "-loading");
      }, function () {
        containerClassList.add(prefixCls + "-loading");
        Promise.all([_this2.props.loadingFunction(), fake()]).then(_this2.finishPullToRefresh, _this2.finishPullToRefresh);
      });
    }

    // componentDidUpdate() {
    //   this.domScroller.reflow();
    // },

  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      this.domScroller.destroy();
    }
  }, {
    key: "finishPullToRefresh",
    value: function finishPullToRefresh() {
      this.domScroller.scroller.finishPullToRefresh();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          prefixCls = _props.prefixCls,
          children = _props.children,
          icon = _props.icon,
          loading = _props.loading,
          _props$className = _props.className,
          className = _props$className === undefined ? "" : _props$className,
          style = _props.style,
          contentStyle = _props.contentStyle,
          _props$contentClassNa = _props.contentClassName,
          contentClassName = _props$contentClassNa === undefined ? "" : _props$contentClassNa;

      return _react2.default.createElement(
        "div",
        {
          className: className + " " + prefixCls,
          style: style,
          ref: function ref(container) {
            _this3.container = container;
          }
        },
        _react2.default.createElement(
          "div",
          {
            ref: function ref(content) {
              _this3.content = content;
            },
            className: prefixCls + "-content " + contentClassName,
            style: contentStyle
          },
          _react2.default.createElement(
            "div",
            {
              key: "ptr",
              ref: function ref(ptr) {
                _this3.ptr = ptr;
              },
              className: prefixCls + "-ptr"
            },
            _react2.default.createElement(
              "div",
              { className: prefixCls + "-ptr-icon" },
              icon
            ),
            _react2.default.createElement(
              "div",
              { className: prefixCls + "-ptr-loading" },
              loading
            )
          ),
          children
        )
      );
    }
  }]);

  return PullToRefresh;
}(_react2.default.Component);

PullToRefresh.defaultProps = {
  prefixCls: "rmc-pull-to-refresh",
  distanceToRefresh: 50
};

exports.default = PullToRefresh;