import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/auth';

import { Container, Content, Profile, LogoIcon, LogoutIcon } from './styles';

export default function Header() {
  const { logout } = useAuth();

  return (
    <Container>
      <Content>
        <nav>
          <LogoIcon size={20} />
          <span>|</span>
          <h1>EBANK</h1>

          <Link to="/dashboard">MEU DASHBOARD</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <img
                src="https://www.placecage.com/c/100/100"
                alt="foto do meu perfil"
              />
            </div>

            <span>|</span>

            <button type="button" onClick={logout}>
              <LogoutIcon size={20} />
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
