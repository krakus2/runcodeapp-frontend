import React from 'react'

import { SelectWrapper, RowWrapper } from '../styledComponents'
import SelectElem from './SelectElem'

const TypZwracany = ({ handleArgTypeChange, returnArgs }) => (
  <>
    <RowWrapper>
      <h3>Typ zwracany</h3>
    </RowWrapper>
    <SelectWrapper>
      <SelectElem
        i={0}
        handleArgTypeChange={handleArgTypeChange}
        args={returnArgs}
        argsName={'returnArgs'}
        secondColumn={false}
        values={['Typ prosty', 'Tablica []']}
        title={`Typ zwracany A`}
      />
      <SelectElem
        i={0}
        handleArgTypeChange={handleArgTypeChange}
        args={returnArgs}
        argsName={'returnArgs'}
        secondColumn={true}
        values={[
          'int',
          'double',
          'float',
          'decimal',
          'long',
          'short',
          'string',
          'char',
          'bool',
          'byte'
        ]}
        title={`Typ zwracany B`}
      />
    </SelectWrapper>
  </>
)

export default TypZwracany
