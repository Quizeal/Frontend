import axios from 'axios';
import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';
import GoogleAccount from '../layout/GoogleAccount';

const clientId = process.env.REACT_APP_CLIENT_ID;

function GoogleLn() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    refreshTokenSetup(res);
    console.log(axios.defaults.headers);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(`Failed to login. 😢`);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <GoogleAccount
            disable={renderProps.disabled}
            click={renderProps.onClick}
          />
        )}
        buttonText='LOGIN'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleLn;
