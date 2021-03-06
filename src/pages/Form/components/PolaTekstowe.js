import React from 'react'

import { Input } from 'components'

import { RowWrapper } from '../styledComponents'

const PolaTekstowe = ({
  error,
  handleTextInputChange,
  tytulZadania,
  nazwaFunkcji,
  opisZadania,
  zlaNazwaFunkcji,
}) => (
  <RowWrapper>
    <Input
      name={'tytulZadania'}
      label='Tytuł zadania'
      placeholder='Wyszukiwanie liczb'
      value={tytulZadania}
      onChange={handleTextInputChange('tytulZadania')}
      error={error.types && error.types.some((elem) => elem === 'tytulZadania')}
      message='Nadaj zadaniu odpowiedni tytuł.'
      margin='0 0 10px 0'
      width='100%'
    />
    <Input
      name={'nazwaFunkcji'}
      label='Nazwa funkcji'
      value={nazwaFunkcji}
      onChange={handleTextInputChange('nazwaFunkcji')}
      error={
        (error.types && error.types.some((elem) => elem === 'nazwaFunkcji')) ||
        zlaNazwaFunkcji
      }
      message='Podaj nazwę funkcji, która ma zostać stworzona, np. ZnajdzLiczbe lub
               SzukajWTablicy. Uwaga: Nazwa nie może zawierać spacji, znaków specjalnych
               oraz zaczynać się od cyfry.'
      margin='0 0 10px 0'
      width='100%'
    />
    <Input
      name={'opisZadania'}
      textarea
      rows='6'
      label='Opis Zadania'
      value={opisZadania}
      onChange={handleTextInputChange('opisZadania')}
      error={error.types && error.types.some((elem) => elem === 'opisZadania')}
      message='Tu wpisz treść zadania, podając co najmniej nazwę funkcji do utworzenia,
               określając jej parametry i definiując jej wymagania np.: Stwórz funkcję int
               ZwrocPodwojona(int a). Funkcja zwraca podwojoną wartość liczby a.'
      margin='0 0 10px 0'
      width='100%'
    />
  </RowWrapper>
)

export default PolaTekstowe
