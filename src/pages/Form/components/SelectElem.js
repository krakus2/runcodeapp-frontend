import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import Select from 'react-select'

import { Context } from 'context'

import {
  createSelectColorStyles,
  selectConditionalValueResolver,
  selectColorsResolver
} from '../utils'

const SelectElem = ({
  theme,
  i,
  handleArgTypeChange,
  argsName,
  secondColumn,
  values,
  title,
  args
}) => {
  const { isMobile } = useContext(Context)

  const colourStyles = createSelectColorStyles({ isMobile, theme })
  const conditionalValue = selectConditionalValueResolver({
    secondColumn,
    args,
    i
  })

  const selectValue = {
    value: conditionalValue !== '' &&
      conditionalValue !== null && {
        value: conditionalValue,
        label: conditionalValue
      }
  }

  return (
    <Select
      label={title}
      placeholder={title}
      options={values.map(elem => ({ value: elem, label: elem }))}
      styles={colourStyles}
      theme={selectTheme => ({
        ...selectTheme,
        colors: {
          ...selectColorsResolver({ selectTheme, theme })
        }
      })}
      onChange={handleArgTypeChange(i)(secondColumn === true ? 1 : 0)(argsName)}
      isClearable
      {...selectValue}
    />
  )
}

SelectElem.propTypes = {
  i: PropTypes.number.isRequired,
  handleArgTypeChange: PropTypes.func.isRequired,
  argsName: PropTypes.string.isRequired,
  secondColumn: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default withTheme(SelectElem)
