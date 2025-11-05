import { useState, FormEvent } from 'react';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export function Register({ onSwitchToLogin }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    // Regex simples para validação de email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    if (!validateEmail(email)) {
      setMessage('Por favor, insira um email válido.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Erro ao tentar registrar.');
        return;
      }

      setMessage('✅ Conta criada com sucesso! Redirecionando para o login...');
      setTimeout(onSwitchToLogin, 2000); // Alterna para o login após 2 segundos
    } catch (error) {
      console.error(error);
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div className="login-form">
      <h1 className="login-title">Cadastre-se</h1>

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="login-input"
            placeholder="Digite seu melhor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Nome de usuário</label>
          <input
            type="text"
            id="username"
            name="username"
            className="login-input"
            placeholder="Digite um nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            placeholder="Digite uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="passwordLabel" htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="login-input"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {message && (
          <p
            className={message.includes('sucesso') ? 'success-message' : 'error-message'}
          >
            {message}
          </p>
        )}

        <div className="form-actions">
          <a href="#" className="no-account-link" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Já tenho conta</a>
          <button type="submit" className="login-button">Registrar</button>
        </div>
      </form>
    </div>
  );
}
