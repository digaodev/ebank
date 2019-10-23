import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import OpTypes from '../../util/operationType';
import { formatPrice } from '../../util/format';

import {
  Container,
  Content,
  Header,
  DropDownButton,
  DropDownIcon,
  DropUpIcon,
  ExpansionPanel,
  Details,
  Location,
} from './styles';

export default function Statement({ data }) {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const formattedDate = format(parseISO(data.createdAt), 'dd MMM yyyy', {
    locale: ptBR,
  });

  const staticMapImage = `https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=400x200&maptype=roadmap
  &markers=color:blue%7Clabel:S%7C40.702147,-74.015794
  &key=${process.env.REACT_APP_GOOGLEMAPSAPI}`;

  function toggleOpenPanel() {
    setIsPanelOpen(isOpen => !isOpen);
  }

  return (
    <Container>
      <Content>
        <Header>
          <p>{formattedDate}</p>

          <p>{OpTypes[data.operationType]}</p>

          <p className="amount">{formatPrice(data.convertedAmount)}</p>

          <DropDownButton onClick={toggleOpenPanel}>
            {isPanelOpen ? (
              <DropUpIcon size={40} />
            ) : (
              <DropDownIcon size={40} />
            )}
          </DropDownButton>
        </Header>

        {isPanelOpen && (
          <ExpansionPanel>
            <Details>
              <div>
                <p className="sender">{data.otherInfo.senderAccount}</p>
                <p className="description">{data.otherInfo.description}</p>
                <p className="amount">{formatPrice(data.convertedAmount)}</p>
              </div>
            </Details>
            <Location>
              <img src={staticMapImage} alt="Mapa do local" />
            </Location>
          </ExpansionPanel>
        )}
      </Content>
    </Container>
  );
}

Statement.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    amount: PropTypes.number,
    balance: PropTypes.number,
    createdAt: PropTypes.string,
    operationType: PropTypes.string,
    otherInfo: PropTypes.shape({
      senderAccount: PropTypes.string,
      description: PropTypes.string,
    }),
    convertedAmount: PropTypes.number,
  }).isRequired,
};
