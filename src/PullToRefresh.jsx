import React, { PropTypes } from "react";
import DOMScroller from "zscroller";

// at lease 1s for ux
function fake() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

const defaultScrollerOptions = {
  scrollingX: false
};

class PullToRefresh extends React.Component {
  propTypes: {
    loadingFunction: PropTypes.func.isRequired,
    icon: PropTypes.element,
    prefixCls: PropTypes.string,
    loading: PropTypes.element,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    distanceToRefresh: PropTypes.number,
    children: PropTypes.any,
    scrollerOptions: PropTypes.object
  };

  componentDidMount() {
    const { prefixCls } = this.props;
    const containerClassList = this.container.classList;
    this.domScroller = new DOMScroller(this.content, {
      ...defaultScrollerOptions,
      ...this.props.scrollerOptions
    });
    const scroller = this.domScroller.scroller;
    scroller.activatePullToRefresh(
      this.props.distanceToRefresh,
      () => {
        containerClassList.add(`${prefixCls}-active`);
      },
      () => {
        containerClassList.remove(`${prefixCls}-active`);
        containerClassList.remove(`${prefixCls}-loading`);
      },
      () => {
        containerClassList.add(`${prefixCls}-loading`);
        Promise.all([this.props.loadingFunction(), fake()]).then(
          this.finishPullToRefresh,
          this.finishPullToRefresh
        );
      }
    );
  }

  // componentDidUpdate() {
  //   this.domScroller.reflow();
  // },

  componentWillUnMount() {
    this.domScroller.destroy();
  }

  finishPullToRefresh() {
    this.domScroller.scroller.finishPullToRefresh();
  }

  render() {
    const {
      prefixCls,
      children,
      icon,
      loading,
      className = "",
      style,
      contentStyle,
      contentClassName = ""
    } = this.props;
    return (
      <div
        className={`${className} ${prefixCls}`}
        style={style}
        ref={container => {
          this.container = container;
        }}
      >
        <div
          ref={content => {
            this.content = content;
          }}
          className={`${prefixCls}-content ${contentClassName}`}
          style={contentStyle}
        >
          <div
            key="ptr"
            ref={ptr => {
              this.ptr = ptr;
            }}
            className={`${prefixCls}-ptr`}
          >
            <div className={`${prefixCls}-ptr-icon`}>{icon}</div>
            <div className={`${prefixCls}-ptr-loading`}>{loading}</div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

PullToRefresh.defaultProps = {
  prefixCls: "rmc-pull-to-refresh",
  distanceToRefresh: 50
};

export default PullToRefresh;
