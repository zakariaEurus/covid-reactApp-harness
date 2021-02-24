import React, { Component } from "react";
import MainLayout from "../components/common/MainLayout";
import PageInfo from "../components/Content/PageInfo";

export class NotFound extends Component {
  render() {
    return (
      <MainLayout {...this.props}>
        <PageInfo PageName="Page Not Found" PageDesc="Invalid Page address" />
      </MainLayout>
    );
  }
}

export default NotFound;
