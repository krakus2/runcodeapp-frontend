import React from 'react'
import { withTheme } from 'styled-components'

import { InlineMessage } from 'components'

const SubmitMessage = ({ error, postSuccess, theme }) => (
  <>
    {!!Object.keys(error).length && (
      <InlineMessage
        isError={true}
        text={`Something went wrong. Try again. Message: \n${error.messages &&
          error.messages.join('\n')}`}
        bigMargin
        textAlign='center'
      />
    )}
    {!!postSuccess && (
      <InlineMessage
        isError={false}
        text={'Zadanie dodano do bazy'}
        textAlign='center'
        fontSize={20}
        bigMargin
        bold
        color={theme.primaryColor}
      />
    )}
  </>
)

export default withTheme(SubmitMessage)
