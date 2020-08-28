import React, { Component } from "react";
import axios from "axios";

class Contact extends Component {
  state = {
    formData: {
      name: "",
      email: "",
      message: "",
    },
    sent: false,
    buttonText: "Send Message",
  };

  setData = (input, event) => {
    let formDataNew = this.state.formData;
    formDataNew[input] = event.target.value;
    this.setState({
      formData: formDataNew,
    });
  };

  formSubmit = (event) => {
    event.preventDefault();
    this.setState({
      buttonText: "...sending",
    });
    let data = this.state.formData;

    axios
      .post("https://serverless-contact-form-react-4xo2lbtev.vercel.app/", data)
      .then((res) => {
        this.setState({ sent: true }, this.resetForm());
      })
      .catch(() => {
        console.log("Message not sent");
      });
  };

  resetForm = () => {
    this.setState({
      formData: {
        name: "",
        email: "",
        password: "",
      },
      buttonText: "Message Sent",
    });
  };

  render() {
    return (
      <div>
        <form
          className="contact-form"
          onSubmit={(event) => this.formSubmit(event)}
        >
          <label htmlFor="message-name" className="message-name">
            Your Name
          </label>
          <input
            onChange={(event) => this.setData("name", event)}
            name="name"
            type="text"
            className="message-name"
            placeholder="Your Name"
            value={this.state.formData.name}
            autoComplete="none"
          />
          <label htmlFor="message-email" className="message-email">
            Your Email
          </label>
          <input
            onChange={(event) => this.setData("email", event)}
            name="email"
            type="email"
            className="message-email"
            placeholder="your@email.com"
            required
            value={this.state.formData.email}
            autoComplete="none"
          />
          <label htmlFor="message-input" className="message">
            Your Message
          </label>
          <textarea
            onChange={(event) => this.setData("message", event)}
            name="message"
            type="text"
            className="message"
            placeholder="Please write your message here."
            value={this.state.formData.message}
            autoComplete="none"
          />
          <div className="button--container">
            <button type="submit" className="button button-primary">
              {this.state.buttonText}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Contact;
