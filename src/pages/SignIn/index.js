import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MdLockOutline } from 'react-icons/md';

import { Container, Content, Form, Input } from './styles';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(ev) {
    ev.preventDefault();

    console.log({ ev });
  }

  return (
    <Container>
      <Content>
        <MdLockOutline size={32} color="#fff" />

        <form onSubmit={handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="informe seu usuário"
          />
          <input
            type="password"
            name="password"
            placeholder="informe sua senha"
          />

          <button type="submit">
            {isLoading ? 'Carregando...' : 'Acessar'}
          </button>
        </form>
      </Content>
    </Container>
  );
}
