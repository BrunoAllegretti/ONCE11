import { useState, FormEvent } from 'react';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export function Register({ onSwitchToLogin }: RegisterProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  // Novos estados para a foto de perfil e endereço
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
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
    // Criar o FormData
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    // Endereço
    formData.append('cep', cep);
    formData.append('street', street);
    formData.append('number', number);
    formData.append('neighborhood', neighborhood);
    formData.append('city', city);
    formData.append('state', state);

    // Foto de perfil
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    // Enviar para o backend sem headers de JSON!
    const res = await fetch('https://once11-backend.onrender.com', {
      method: 'POST',
      body: formData
      // IMPORTANTE: não coloque headers
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.msg || 'Erro ao tentar registrar.');
      return;
    }

    setMessage('✅ Conta criada com sucesso! Redirecionando para o login...');
    setTimeout(onSwitchToLogin, 2000);

  } catch (error) {
    console.error(error);
    setMessage('Erro ao conectar ao servidor.');
  }
};


  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="login-form">
      <h1 className="login-title">Cadastre-se</h1>
      <form onSubmit={handleRegister}>
        {/* Bloco de Foto de Perfil */}
        <div className="profile-picture-upload">
          <label htmlFor="profile-picture-input" className="profile-picture-label">
            <div className="profile-picture-placeholder">
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Foto de Perfil"
                  className="profile-picture-preview"
                />
              ) : (
                <span className="profile-picture-text">Clique para adicionar foto de perfil</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profile-picture-input"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: 'none' }}
          />
          <p className="profile-picture-title">Foto de Perfil</p>
        </div>
        {/* Fim Bloco de Foto de Perfil */}

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
	          <label htmlFor="name">Nome Completo</label>
          <input
	            type="text"
	            id="name"
	            name="name"
	            className="login-input"
	            placeholder="Digite seu nome completo"
	            value={name}
	            onChange={(e) => setName(e.target.value)}
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
          <label className="passwordLabel" htmlFor="confirmPassword">Repita a Senha</label>
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

        {/* Bloco de Endereço */}
        <h2 className="address-title">Endereço</h2>
        <div className="form-group">
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            name="cep"
            className="login-input"
            placeholder="Digite o CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">Rua</label>
          <input
            type="text"
            id="street"
            name="street"
            className="login-input"
            placeholder="Digite o nome da rua"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>

        <div className="form-group-inline">
          <div className="form-group" style={{ flex: 1, marginRight: '10px' }}>
            <label htmlFor="number">Número</label>
            <input
              type="text"
              id="number"
              name="number"
              className="login-input"
              placeholder="Número"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ flex: 2 }}>
            <label htmlFor="neighborhood">Bairro</label>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              className="login-input"
              placeholder="Digite o bairro"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group-inline">
          <div className="form-group" style={{ flex: 2, marginRight: '10px' }}>
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              id="city"
              name="city"
              className="login-input"
              placeholder="Digite a cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="state">Estado</label>
            <input
              type="text"
              id="state"
              name="state"
              className="login-input"
              placeholder="Estado"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Fim Bloco de Endereço */}

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
