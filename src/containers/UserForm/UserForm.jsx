import React, { useState } from 'react';

import SuccessMessage from '../../components/SuccessMessage';

import './UserForm.scss';

const UserForm = () => {
  const [name, setName] = useState('John Doe');
  const [user, setUser] = useState('johndoe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [avatar, setAvatar] = useState('');
  const [success, setSuccess] = useState(false);
  
  function handleSubmit(e) {
    e.preventDefault();

    const obj = JSON.stringify({
      name,
      avatar,
      user,
      email,
    });

    fetch('https://5e7d0266a917d70016684219.mockapi.io/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    }).then(() => setSuccess(true));
  }

  return (
    <React.Fragment>
      <section className="profiile" data-testid="user-form">
        <div className="container">
          <div className="profile-data">
            <div className="user">
              <div className="user__thumb">
                <img src="https://viniciusvinna.netlify.app/assets/api-instagram/profiles/profile-placeholder.png" alt=""/>
              </div>
              <p className="user__name">{name}<span>@{user}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="post__form">
        <div className="container">
          <div className="post__form__wrapper">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              placeholder="Ex: Fulano da Silva"
              onChange={e => setName(e.target.value)}
            />

            <label>Usuário</label>
            <input
              type="text"
              value={user}
              placeholder="Ex: fulano_da_silva"
              onChange={e => setUser(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Ex: fulano@provedor.com"
              onChange={e => setEmail(e.target.value)}
            />

            <label>Url da Imagem de Perfil (use a url da imagem do Linkedin)</label>
            <input
              type="text"
              placeholder="http://..."
              onChange={e => setAvatar(e.target.value)}
            />

            <button type="button" onClick={handleSubmit}>Cadastrar</button>
          </div>
        </div>
      </section>

      {success && <SuccessMessage />}
    </React.Fragment>
  );
};

export default UserForm;
