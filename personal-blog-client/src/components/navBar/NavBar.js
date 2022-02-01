import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import hamburguer from "../../images/hamburguer.png";
import closeButton from "../../images/close-button.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleArticles: false,
      visibleProjects: false,
      error: null,
      isLoaded: false,
      articles: [],
      projects: [],
    };
  }

  componentDidMount() {
    fetch("https://eblog-api.herokuapp.com/api/articles")
      .then((res) => res.json())
      .then(
        (result) => {
          let myArticles = result;
          this.setState({
            isLoaded: true,
            articles: myArticles,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    fetch("https://eblog-api.herokuapp.com/api/projects")
      .then((res) => res.json())
      .then(
        (result) => {
          let myProjects = result;
          this.setState({
            isLoaded: true,
            projects: myProjects,
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

  showElements(event) {
    event.preventDefault();
    let hidden = this.state.visible;
    if (hidden === false) {
      this.setState({
        visible: true,
      });
    } else {
      this.setState({
        visible: false,
      });
    }
    this.hideArticles(event);
    this.hideProjects(event);
  }

  showArticles(event) {
    event.preventDefault();
    this.setState({
      visible: false,
      visibleArticles: true,
      visibleProjects: false,
    });
  }

  hideArticles(event) {
    event.preventDefault();
    this.setState({
      visibleArticles: false,
    });
  }

  showProjects(event) {
    event.preventDefault();
    this.setState({
      visible: false,
      visibleProjects: true,
      visibleArticles: false,
    });
  }

  hideProjects(event) {
    event.preventDefault();
    this.setState({
      visibleProjects: false,
    });
  }

  hideBoth(event) {
    this.hideArticles(event);
    this.hideProjects(event);
  }

  render() {
    let isVisible = this.state.visible;
    let areArticlesVisible = this.state.visibleArticles;
    let areProjectsVisible = this.state.visibleProjects;
    return (
      <div>
        <div className={`${isVisible ? "" : "hidden"}`}>
          <div className="burguer-elements">
            <div onClick={this.showElements.bind(this)}>
              <Link
                to="/"
                className="burguer-elements-link normal-text neon-nav-element"
              >
                Inicio
              </Link>
            </div>
            <div className="bottom-nav"></div>
            <div onClick={this.showElements.bind(this)}>
              <Link
                to="/aboutMe"
                className="burguer-elements-link normal-text neon-nav-element"
              >
                Sobre mí
              </Link>
            </div>
            <div className="bottom-nav"></div>
            <div onClick={this.showArticles.bind(this)}>
              <div className="burguer-elements-link normal-text neon-nav-element">
                Artículos
              </div>
            </div>
            <div className="bottom-nav"></div>
            <div onClick={this.showElements.bind(this)}>
              <Link
                to="/tutorials"
                className="burguer-elements-link normal-text neon-nav-element"
              >
                Vídeos
              </Link>
            </div>
            <div className="bottom-nav"></div>
            <div onClick={this.showProjects.bind(this)}>
              <div className="burguer-elements-link normal-text neon-nav-element">
                Proyectos
              </div>
            </div>
            <div className="bottom-nav"></div>
            <div onClick={this.showElements.bind(this)}>
              <Link
                to="/contact"
                className="burguer-elements-link normal-text neon-nav-element"
              >
                Contacta
              </Link>
            </div>
            <div className="bottom-nav"></div>
          </div>
        </div>
        <div className={`${areArticlesVisible ? "" : "hidden"}`}>
          <div className="articles">
            <div
              className="close-button"
              onClick={this.hideArticles.bind(this)}
            >
              <img src={closeButton} alt="close-button" />
            </div>
            <div className="bottom-nav"></div>
            <div onClick={this.hideArticles.bind(this)}>
              {this.state.articles.map((element) => {
                let article = element;
                return (
                  <div key={article._id}>
                    <Link
                      to={`/article/${article._id}`}
                      className="article-link normal-text neon-nav-element"
                    >
                      {article.title}
                    </Link>
                    <div className="bottom-nav"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={`${areProjectsVisible ? "" : "hidden"}`}>
          <div className="projects">
            <div
              className="projects-close-button"
              onClick={this.hideProjects.bind(this)}
            >
              <img src={closeButton} alt="close-button" />
            </div>
            <div className="bottom-nav"></div>
            <div onClick={this.hideProjects.bind(this)}>
              {this.state.projects.map((element) => {
                let project = element;
                return (
                  <div key={project._id}>
                    <Link
                      to={`/project/${project._id}`}
                      className="project-link normal-text"
                    >
                      {project.name}
                    </Link>
                    <div className="bottom-nav"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <nav className="navigation">
          <div className="burguer" onClick={this.showElements.bind(this)}>
            <img src={hamburguer} alt="hamburguer" />
          </div>
          <div className="nav-elements">
            <div onClick={this.hideBoth.bind(this)} className="nav-link">
              <Link
                to="/"
                className="element-link normal-text neon-nav-element"
              >
                Inicio
              </Link>
            </div>
            <div onClick={this.hideBoth.bind(this)} className="nav-link">
              <Link
                to="/aboutMe"
                className="element-link normal-text neon-nav-element"
              >
                Sobre mí
              </Link>
            </div>
            <div
              className="nav-link element-link normal-text neon-nav-element"
              onClick={this.showArticles.bind(this)}
            >
              Artículos
            </div>
            <div onClick={this.hideBoth.bind(this)} className="nav-link">
              <Link
                to="/tutorials"
                className="element-link normal-text neon-nav-element"
              >
                Vídeos
              </Link>
            </div>
            <div
              className="nav-link element-link normal-text neon-nav-element"
              onClick={this.showProjects.bind(this)}
            >
              Projectos
            </div>
            <div onClick={this.hideBoth.bind(this)} className="nav-link">
              <Link
                to="/contact"
                className="element-link normal-text neon-nav-element"
              >
                Contacta
              </Link>
            </div>
          </div>
        </nav>
        <div className="bottom-nav"></div>
      </div>
    );
  }
}

export default NavBar;
