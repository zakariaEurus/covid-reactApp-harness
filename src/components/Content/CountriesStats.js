import React, { Component } from "react";
import { MainLayout } from "../common/MainLayout";
import PageInfo from "../Content/PageInfo";
import {
  Select,
  Row,
  Col,
  Typography,
  Space,
  Table,
  Input,
  Button,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { axios } from "../config/axiosConfig";
import { connect } from "react-redux";

const { Option } = Select;
const { Text } = Typography;

const mapStateToProps = (state) => ({
  countries: state.countries,
});

export class CountriesStats extends Component {
  state = {
    loading: true,
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}>
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  columns = [
    {
      title: "Flag",
      key: "flag",
      dataIndex: "flag",
      render: (_, record) => (
        <img
          style={{ width: "40px", height: "30px" }}
          alt="Flag"
          src={record.countryInfo.flag}
        />
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      ...this.getColumnSearchProps("country"),
    },
    {
      title: "Population",
      key: "population",
      dataIndex: "population",
    },
    {
      title: "Continent",
      key: "continent",
      dataIndex: "continent",
    },
    {
      title: "Tests",
      key: "tests",
      dataIndex: "tests",
    },
    {
      title: "Total Cases",
      key: "cases",
      dataIndex: "cases",
    },
    {
      title: "Active Cases",
      key: "active",
      dataIndex: "active",
    },
    {
      title: "Critical",
      dataIndex: "critical",
    },
    {
      title: "Deaths",
      key: "deaths",
      dataIndex: "deaths",
    },

    {
      title: "Recovered",
      dataIndex: "recovered",
    },
  ];

  sortSearch = (value) => {
    this.setState({ loading: true });
    axios
      .get(`/v3/covid-19/countries?sort=${value}`)
      .then(async (res) => {
        await this.props.dispatch({
          type: "FETCH_COUNTRIES",
          countries: res.data,
        });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        message.error(`There is some Error: ${err}`, 3);
      });
  };

  statsByCountries = () => {
    axios
      .get("/v3/covid-19/countries")
      .then(async (res) => {
        this.setState({
          loading: false,
        });
        await this.props.dispatch({
          type: "FETCH_COUNTRIES",
          countries: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        message.error(`There is some Error: ${err}`, 3);
      });
  };

  componentDidMount = () => {
    this.statsByCountries();
  };

  render() {
    const { countries } = this.props;
    return (
      <MainLayout {...this.props}>
        <PageInfo
          PageName="Search Stats by Countries"
          PageDesc="COVID 19 Statistics for Countries"
        />
        <Row gutter={[48, 16]}>
          <Col className="gutter-row" span={48}>
            <Space style={{ float: "left" }}>
              <Text>Sort By: </Text>
              <Select
                defaultValue="Select for Sort"
                style={{ width: 200 }}
                loading={false}
                onChange={this.sortSearch}>
                <Option value="Select for Sort">Select for Sort</Option>
                <Option value="population">Population</Option>
                <Option value="tests">Tests</Option>
                <Option value="cases">Total Cases</Option>
                <Option value="active">Active</Option>
                <Option value="critical">Critical</Option>
                <Option value="deaths">Deaths</Option>
                <Option value="recovered">Recovered</Option>
              </Select>
            </Space>
          </Col>
        </Row>
        <Table
          rowKey="countries_table"
          columns={this.columns}
          dataSource={countries}
          loading={this.state.loading}
        />
      </MainLayout>
    );
  }
}

export default connect(mapStateToProps)(CountriesStats);
