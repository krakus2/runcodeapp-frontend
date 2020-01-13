import React from 'react'
import { Context } from './index'

export default Component => props => (
  <Context.Consumer>
    {context => <Component {...props} {...context} />}
  </Context.Consumer>
)
