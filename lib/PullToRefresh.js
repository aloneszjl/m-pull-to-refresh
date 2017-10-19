"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _zscroller = require("zscroller");

var _zscroller2 = _interopRequireDefault(_zscroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// at lease 1s for ux
function fake() {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });
}

var defaultScrollerOptions = {
  scrollingX: false
};

var PullToRefresh = _react2.default.createClass({
  displayName: "PullToRefresh",

  propTypes: {
    loadingFunction: _react.PropTypes.func.isRequired,
    icon: _react.PropTypes.element,
    prefixCls: _react.PropTypes.string,
    loading: _react.PropTypes.element,
    disabled: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    style: _react.PropTypes.object,
    contentClassName: _react.PropTypes.string,
    contentStyle: _react.PropTypes.object,
    distanceToRefresh: _react.PropTypes.number,
    children: _react.PropTypes.any,
    scrollerOptions: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: "rmc-pull-to-refresh",
      distanceToRefresh: 50
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var props = this.props,
        refs = this.refs;
    var prefixCls = props.prefixCls;

    var containerClassList = refs.container.classList;
    this.domScroller = new _zscroller2.default(refs.content, _extends({}, defaultScrollerOptions, props.scrollerOptions));
    var scroller = this.domScroller.scroller;
    scroller.activatePullToRefresh(props.distanceToRefresh, function () {
      containerClassList.add(prefixCls + "-active");
    }, function () {
      containerClassList.remove(prefixCls + "-active");
      containerClassList.remove(prefixCls + "-loading");
    }, function () {
      containerClassList.add(prefixCls + "-loading");
      Promise.all([].concat(_toConsumableArray(props.loadingFunction()), [fake()])).then(_this.finishPullToRefresh, _this.finishPullToRefresh);
    });
  },


  // componentDidUpdate() {
  //   this.domScroller.reflow();
  // },

  componentWillUnMount: function componentWillUnMount() {
    this.domScroller.destroy();
  },
  finishPullToRefresh: function finishPullToRefresh() {
    this.domScroller.scroller.finishPullToRefresh();
  },
  render: function render() {
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
        ref: "container"
      },
      _react2.default.createElement(
        "div",
        {
          ref: "content",
          className: prefixCls + "-content " + contentClassName,
          style: contentStyle
        },
        _react2.default.createElement(
          "div",
          { key: "ptr", ref: "ptr", className: prefixCls + "-ptr" },
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
});

exports.default = PullToRefresh;