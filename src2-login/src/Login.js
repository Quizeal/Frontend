import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { Container, TextField} from "@material-ui/core";
import "./App.css";
import login from "./images/login.png";
import ch1 from "./images/login-ch0.png"
import ch2 from "./images/sitting 6.png"
import ch3 from "./images/login-ch2.svg"
import { display, positions, textAlign } from '@material-ui/system';
import GoogleButton from 'react-google-button';

function Login() {
  return (
      <div className="screen">
          <div>
              <img src={ch3} alt="ch3"/>
          </div>
        <div className="logo">
            <img src={ch1} alt="character" className="bg-char"/>
            <div>
                <img src={login} alt="logo" className="logo-image"/>
            </div>
            <div>
                <form>
                    <TextField id="email" label="Email Address" variant="outlined" required="true" margin="normal"/>
                    <br/>
                    <TextField id="password" label="Password" variant="outlined" required="true" margin="normal" type="password"/>
                </form>
            </div>
            <div className="remember-me">
                <input id="remember" type="checkbox" />
                <label for="remember">Remember Me</label>
            </div>
            <Button variant="contained" className="login-btn">LOG IN</Button>
            <div className="before-login screen">
                <a href=""><p className="beforeLoginText">Forgot Password?</p></a>
                <a href=""><p className="beforeLoginText">Don't have an account?</p></a>
            </div>
            <div class="separator"></div>
            <div id="GoogleSignIn">
                <GoogleButton type="light" onClick={() => { console.log('Google button clicked') }}/>
            </div>
            <footer className="copyright">Copyright ©Quizeal 2021</footer>
        </div>
        <div>
            <img src={ch2} alt="ch2" className="char-2"/>
        </div>
    </div>
  );
}


export default Login;
