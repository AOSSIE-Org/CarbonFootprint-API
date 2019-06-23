import React, { Component } from "react";
import { Card, Grid, Icon, Button } from "semantic-ui-react";
import InputData from "./InputData";
import { getKey, submitData } from "./UtilDatafetch";

export default class DailyDetails extends Component {
  state = {
    calculation: [],
    apikey: "",
    total: null,
    loading: false
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
    const { calculation, apikey, total, loading } = this.state;
    return (
      <Grid centered textAlign="center">
        <Grid.Row>
          <Grid.Column mobile={16} tablet={9} computer={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Your Activity</Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid style={{ marginLeft: "15px" }} textAlign="left">
                  {calculation.map((i, index) => (
                    <Grid.Row key={index}>
                      <InputData
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
                        style={{ margin: "11px" }}
                      />
                    </Grid.Column>
                    <Grid.Column mobile={8} computer={8} tablet={8}>
                      <Button
                        primary
                        disabled={this.state.total === null}
                        loading={loading}
                        onClick={this.submitToday}
                        floated="right"
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
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
