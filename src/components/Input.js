import React from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'

import InlineMessage from './InlineMessage'

const InputStyles = styled.div`
  margin: ${props => props.margin};
  width: ${props => props.width && props.width};
  :hover {
    cursor: text;
  }
  label {
    width: 100%;
    display: ${props => (props.label ? 'block' : 'none')};
    font-size: ${props => (props.small ? '13px' : '15px')};
    ${props => props.centerLabel && 'text-align: center'};
    color: ${props =>
      props.error ? props.theme.errorColor : props.theme.highLowerBlack};
    font-weight: 500;
    :hover {
      cursor: text;
    }
  }
  .myInput {
    margin: ${props => (props.small ? '2px 0' : '10px 0')};
    color: ${props => props.theme.highBlack};
    display: block;
    position: relative;
    border: 1px solid
      ${props => (props.error ? props.theme.errorColor : props.theme.lowBlack)};
    border-radius: 4px;
    width: 100%;
    ${props =>
      !props.textarea && (props.small ? 'height: 35px' : 'height: 50px')};
    ${props =>
      !props.textarea &&
      (props.small ? 'line-height: 35px' : 'line-height: 55px')};
    font-size: ${props => (props.small ? '14px' : '18px')};
    padding: ${props => (!props.textarea ? '5px 8px' : '10px 8px')};
    font-feature-settings: 'tnum';
    transition: border 0.3s ease, box-shadow 0.2s ease;
    outline: none;
    box-sizing: border-box;
    ::placeholder {
      color: ${props => props.theme.lowBlack};
    }
    :hover {
      border: 1px solid
        ${props =>
          props.error ? props.theme.errorColor : props.theme.mediumBlack};
    }
    :focus {
      border: 1px solid
        ${props =>
          props.error ? props.theme.errorColor : props.theme.primaryColor};
      box-shadow: inset 0px 0px 0px 1px
        ${props =>
          props.error ? props.theme.errorColor : props.theme.primaryColor};
    }
  }

  .myTextarea {
    resize: none;
  }
  .myInput:disabled {
    background-color: ${props => props.theme.lowestBlack};
    border: 1px solid ${props => props.theme.lowBlack};
  }
`

class Input extends React.Component {
  constructor() {
    super()
    this.myRef = React.createRef()
    this.focus = this.focus.bind(this)
  }
  static defaultProps = {
    type: 'text',
    message: '',
    placeholder: '',
    error: false,
    disabled: false,
    textarea: false,
    small: false,
    rows: '4',
    label: '',
    centerLabel: false,
    margin: '0'
  }
  static propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.string,
    error: PropTypes.bool,
    small: PropTypes.bool,
    disabled: PropTypes.bool,
    textarea: PropTypes.bool,
    centerLabel: PropTypes.bool,
    label: PropTypes.string,
    width: PropTypes.string,
    margin: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }

  focus() {
    this.myRef.current.focus()
  }

  render() {
    const {
      type,
      value,
      small,
      onChange,
      name,
      placeholder,
      label,
      message,
      error,
      disabled,
      textarea,
      rows,
      width,
      centerLabel,
      margin,
      theme
    } = this.props

    const commonProps = { type, value, onChange, name, placeholder, disabled }
    return (
      <InputStyles
        onClick={this.focus}
        {...{ error, label, small, textarea, width, centerLabel, margin }}
      >
        <label htmlFor={name}>{label}</label>
        {!textarea ? (
          <input
            className='myInput'
            ref={this.myRef}
            id={name}
            {...commonProps}
          />
        ) : (
          <textarea
            className='myInput myTextarea'
            id={name}
            ref={this.myRef}
            {...commonProps}
            {...{ rows }}
          />
        )}

        {!!message && (
          <InlineMessage
            text={message}
            isError={error}
            fontSize={14}
            color={theme.mediumLowerBlack}
          />
        )}
      </InputStyles>
    )
  }
}

export default withTheme(Input)
