import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyGoogleToken } from '../../api/account';
import { getCookie } from '../../api/cookies';
import '../../assets/styles/pages/_login.css';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('jwtToken');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      console.log(credentialResponse);
      await verifyGoogleToken(credentialResponse.credential);
      navigate('/');
    } catch (error) {
      console.error('Google verification failed:', error);
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Media Hub</h1>
        <div className="login-subtitle">Sign in to your account</div>
        <div className="login-google">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            theme="outline"
            size="large"
            shape="rectangular"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;