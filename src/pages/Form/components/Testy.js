import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Tooltip, Input } from 'components'
import { Context } from 'context'

import { GridWrapper, RowWrapper } from '../styledComponents'
import AddRemoveButtons from './AddRemoveButtons'

import { generateTestsLabelAndName, generateTestsGrid } from '../utils'

const ArrayMarkers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    position: absolute;
    content: '[';
    font-size: 37px;
    left: -11px;
    top: 12px;
  }

  &::after {
    position: absolute;
    font-size: 37px;
    content: ']';
    left: 71px;
    top: 12px;
  }
`

const Testy = ({
  handleWynikiChange,
  changeNumberOfResults,
  iloscWynikow,
  iloscArg,
  wyniki,
  indeksyTablic,
  context
}) => {
  const { isMobile } = useContext(Context)
  const fieldsArray = []

  for (var i = 0; i < iloscWynikow * (iloscArg + 1); i++) {
    if (indeksyTablic.some(el => el === i)) {
      fieldsArray.push(
        <Tooltip key={i} title='Wartości tablicy oddziel przecinkami'>
          <ArrayMarkers key={i}>
            <Input
              {...generateTestsLabelAndName({ i, iloscArg })}
              value={wyniki[i] !== undefined ? wyniki[i] : ''}
              onChange={handleWynikiChange(i)}
              small
              centerLabel
              width='100%'
            />
          </ArrayMarkers>
        </Tooltip>
      )
    } else {
      fieldsArray.push(
        <div key={i}>
          <Input
            {...generateTestsLabelAndName({ i, iloscArg })}
            value={wyniki[i] !== undefined ? wyniki[i] : ''}
            onChange={handleWynikiChange(i)}
            small
            centerLabel
            width='100%'
          />
        </div>
      )
    }
  }

  return (
    <>
      <RowWrapper column>
        <h3>Zestawy testów i wartość zwracana</h3>
        <p>
          Zdefiniuj testy. Podaj wartości parametrów wywołania funkcji oraz
          wartość zwracaną przez funkcję dla tych parametrów.
        </p>
      </RowWrapper>
      <GridWrapper isMobile={isMobile} grid={generateTestsGrid(iloscArg + 1)}>
        {fieldsArray}
      </GridWrapper>
      <AddRemoveButtons
        changeNumberOfResults={changeNumberOfResults}
        iloscWynikow={iloscWynikow}
      />
    </>
  )
}

Testy.propTypes = {
  handleWynikiChange: PropTypes.func.isRequired,
  iloscWynikow: PropTypes.number.isRequired,
  iloscArg: PropTypes.number.isRequired,
  wyniki: PropTypes.array.isRequired
}

export default Testy
