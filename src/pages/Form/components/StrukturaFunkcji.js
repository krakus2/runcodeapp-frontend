import React from 'react'

import { RowWrapper, Span } from '../styledComponents'

const StrukturaFunkcji = ({
  nazwaFunkcji,
  returnArgs,
  iloscArg,
  isEmpty,
  generateFunctionStructure,
  args,
}) => (
  <>
    <RowWrapper>
      <h3>Struktura funkcji</h3>
    </RowWrapper>
    <RowWrapper>
      <h4 style={{ margin: 0, fontWeight: 400, fontSize: '17px' }}>
        {nazwaFunkcji.length === 0 ||
        (isEmpty(args, true) && iloscArg !== 0) ||
        isEmpty(returnArgs) ? (
          'int NazwaFunkcji(int A) - przykładowa nazwa - wypełnij wszystkie pola, aby wygenerować swoją'
        ) : (
          <Span>{generateFunctionStructure()}</Span>
        )}
      </h4>
    </RowWrapper>
  </>
)

export default StrukturaFunkcji
