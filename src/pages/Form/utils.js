import { addAlphaChannel } from 'utils'
import { validateProfileInput } from 'utils/validators'

export const deleteSpaces = (text) => {
  let newText = Array.from(text)
  if (typeof text === 'string') {
    Array.from(text).forEach((elem, i) => {
      if (elem === ' ' && text[i + 1] === ' ') {
        newText[i] = ''
      } else {
        newText[i] = elem
      }
    })
  }
  return newText.join('')
}

export const createSelectColorStyles = ({ isMobile, theme }) => ({
  control: (styles) => ({ ...styles, cursor: 'pointer' }),
  option: (styles) => ({ ...styles, cursor: 'pointer' }),
  input: (styles) => ({
    ...styles,
    width: isMobile ? '100%' : '100%',
    minHeight: '35px',
    lineHeight: '35px',
    color: theme.highBlack,
    cursor: 'pointer',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: theme.lowBlack,
    cursor: 'pointer',
    fontSize: isMobile && '15px',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: theme.highBlack,
    cursor: 'pointer',
  }),
})

export const selectColorsResolver = ({ selectTheme, theme }) => ({
  ...selectTheme.colors,
  primary25: addAlphaChannel(theme.primaryColor, '0.2'),
  primary50: addAlphaChannel(theme.primaryColor, '0.5'),
  primary: theme.primaryColor,
  neutral20: theme.lowBlack,
  neutral30: theme.mediumBlack,
})

export const selectConditionalValueResolver = ({ secondColumn, args, i }) => {
  let conditionalValue
  if (secondColumn === true) {
    if (args[i * 2 + 1] === null || args[i * 2 + 1] === undefined) {
      conditionalValue = ''
    } else {
      conditionalValue = args[i * 2 + 1]
    }
  } else {
    if (args[i * 2] === null || args[i * 2] === undefined) {
      conditionalValue = ''
    } else {
      conditionalValue = args[i * 2]
    }
  }

  return conditionalValue
}

export const generateTestsGrid = (number) => {
  const array = []
  for (let i = 0; i < number; i++) {
    array.push('70px')
  }
  return array.join(' ')
}

export const generateTestsLabelAndName = ({ i, iloscArg }) => {
  const object = {}
  if (i === 0 && iloscArg === 0) {
    object.label = 'Wynik'
    object.name = `Wynik${i}`
  } else if ((i + 1) % (iloscArg + 1) === 0 && i !== 0) {
    object.label = 'Wynik'
    object.name = `Wynik${i}`
  } else {
    object.label = `Arg ${(i % (iloscArg + 1)) + 1}`
    object.name = `Arg ${(i % (iloscArg + 1)) + 1} ${i}`
  }
  return object
}

export const makeValidation = (data) => {
  const { errors, isValid } = validateProfileInput(data)
  if (!isValid) {
    throw errors
  }
}

export const formatErrorMessages = (err) => {
  const error = {}
  if (typeof err === 'string') {
    error.messages = [err]
  } else {
    error.messages = [...Object.values(err)]
    error.types = [...Object.keys(err)]
  }

  return error
}
