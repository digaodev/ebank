import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { useAuth } from '../../context/auth';

import { Container, Content, Icon } from './styles';

const schema = Yup.object().shape({
  username: Yup.string().required('O usuário é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignIn() {
  const { login } = useAuth();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData) {
    setIsLoading(true);

    const token = await login(formData);

    if (token) {
      history.push('/dashboard');
    }
  }

  return (
    <Container>
      <Content>
        <Icon size={32} />
        <h1>Bem vindo ao EBANK</h1>

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input
            type="username"
            name="username"
            placeholder="informe seu usuário"
          />
          <Input
            type="password"
            name="password"
            placeholder="informe sua senha"
          />

          <button type="submit">
            {isLoading ? 'Carregando...' : 'Acessar'}
          </button>
        </Form>
      </Content>
    </Container>
  );
}

export default SignIn;
