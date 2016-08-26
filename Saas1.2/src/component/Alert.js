import React, { Component, PropTypes } from 'react'

class Alert extends Component {
  render() {
    return (
      <div className="notification" id="AlertCont">
          <div className="notification-inner">
              <div className="notification-content">
                  <div className="notification-title" id="AlertTxt">请选择用途类别</div>
              </div>
              <div className="notification-handle-bar"></div>
          </div>
      </div>
    )
  }
}

export default Alert
