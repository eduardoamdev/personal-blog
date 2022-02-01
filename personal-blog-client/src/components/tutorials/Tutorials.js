import React, { Component } from "react";
import YouTube from "react-youtube";
import youtubeLogo from "../../images/youtube-logo.png";
import core from "../../images/core.jpg";
import "./Tutorials.css";

class Tutorials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      tutorials: [],
    };
  }

  componentDidMount() {
    fetch("https://eblog-api.herokuapp.com/api/tutorials")
      .then((res) => res.json())
      .then(
        (result) => {
          let videos = result;
          this.setState({
            isLoaded: true,
            tutorials: videos,
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
    const opts = {
      height: "390",
      width: "640",
    };
    if (this.state.isLoaded === false) {
      return (
        <div className="loading-container">
          <h5 className="neon-text">C A R G A N D O</h5>
        </div>
      );
    } else if (this.state.isLoaded === true) {
      return (
        <div className="assistant-container">
          <div className="main-container">
            <div className="info-container">
              <div className="top-nav"></div>
              <div className="pink-div">
                <img src={core} alt="procesador" id="core-image" />
                <img
                  src={youtubeLogo}
                  alt="logo de youtube"
                  id="youtube-image"
                />
              </div>
              <div className="tutorial-bottom-nav"></div>
              <div className="tutorials-container">
                {this.state.tutorials.map((element) => {
                  return (
                    <div className="video-element" key={element._id}>
                      <YouTube
                        videoId={element.link}
                        opts={opts}
                        className="video"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Tutorials;
