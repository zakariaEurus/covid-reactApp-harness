import React, { Component } from "react";
import { Divider } from "antd";

export class PageInfo extends Component {
  render() {
    return (
      <>
        <div style={{ float: "left" }}>
          <div style={{ float: "left", display: "inline", fontSize: "30px" }}>
            {this.props.PageName}
            <span
              style={{ fontSize: "15px", marginLeft: "10px", opacity: "60%" }}>
              {" "}
              {this.props.PageDesc}
            </span>
          </div>
        </div>
        <Divider />
      </>
    );
  }
}

export default PageInfo;
