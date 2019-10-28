import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/auth';
import api, { sessionStorageKey } from '../../services/api';

import { Container, Content, Profile, LogoIcon, LogoutIcon } from './styles';

export default function Header() {
  const [userName, setUserName] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    async function getUserInfo() {
      const token = window.sessionStorage.getItem(sessionStorageKey);

      const { data } = await api.get('/b2b/owner', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserName(data.userData.fullName.split(' ')[0]);
    }

    getUserInfo();
  }, []);

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
          {userName && <p>{userName}</p>}
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
