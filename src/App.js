import React from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

const baseName = 'EUR/USD candlestick chart';
const baseUrl = 'https://www.fxempire.com/api/v1/en/markets/eur-usd/chart';

class Chart extends React.Component {
constructor() {
    super();
    this.state = {
      data: [],
    };
}

componentDidMount() {
  fetch(this.props.sourceData)
  .then(response => response.json())
  .then((jsonData) => {
    this.setState({ data: jsonData.map(Object.values).sort() });
  })
}

render() {
  const options = {
    title: {
   text: this.props.name
 },
    series: [
      {
        type: 'candlestick',
        data: this.state.data,
        tooltip: {
  valueDecimals: 5
}
      }
    ]
  };
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Charts</h1>
        <Tabs>
          <TabList>
            <Tab>Chart</Tab>
            <Tab>Charts with timestamps</Tab>
          </TabList>
          <TabPanel>
            <Chart name={baseName} sourceData={baseUrl} />
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>1 min</Tab>
                <Tab>5 min</Tab>
                <Tab>1 hour</Tab>
                <Tab>1 week</Tab>
              </TabList>
              <TabPanel>
                <Chart name={baseName + ' (1 min)'} sourceData={baseUrl + '?time=MIN_1'} />
              </TabPanel>
              <TabPanel>
                <Chart name={baseName + ' (5 min)'} sourceData={baseUrl + '?time=MIN_5'} />
              </TabPanel>
              <TabPanel>
                <Chart name={baseName + ' (1 hour)'} sourceData={baseUrl + '?time=HOUR_1'} />
              </TabPanel>
              <TabPanel>
                <Chart name={baseName + ' (1 week)'} sourceData={baseUrl + '?time=WEEK_1'} />
              </TabPanel>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;
