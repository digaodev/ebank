import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import { format, parseISO, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api, { sessionStorageKey } from '../../services/api';
import { formatPrice, convertFromCents } from '../../util/format';
import OpTypes from '../../util/operationType';

import Header from '../../components/Header';
import Statement from '../../components/Statement';
import BarGraph from '../../components/BarGraph';

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

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [barData, setBarData] = useState([]);
  const [statements, setStatements] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  async function searchStatementsByDate(ev) {
    ev.preventDefault();

    const token = window.sessionStorage.getItem(sessionStorageKey);
    const barResponse = await api.get('/b2b/balance/graph', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        initialDate: format(fromDate, 'yyyy-MM-dd'),
        finalDate: format(toDate, 'yyyy-MM-dd'),
      },
    });

    const formattedBarData = barResponse.data.items.map(item => {
      const newDate = format(parseISO(item.transactionDate), 'd');
      const newValue =
        item.transactionType === 'DEBIT' ? item.value * -1 : item.value;

      return {
        ...item,
        value: convertFromCents(newValue),
        transactionDate: newDate,
      };
    });

    setBarData(formattedBarData);

    const stmtResponse = await api.get('/b2b/statement', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        initialDate: format(fromDate, 'yyyy-MM-dd'),
        finalDate: format(toDate, 'yyyy-MM-dd'),
      },
    });

    const convertedStatements = stmtResponse.data.statement.map(stmt => ({
      ...stmt,
      amount: convertFromCents(stmt.amount),
      createdAt: format(parseISO(stmt.createdAt), 'd MMM', { locale: ptBR }),
      operationType: OpTypes[stmt.operationType],
    }));

    setStatements(convertedStatements);
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

  function renderStatements() {
    return (
      statements &&
      statements.map(stmt => <Statement key={stmt.id} data={stmt} />)
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
    }

    loadBalance();
  }, []);

  useEffect(() => {
    async function loadBarData() {
      const token = window.sessionStorage.getItem(sessionStorageKey);
      const { data } = await api.get('/b2b/balance/graph', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          initialDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
          finalDate: format(new Date(), 'yyyy-MM-dd'),
        },
      });

      const formattedBarData = data.items.map(item => {
        const newDate = format(parseISO(item.transactionDate), 'd');
        const newValue =
          item.transactionType === 'DEBIT' ? item.value * -1 : item.value;

        return {
          ...item,
          value: convertFromCents(newValue),
          transactionDate: newDate,
        };
      });

      setBarData(formattedBarData);
    }

    loadBarData();
  }, []);

  useEffect(() => {
    async function loadStatements() {
      const token = window.sessionStorage.getItem(sessionStorageKey);

      const { data } = await api.get('/b2b/statement', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          initialDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
          finalDate: format(new Date(), 'yyyy-MM-dd'),
        },
      });

      const convertedStatements = data.statement.map(stmt => ({
        ...stmt,
        amount: convertFromCents(stmt.amount),
        createdAt: format(parseISO(stmt.createdAt), 'd MMM', { locale: ptBR }),
        operationType: OpTypes[stmt.operationType],
      }));

      setStatements(convertedStatements);
    }

    loadStatements();
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
        {statements.length > 0 && <BarGraph data={barData} />}

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

        <ul>{renderStatements()}</ul>
      </Content>
    </Container>
  );
}
