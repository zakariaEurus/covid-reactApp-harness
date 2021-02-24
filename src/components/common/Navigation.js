import React from "react";
import { Menu } from "antd";

import { FileSearchOutlined, DashboardOutlined } from "@ant-design/icons";

const Navigation = (props) => {
  const pathname = props.location.pathname;
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[pathname]}
      onClick={(e) => {
        props.history.push(e.key);
      }}>
      <Menu.Item key="/" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="/countriesStats" icon={<FileSearchOutlined />}>
        Country Wise Stats
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
