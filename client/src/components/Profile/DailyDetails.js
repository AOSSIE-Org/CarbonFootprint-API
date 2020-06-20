import React, { Component } from "react";
import { Card, Grid, Icon, Button } from "semantic-ui-react";
import InputData from "./InputData";
import { getKey, submitData, getRawData } from "./UtilDatafetch";
import { raw } from "body-parser";

export default class DailyDetails extends Component {
  state = {
    calculation: [],
    apikey: "",
    total: null,
    loading: false,
    rawdata: ""
  };

  addValue = () => {
    this.setState(prev => {
      prev.calculation.push({
        value: null
      });
      return prev;
    });
  };

  componentDidMount() {
    getKey().then(apikey => this.setState({ apikey }));
    getRawData().then(rawdata => this.setState({ rawdata: rawdata.item }));
  }

  changeCalculation = (index, value) => {
    this.setState(prev => {
      prev.calculation[index] = value;
      return prev;
    });
    this.setState(prev => {
      prev.total = parseFloat(
        prev.calculation
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue.emissions,
            0
          )
          .toFixed(2)
      );
      return prev;
    });
  };

  submitToday = () => {
    this.setState({ loading: true });
    submitData(this.state.total, new Date()).then(data => {
      this.setState({ loading: false });
      this.setState({ calculation: [] });
      window.location = "/profile";
      console.log(data);
    });
  };

  render() {
    // console.log(this.state.rawdata);
    const { calculation, apikey, total, loading, rawdata } = this.state;
    return (
      <Grid className="daily-grid">
        <Grid.Row>
          <Grid.Column mobile={16} tablet={9} computer={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Your Activity</Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid className="daily-grid-calculate">
                  {calculation.map((i, index) => (
                    <Grid.Row key={index}>
                      <InputData
                        rawdata={rawdata}
                        apikey={apikey}
                        index={index}
                        changeCalculation={this.changeCalculation}
                      />
                    </Grid.Row>
                  ))}
                  <Grid.Row>
                    <Grid.Column mobile={8} computer={8} tablet={8}>
                      <Icon
                        link
                        size="large"
                        name="add"
                        onClick={this.addValue}
                        className="daily-icon"
                      />
                    </Grid.Column>
                    <Grid.Column mobile={8} computer={8} tablet={8}>
                      <Button
                        primary
                        disabled={this.state.total === null}
                        loading={loading}
                        onClick={this.submitToday}
                        floated="right"
                        className="profile-button"
                      >
                        Total {isNaN(total) ? "" : total}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
