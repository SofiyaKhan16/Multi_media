import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyGoogleToken } from '../../api/account';
import { getCookie } from '../../api/cookies';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('jwtToken');
    if (token) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      console.log(credentialResponse);
      await verifyGoogleToken(credentialResponse.credential);
      navigate('/home');
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
        <h1 className="login-title" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          <span role="img" aria-label="media">🎬</span> Media Hub
        </h1>
        <div className="login-welcome" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '0.3rem' }}>
          Welcome Back
        </div>
        <div className="login-subtitle" style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666' }}>
          Sign in to continue to your workspace
        </div>
        <div className="login-google" style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            theme="outline"
            size="large"
            shape="rectangular"
          />
        </div>
        <div className="login-google-label" style={{ textAlign: 'center', fontWeight: '500', marginBottom: '0.7rem' }}>
          Sign in with Google
        </div>
        <div className="login-terms" style={{ textAlign: 'center', fontSize: '0.9rem', color: '#888' }}>
          By signing in, you agree to Nextask's <a href="#" style={{ color: '#1976d2', textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ color: '#1976d2', textDecoration: 'underline' }}>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Login;