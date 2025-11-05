import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Register } from './Register';

import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');



  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Erro ao tentar fazer login.');
        return;
      }

      localStorage.setItem('token', data.token);
      setMessage('Login realizado com sucesso! ✅');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div className="login-container">
      <div className="right-column">
        <div className="login-form">
          {isLogin ? (
            <>
              <h1 className="login-title">Entre</h1>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="login">Nome de usuário ou Email</label>
                  <input
                    type="text"
                    id="login"
                    name="login"
                    className="login-input"
                    placeholder="Digite o nome de usuário ou email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="passwordLabel" htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="login-input"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {message && (
                  <p className={message.includes('sucesso') ? 'success-message' : 'error-message'}>
                    {message}
                  </p>
                )}

                <div className="form-actions">
                  <a href="#" className="forgot-password-link">Esqueci minha senha</a>
                  <button type="submit" className="login-button">Entrar</button>
                  <a
                    href="#"
                    className="no-account-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitch();
                    }}
                  >
                    Não tenho conta
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
  );
}
