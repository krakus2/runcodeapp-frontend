import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Tooltip, Button } from 'components'
import { Context } from 'context'

import { ButtonWrapper } from '../styledComponents'

const Submit = ({ isInvalid, loading, onSubmitClick }) => {
  const { isMobile } = useContext(Context)

  return (
    <ButtonWrapper isMobile={isMobile}>
      {isInvalid ? (
        <Tooltip
          title={`Wypełnij wszystkie obowiązkowe pola, aby przesłać zadanie`}
        >
          <div>
            <Button
              type='submit'
              onClick={onSubmitClick}
              disabled
              {...(isMobile && { height: '44px', fontSize: '18px' })}
            >
              {loading ? (
                <div className='lds-ring'>
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              ) : (
                'Prześlij'
              )}
            </Button>
          </div>
        </Tooltip>
      ) : (
        <Button
          type='submit'
          onClick={onSubmitClick}
          {...(isMobile && { height: '44px', fontSize: '18px' })}
        >
          {loading ? (
            <div className='lds-ring'>
              <div />
              <div />
              <div />
              <div />
            </div>
          ) : (
            'Prześlij'
          )}
        </Button>
      )}
    </ButtonWrapper>
  )
}
Submit.propTypes = {
  isInvalid: PropTypes.bool.isRequired
}

export default Submit
