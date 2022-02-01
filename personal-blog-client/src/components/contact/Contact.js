import React, { Component } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }

  serviceId = {};

  templateId = {};

  userId = {};

  componentDidMount() {
    fetch("https://eblog-api.herokuapp.com/api/personal")
      .then((res) => res.json())
      .then(
        (result) => {
          let filteredResult = result.filter((element) => {
            return (
              element.type === "service_id" ||
              element.type === "template_id" ||
              element.type === "user_id"
            );
          });
          filteredResult.forEach((element) => {
            if (element.type === "service_id") {
              this.serviceId = element.text;
            } else if (element.type === "template_id") {
              this.templateId = element.text;
            } else {
              this.userId = element.text;
            }
          });
          this.setState({
            isLoaded: true,
            info: filteredResult,
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

  sendEmail(event) {
    event.preventDefault();
    emailjs
      .sendForm(this.serviceId, this.templateId, event.target, this.userId)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    event.target.reset();
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
            <div className="no-border-info-container">
              <form
                className="contact-form"
                onSubmit={this.sendEmail.bind(this)}
              >
                <label className="question-text neon-text paragraph">
                  ¿Qué me quieres contar?
                </label>
                <textarea
                  className="message"
                  name="message"
                  rows="10"
                  cols="80"
                />
                <input className="send-button" type="submit" value="Enviar" />
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Contact;
