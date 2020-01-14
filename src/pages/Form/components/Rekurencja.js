import React from 'react'

import { Switch } from 'components'

import { RowWrapper } from '../styledComponents'

const Rekurencja = ({ czyRekurencja, handleSwitchChange }) => (
  <RowWrapper column>
    <h3>Zadanie wymaga rozwiązania rekurencyjnego</h3>
    <Switch
      onChange={handleSwitchChange('czyRekurencja')}
      value={czyRekurencja}
    />
  </RowWrapper>
)

export default Rekurencja
