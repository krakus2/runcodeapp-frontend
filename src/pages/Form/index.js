import React, { Component } from 'react'
import axios from 'axios'

import { withContext } from 'hocs'

import {
  PolaTekstowe,
  Argumenty,
  TypZwracany,
  SubmitButton,
  StrukturaFunkcji,
  Testy,
  Editor,
  Rekurencja,
  SubmitMessage,
} from './components'
import { Form, MyPaper, Wrapper } from './styledComponents'
import { INITIAL_FORM_STATE } from './consts'
import { makeValidation, formatErrorMessages } from './utils'
import generateTaskStructure from './generateTaskStructure'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_FORM_STATE }

    this.onSubmit = this.onSubmit.bind(this)
  }

  stopReload = (e) => {
    const { nazwaFunkcji, tytulZadania, opisZadania, code } = this.state
    if (nazwaFunkcji || tytulZadania || opisZadania || code) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  componentDidMount() {
    //protection against unwanted site reload, while form is filled with values
    window.addEventListener('beforeunload', this.stopReload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.stopReload)
  }

  onEditorChange = (newValue) => {
    this.setState({ code: newValue })
  }

  async onSubmit(e) {
    e.preventDefault()
    const {
      nazwaFunkcji,
      tytulZadania,
      opisZadania,
      iloscArg,
      iloscWynikow,
      args,
      returnArgs,
      wyniki,
      czyRekurencja,
      code,
    } = this.state

    const values = {
      nazwaFunkcji,
      tytulZadania,
      opisZadania,
      iloscArg,
      iloscWynikow,
      args,
      returnArgs,
      code,
      wyniki,
      czyRekurencja,
    }

    try {
      makeValidation(values)
      const data = generateTaskStructure(values)
      const { host, port = '' } = window.options.server

      await axios.post(`${host}${port}/api/task`, data)

      this.setState(
        {
          /*  ...INITIAL_FORM_STATE, */
          loading: false,
          postSuccess: true,
        },
        () =>
          setTimeout(() => {
            this.setState({ postSuccess: false })
          }, 5000)
      )
    } catch (err) {
      const errorMessages = formatErrorMessages(err)
      this.setState({ loading: false, error: errorMessages })
    }
  }

  handleTextInputChange = (name) => (event) => {
    if (name !== 'nazwaFunkcji') {
      this.setState({ [name]: event.target.value })
    } else {
      const regex = /^[a-z]/gi
      const regex2 = /[^a-z0-9]+/gi
      if (event.target.value.length === 0) {
        return this.setState({
          [name]: event.target.value,
          zlaNazwaFunkcji: false,
        })
      } else if (event.target.value.length === 1) {
        if (!regex.test(event.target.value)) {
          return this.setState({
            [name]: event.target.value,
            zlaNazwaFunkcji: true,
          })
        } else {
          return this.setState({
            [name]: event.target.value,
            zlaNazwaFunkcji: false,
          })
        }
      } else {
        if (
          regex2.test(event.target.value) ||
          !regex.test(event.target.value)
        ) {
          return this.setState({
            [name]: event.target.value,
            zlaNazwaFunkcji: true,
          })
        } else {
          return this.setState({
            [name]: event.target.value,
            zlaNazwaFunkcji: false,
          })
        }
      }
    }
  }

  handleSliderChange = (value) => {
    let args = [...this.state.args]
    const { iloscWynikow } = this.state
    const x = (value + 1) * iloscWynikow
    if (args.length === 0) {
      args = [...Array(value * 2)]
    }
    if (args.length < value * 2) {
      args = [...args, ...Array(value * 2 - args.length)]
    }
    this.setState(
      {
        iloscArg: value,
        args,
        wyniki: [...Array.from(Array(x))],
      },
      () => {
        const indeksyTablic = this.calculateArrayIndexes()
        this.setState({ indeksyTablic })
      }
    )
  }

  handleSwitchChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked })
  }

  handleArgTypeChange = (i) => (j) => (arrayName) => (valueObject) => {
    let args = [...this.state[arrayName]]
    args[i * 2 + j] = valueObject === null ? valueObject : valueObject.value

    this.setState({ [arrayName]: args }, () => {
      const indeksyTablic = this.calculateArrayIndexes()
      this.setState({ indeksyTablic })
    })
  }

  calculateArrayIndexes = () => {
    let args = [...this.state.args]
    let returnArgs = [...this.state.returnArgs]
    const { iloscArg, iloscWynikow } = this.state
    const indeksyTablic = []

    args.forEach((elem, i) => {
      if (elem === 'Tablica []') indeksyTablic.push(i / 2)
    })
    for (let i = 0; i < iloscWynikow - 1; i++) {
      indeksyTablic.forEach((elem, j) => {
        indeksyTablic.push(elem + iloscArg + 1)
      })
    }

    if (returnArgs[0] === 'Tablica []') {
      for (let i = 0; i < iloscWynikow; i++) {
        indeksyTablic.push((i + 1) * (iloscArg + 1) - 1)
      }
    }

    return indeksyTablic
  }

  handleWynikiChange = (i) => (event) => {
    const wyniki = [...this.state.wyniki]
    wyniki[i] = event.target.value
    this.setState({ wyniki })
  }

  changeNumberOfResults = (znak) => () => {
    const { iloscWynikow, iloscArg } = this.state
    const wyniki = [...this.state.wyniki]
    if (znak === '+') {
      this.setState(
        {
          iloscWynikow: iloscWynikow + 1,
          wyniki: [...wyniki, ...Array.from(Array(iloscArg + 1))],
        },
        () => {
          const indeksyTablic = this.calculateArrayIndexes()
          this.setState({ indeksyTablic })
        }
      )
    } else if (znak === '-' && iloscWynikow !== 1) {
      const ucieteWyniki = []
      for (let i = 0; i < (iloscArg + 1) * (iloscWynikow - 1); i++) {
        ucieteWyniki.push(wyniki[i])
      }
      this.setState(
        { iloscWynikow: iloscWynikow - 1, wyniki: ucieteWyniki },
        () => {
          const indeksyTablic = this.calculateArrayIndexes()
          this.setState({ indeksyTablic })
        }
      )
    }
  }

  generateFunctionStructure = () => {
    const { nazwaFunkcji, args, returnArgs, iloscArg } = this.state
    const args2 = []
    if (iloscArg === 0) {
      args2.push('')
    } else {
      for (let i = 0; i < iloscArg * 2 - 1; i = i + 2) {
        if (args[i] === 'Tablica []') {
          args2.push(`${args[i + 1]}[] Arg${i / 2 + 1}`)
        } else {
          args2.push(`${args[i + 1]} arg${i / 2 + 1}`)
        }
      }
    }

    let returnArgs2 =
      returnArgs[0] === 'Tablica []'
        ? `${returnArgs[1]}[] ${nazwaFunkcji}`
        : `${returnArgs[1]} ${nazwaFunkcji}`

    return `${returnArgs2}(${args2.join(', ')})`
  }

  onSubmitClick = () => {
    this.setState({ loading: true, error: {} })
  }

  isEmpty = (array, isArgsChecking) => {
    const { iloscArg } = this.state
    let result = false
    array.forEach((elem, i) => {
      if (
        (elem === undefined || elem === '' || elem === null) &&
        (!isArgsChecking || i <= iloscArg * 2 - 1)
      )
        result = true
    })
    return result
  }

  render() {
    const { classes, isMobile } = this.props
    const {
      nazwaFunkcji,
      zlaNazwaFunkcji,
      tytulZadania,
      opisZadania,
      iloscArg,
      iloscWynikow,
      args,
      returnArgs,
      wyniki,
      czyRekurencja,
      loading,
      error,
      postSuccess,
      indeksyTablic,
      code,
    } = this.state

    const argsCheck =
      (this.isEmpty(args, true) && iloscArg !== 0) ||
      this.isEmpty(returnArgs) ||
      this.isEmpty(wyniki)

    const isInvalid =
      opisZadania === '' ||
      tytulZadania === '' ||
      nazwaFunkcji === '' ||
      code === '' ||
      argsCheck ||
      zlaNazwaFunkcji

    return (
      <Wrapper>
        <MyPaper isMobile={isMobile}>
          <Form onSubmit={this.onSubmit}>
            <PolaTekstowe
              {...{
                classes,
                error,
                tytulZadania,
                nazwaFunkcji,
                opisZadania,
                zlaNazwaFunkcji,
              }}
              handleTextInputChange={this.handleTextInputChange}
            />
            <Argumenty
              {...{ iloscArg, args }}
              handleArgTypeChange={this.handleArgTypeChange}
              handleSliderChange={this.handleSliderChange}
            />
            <TypZwracany
              returnArgs={returnArgs}
              handleArgTypeChange={this.handleArgTypeChange}
            />
            <StrukturaFunkcji
              {...{ nazwaFunkcji, returnArgs, iloscArg, args }}
              isEmpty={this.isEmpty}
              generateFunctionStructure={this.generateFunctionStructure}
            />
            <Editor code={code} onEditorChange={this.onEditorChange} />
            <Testy
              handleWynikiChange={this.handleWynikiChange}
              changeNumberOfResults={this.changeNumberOfResults}
              {...{ iloscWynikow, iloscArg, wyniki, indeksyTablic }}
            />
            <Rekurencja
              czyRekurencja={czyRekurencja}
              handleSwitchChange={this.handleSwitchChange}
            />
            <SubmitButton
              {...{ isInvalid, loading }}
              onSubmitClick={this.onSubmitClick}
            />
          </Form>
          <SubmitMessage {...{ error, postSuccess, isMobile }} />
        </MyPaper>
      </Wrapper>
    )
  }
}

export default withContext(Landing)
