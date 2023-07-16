import React, { Component } from "react";
import "../App.css";
import users from "../users";
import SimpleReactValidator from "simple-react-validator";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

let ID;
class Login extends Component {
  state = {
    cardNumber: 2222222222222222,
    password: "00000000",
    user: false,
  };

  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }

  handleInputCard = (event) => {
    this.setState({
      cardNumber: event.target.value,
    });

    if (!this.validator.fieldValid("card")) {
      // booya this field is valid!
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  handleInputPass = (event) => {
    this.setState({
      password: event.target.value,
    });

    if (!this.validator.fieldValid("password")) {
      // booya this field is valid!
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  submitForm = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      users.map((u) => {
        if (
          this.state.cardNumber === u.cardNumber &&
          this.state.password === u.password
        ) {
          this.props.submitForm();
          this.setState({
            user: true,
          });
          ID = u.id;
        }
      });
    } else {
        console.log('hp')
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div className="form-div">
        {this.state.user && <Redirect to={"dashboard/" + ID} />}
        <h1>React ATM</h1>
        <form>
          <div className="form-group">
            <label htmlFor="">Card:</label>
            <input
              type="number"
              name="card"
              onChange={this.handleInputCard}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder={'card is 2222222222222222'}
                            required
              value={this.state.card}
            />
            {this.validator.message(
              "card",
              this.state.cardNumber,
              "required|min:16|max:16|numeric"
            )}

            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              id="pass"
              onChange={this.handleInputPass}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="8-Digits"
              required
              value={this.state.password}
            />
            {this.validator.message(
              "password",
              this.state.password,
              "required|min:8"
            )}

            <button
              className="btn btn-primary"
              onClick={this.submitForm}
              value="Iniciar Sesion"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  submitForm() {
    dispatch({
      type: "SUBMIT_FORM",
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
