import React from 'react'

import { Tooltip, RoundedButton } from 'components'

import { RowWrapper } from '../styledComponents'

const AddRemoveButtons = ({ changeNumberOfResults, iloscWynikow }) => (
  <RowWrapper style={{ transform: 'translateX(-10px)', margin: '15px 0' }}>
    <Tooltip title={'Dodaj wiersz'} style={{ marginRight: '150px' }}>
      <RoundedButton onClick={changeNumberOfResults('+')}>+</RoundedButton>
    </Tooltip>
    <Tooltip title='Usuń wiersz'>
      <RoundedButton
        onClick={changeNumberOfResults('-')}
        disabled={iloscWynikow === 1}
      >
        -
      </RoundedButton>
    </Tooltip>
  </RowWrapper>
)

export default AddRemoveButtons
