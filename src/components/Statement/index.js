import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../../util/format';

import {
  Container,
  Content,
  Header,
  DropDownIcon,
  DropUpIcon,
  ExpansionPanel,
  Details,
  Location,
} from './styles';

const STATIC_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap?';

export default function Statement({ data }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const staticMapImage = `${STATIC_MAP_URL}size=400x200&maptype=roadmap
  &markers=color:red%7C${data.otherInfo.userLatitude},${data.otherInfo.userLongitude}
  &key=${process.env.REACT_APP_GOOGLEMAPSAPI}`;

  function toggleOpenPanel() {
    setIsPanelOpen(isOpen => !isOpen);
  }

  return (
    <Container>
      <Content>
        <Header onClick={toggleOpenPanel}>
          <p>{data.createdAt}</p>

          <p>{data.operationType}</p>

          <p className="amount">{formatPrice(data.amount)}</p>

          {isPanelOpen ? <DropUpIcon size={40} /> : <DropDownIcon size={40} />}
        </Header>

        {isPanelOpen && (
          <ExpansionPanel>
            <Details>
              <div>
                <p className="sender">{data.otherInfo.otherAccountName}</p>
                {/* <p className="description">{data.otherInfo.description}</p> */}
                <p className="amount">{formatPrice(data.amount)}</p>
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
    createdAt: PropTypes.string,
    operationType: PropTypes.string,
    otherInfo: PropTypes.shape({
      otherAccountName: PropTypes.string,
      userLatitude: PropTypes.number,
      userLongitude: PropTypes.number,
    }),
  }).isRequired,
};
