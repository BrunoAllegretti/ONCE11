import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Register } from './Register';
import { UserContext } from '../../context/UserContext';
import { useTranslation } from '../../context/LanguageContext';

import './Login.css';
import ModelDisplay from "./ModelDisplay";

export  default function Login() {
  const { login } = useContext(UserContext) as any;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslation();



  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    try {
      const res = await fetch('https://once11.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.msg || 'Erro ao tentar fazer login.');
        setIsSuccess(false);
        return;
      }

      // A resposta do backend agora inclui o token e o objeto user
      const { token, user } = data;

      // Chama a função login do contexto, que armazena o token e os dados do usuário
      login(user, token); 

      setMessage(t('login_success'));
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage('Erro ao conectar ao servidor.');
      setIsSuccess(false);
    }
  };

  return (
    <div className={`login-container ${!isLogin ? 'register-full-width' : ''}`}>
      <div className="login-content">
        {isLogin && (
          <div className="left-column">
            <ModelDisplay />
          </div>
        )}
        <div className="right-column">
          <div className="login-form">
          {isLogin ? (
            <>
              <h1 className="login-title">{t('enter')}</h1>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">{t('email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="login-input"
                    placeholder={t('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="passwordLabel" htmlFor="password">{t('password')}</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="login-input"
                    placeholder={t('password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {message && (
                  <p className={isSuccess ? 'success-message' : 'error-message'}>
                    {message}
                  </p>
                )}

                <div className="form-actions">
                  <a href="#" className="forgot-password-link">{t('forgot_password')}</a>
                  <button type="submit" className="login-button">{t('enter')}</button>
                  <a
                    href="#"
                    className="no-account-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitch();
                    }}
                  >
                    {t('no_account')}
                  </a>
                </div>
              </form>
            </>
          ) : (
            <Register onSwitchToLogin={handleSwitch} />
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
