import React, { Component } from "react";

import { Layout } from "antd";

import Navigation from "../common/Navigation";
const { Header, Content, Footer, Sider } = Layout;

export class MainLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          // style={{
          //   height: "100vh",
          //   position: "fixed",
          //   left: 0,
          // }}
        >
          <div
            className="logo"
            style={{
              margin: "16px",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}>
            <span>
              <img
                style={{
                  width: this.state.collapsed ? "50px" : "130px",
                  height: this.state.collapsed ? "50px" : "120px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
                src="COVID-19-Logo.png"
                alt="LOGO"
              />
            </span>
          </div>
          <Navigation {...this.props} />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ marginBottom: "16px", padding: 0, background: "#fff" }}>
            <div
              style={{
                fontSize: "28px",
              }}>
              <h1 style={{ display: "inline", marginLeft: "15px" }}>
                COVID-19 Statistics Dashboard
              </h1>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 560,
                textAlign: "center",
                background: "#fff",
              }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            COVID 19 Stats Dashboard ©2020 Created by M. Zakaria Nazir
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
