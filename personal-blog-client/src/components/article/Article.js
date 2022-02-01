import React, { Component } from "react";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      article: {},
    };
  }

  fetching() {
    let id = this.props.match.params.articleId;
    fetch(`https://eblog-api.herokuapp.com/api/article/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            article: result,
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

  componentDidMount() {
    this.fetching();
  }

  componentDidUpdate() {
    this.fetching();
  }

  render() {
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
              <div className="article-container">
                <div className="article-title">
                  <h2 className="neon-text">{this.state.article.title}</h2>
                </div>
                <p className="paragraph normal-text">
                  {this.state.article.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Article;
