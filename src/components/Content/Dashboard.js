import React, { Component } from "react";
import { MainLayout } from "../common/MainLayout";
import { Row, Col, Card, Statistic,message } from "antd";
import PageInfo from "../Content/PageInfo";
import Chart from "react-apexcharts";
import { axios } from "../config/axiosConfig";
import { connect } from "react-redux";


const mapStateToProps = (state) => ({
  allCounts: state.allCounts,
});

export class Dashboard extends Component {
  state = {
    loading: true,
    series: [],
    options: {},
    series1: [],
    options1: {},
  };

  cardStyle = {
    height: "140px",
    fontSize: "20px",
    borderRadius: "4px",
    boxShadow:
      "0 0.46875rem 2.1875rem rgba(90, 97, 105, 0.1), 0 0.9375rem 1.40625rem rgba(90, 97, 105, 0.1),   0 0.25rem 0.53125rem rgba(90, 97, 105, 0.12),0 0.125rem 0.1875rem rgba(90, 97, 105, 0.1)",
    fontFamily: "Poppins, sans-serif",
  };

  covidCounts = () => {
    axios
      .get("/v3/covid-19/all")
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
        });
        this.props.dispatch({ type: "FETCH_GLOBAL", allCounts: res.data });
      })
      .catch((err) => {
        message.error(`There is some Error: ${err}`, 3);
      });
  };

  statsByContinents = () => {
    axios
      .get("/v3/covid-19/continents")
      .then(async (res) => {
        console.log(res);
        let casesData = {
          continents: [],
          cases: [],
          recovered: [],
          deaths: [],
        };
        await res.data.forEach((element) => {
          casesData.continents.push(element.continent);
          casesData.cases.push(element.cases);
          casesData.recovered.push(element.recovered);
          casesData.deaths.push(element.deaths);
        });
        console.log(casesData);
        this.setState({
          series: [
            {
              name: "Total Cases",
              data: casesData.cases,
            },
            {
              name: "Recovered",
              data: casesData.recovered,
            },
            {
              name: "Deaths",
              data: casesData.deaths,
            },
          ],
          options: {
            chart: {
              type: "bar",
              height: 430,
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: "top",
                },
              },
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: "12px",
                colors: ["#fff"],
              },
            },
            stroke: {
              show: true,
              width: 1,
              colors: ["#fff"],
            },
            xaxis: {
              categories: casesData.continents,
            },
          },
        });

        this.setState({
          series1: [
            {
              name: "Total Cases",
              type: "column",
              data: casesData.cases,
            },
            {
              name: "Recovered",
              type: "column",
              data: casesData.recovered,
            },
            {
              name: "Deaths",
              type: "line",
              data: casesData.deaths,
            },
          ],
          options1: {
            chart: {
              height: 350,
              type: "line",
              stacked: false,
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: [1, 1, 4],
            },
            title: {
              text: "COVID-19 Continent Wise",
              align: "left",
              offsetX: 110,
            },
            xaxis: {
              categories: casesData.continents,
            },
            yaxis: [
              {
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: "#008FFB",
                },
                labels: {
                  style: {
                    colors: "#008FFB",
                  },
                },
                title: {
                  text: "Total Registered Cases",
                  style: {
                    color: "#008FFB",
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
              {
                seriesName: "Total Cases",
                opposite: true,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: "#00E396",
                },
                labels: {
                  style: {
                    colors: "#00E396",
                  },
                },
                title: {
                  text: "Recovered",
                  style: {
                    color: "#00E396",
                  },
                },
              },
              {
                seriesName: "Deaths",
                opposite: true,

                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: "Red",
                },
                labels: {
                  style: {
                    colors: "Red",
                  },
                },
                title: {
                  text: "Deaths Due To COVID-19",
                  style: {
                    color: "Red",
                  },
                },
              },
            ],
            tooltip: {
              fixed: {
                enabled: true,
                position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60,
              },
            },
            legend: {
              horizontalAlign: "left",
              offsetX: 40,
            },
          },
        });
      })
      .catch((err) => {
        message.error(`There is some Error: ${err}`, 3);
      });
  };

  componentDidMount = () => {
    this.covidCounts();
    this.statsByContinents();
  };

  render() {
    return (
      <MainLayout {...this.props}>
        <PageInfo
          PageName="Global Statistics"
          PageDesc="The Basic Counts and Graphical Stats of COVID-19"
        />
        <Row gutter={[32, 32]}>
          <Col className="gutter-row" span={6}>
            <Card style={this.cardStyle} loading={this.state.loading}>
              <Statistic
                title="Total Registered Cases"
                value={this.props.allCounts.cases}
                valueStyle={{ color: "#6A5ACD", fontSize: "30px" }}
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={this.cardStyle} loading={this.state.loading}>
              <Statistic
                title="Total Active Cases"
                value={this.props.allCounts.active}
                valueStyle={{ color: "Red", fontSize: "30px" }}
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={this.cardStyle} loading={this.state.loading}>
              <Statistic
                title="Total Deaths"
                value={this.props.allCounts.deaths}
                valueStyle={{ color: "Maroon", fontSize: "30px" }}
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card style={this.cardStyle} loading={this.state.loading}>
              <Statistic
                title="Total Recovered Cases"
                value={this.props.allCounts.recovered}
                valueStyle={{ color: "Green", fontSize: "30px" }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col className="gutter-row" span={12}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={430}
            />
          </Col>
          <Col className="gutter-row" span={12}>
            <Chart
              options={this.state.options1}
              series={this.state.series1}
              type="line"
              height={430}
            />
          </Col>
        </Row>
      </MainLayout>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
