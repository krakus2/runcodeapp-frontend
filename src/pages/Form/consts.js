export const INITIAL_FORM_STATE = {
  imieINazwisko: '',
  nazwaFunkcji: '',
  tytulZadania: '',
  opisZadania: '',
  iloscArg: 1, //ile parametrów ma funkcja
  iloscWynikow: 1, //ile zestawów wartości do przeprowadzenia testu wysłał uzytkownik
  args: [...Array(2)], //typy parametrów funkcji np. string
  returnArgs: [...Array(2)], //typ zwracany przez funkcje np. string
  wyniki: [...Array(2)], //wartości, które posłużą do przeprowadzenia testu np. a = 2, b = 3 i wartość zwracana 6
  czyRekurencja: false, //czy w funkcji zachodzi rekurencja
  loading: false,
  error: {},
  indeksyTablic: [],
  code: ''
}
