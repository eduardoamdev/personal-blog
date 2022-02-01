import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      info: [],
    };
  }

  componentDidMount() {
    fetch("https://eblog-api.herokuapp.com/api/personal")
      .then((res) => res.json())
      .then(
        (result) => {
          let filteredResult = result.filter((element) => {
            return element.type === "footer";
          });
          let personalInfo = filteredResult[0];
          this.setState({
            isLoaded: true,
            info: personalInfo,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        <div className="top-nav"></div>
        <footer className="footer">
          <p>{this.state.info.text}</p>
        </footer>
      </div>
    );
  }
}

export default Footer;
