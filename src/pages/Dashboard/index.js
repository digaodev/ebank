import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';

import api, { sessionStorageKey } from '../../services/api';
import { formatPrice, convertFromCents } from '../../util/format';
import Header from '../../components/Header';
import Statement from '../../components/Statement';

import {
  Container,
  Content,
  Aside,
  SearchCard,
  SearchButton,
  SearchIcon,
  UpArrowIcon,
  DownArrowIcon,
  BalanceLoading,
} from './styles';

// const fakeBalance = {
//   balance: 30578,
//   blockedBalance: 0,
// };

const fakeStatements = [
  {
    id: Math.random(),
    amount: 4015,
    balance: 4015,
    createdAt: '2019-11-18T16:07:42.000Z',
    operationType: 'RECEIVED_TRANSFERENCE',
    otherInfo: {
      senderAccount: '00714671000114',
      description: 'Money from dinner last week',
    },
  },
  {
    id: Math.random(),
    amount: 200,
    balance: 200,
    createdAt: '2019-11-18T16:07:42.000Z',
    operationType: 'RECEIVED_TRANSFERENCE',
    otherInfo: {
      senderAccount: '00714671000114',
      description: 'Money from delicious candy',
    },
  },
];

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [statements, setStatements] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  async function searchStatementsByDate(ev) {
    ev.preventDefault();

    // const { data } = await api.get('/b2b/statement');

    // setStatements(data);
  }

  function onChangeFromDate(date) {
    setFromDate(date);
  }

  function onChangeToDate(date) {
    setToDate(date);
  }

  function renderBalance() {
    if (!balance) {
      return <BalanceLoading />;
    }

    if (balance > 0) {
      return (
        <>
          <p>{formatPrice(balance)}</p>
          <UpArrowIcon size={32} />
        </>
      );
    }

    return (
      <>
        <p>{formatPrice(balance)}</p>
        <DownArrowIcon size={32} />
      </>
    );
  }

  useEffect(() => {
    async function loadBalance() {
      const token = window.sessionStorage.getItem(sessionStorageKey);
      const { data } = await api.get('/account/balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBalance(convertFromCents(data.balance));

      const convertedStatements = fakeStatements.map(stmt => ({
        ...stmt,
        convertedAmount: convertFromCents(stmt.amount),
      }));

      setStatements(convertedStatements);
    }

    loadBalance();
  }, []);

  return (
    <Container>
      <Header />

      <Aside>
        <aside>
          <h3>SALDO</h3>

          <span>{renderBalance()}</span>
        </aside>
      </Aside>

      <Content>
        <SearchCard>
          <form>
            <p>Listar extrato de</p>

            <DatePicker
              onChange={onChangeFromDate}
              value={fromDate}
              format="dd/MM/yyyy"
              locale="pt-br"
            />

            <p>a</p>
            <DatePicker
              onChange={onChangeToDate}
              value={toDate}
              format="dd/MM/yyyy"
              locale="pt-br"
            />

            <SearchButton type="submit" onClick={searchStatementsByDate}>
              <SearchIcon size="20" />
              <p>Pesquisar</p>
            </SearchButton>
          </form>
        </SearchCard>

        <p>{statements && `${statements.length} transações encontradas`}</p>
        {statements &&
          statements.map(stmt => <Statement key={stmt.id} data={stmt} />)}
      </Content>
    </Container>
  );
}
