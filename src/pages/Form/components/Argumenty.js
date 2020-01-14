import React from 'react'

import { SelectWrapper } from '../styledComponents'
import MySlider from './MySlider'
import SelectElem from './SelectElem'

const Argumenty = ({
  iloscArg,
  handleArgTypeChange,
  args,
  handleSliderChange
}) => (
  <>
    <MySlider
      handleSliderChange={handleSliderChange}
      iloscArg={iloscArg}
      max={5}
    />
    {Array.from(Array(iloscArg)).map((elem, i) => (
      <React.Fragment key={i}>
        <SelectWrapper last={i === iloscArg - 1}>
          <SelectElem
            i={i}
            handleArgTypeChange={handleArgTypeChange}
            args={args}
            argsName={'args'}
            secondColumn={false}
            values={['Typ prosty', 'Tablica []']}
            title={`Typ A argumentu ${i + 1}`}
          />
          <SelectElem
            i={i}
            handleArgTypeChange={handleArgTypeChange}
            args={args}
            argsName={'args'}
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
            title={`Typ B argumentu ${i + 1}`}
          />
        </SelectWrapper>
      </React.Fragment>
    ))}
  </>
)

export default Argumenty
