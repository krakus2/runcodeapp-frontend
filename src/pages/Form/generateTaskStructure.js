const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n)

const escapeRegExp = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')

const replaceAll = (str, find, replaceArg) =>
  str.replace(new RegExp(escapeRegExp(find), 'g'), replaceArg)

const zmienNazwyTypow = (typ) => {
  let returnType = typ
  if (returnType === 'long') returnType = 'int64'
  if (returnType === 'int') returnType = 'int32'
  if (returnType === 'short') returnType = 'int16'
  if (returnType === 'byte') returnType = 'uInt8'
  if (returnType === 'bool') returnType = 'boolean'
  return 'System.' + returnType.charAt(0).toUpperCase() + returnType.slice(1)
}

const returnValue = (value) => {
  if (typeof value !== 'string') return ''
  if (isNumeric(value)) {
    return Number(value)
  } else {
    return replaceAll(value, '"', '').trim()
  }
}

// prettier-ignore
//TODO - ta funkcja powinna sprawdzac, czy wszystkie elementy tablicy sa takiego samego typu
const returnArrayValue = value => {
  if (typeof value !== 'string' || value.length === 0) return [];
  return value.split(',').map(elem => {
     if (isNumeric(elem)) {
        return Number(elem);
     } else {
        return replaceAll(elem, '\"', '').trim();
     }
  });
};

export const generateTaskStructure = (task) => {
  const filteredResults = task.wyniki.filter(
    (_, i) => (i + 1) % (task.iloscArg + 1)
  )

  const finalResult = {}
  finalResult.title = task.tytulZadania
  finalResult.description = task.opisZadania
  finalResult.code = task.code
  finalResult.tests = []

  for (let i = 0; i < task.iloscWynikow; i++) {
    let result = {}
    result.MethodName = task.nazwaFunkcji
    result.Parameters = []

    for (let j = 0; j < task.iloscArg; j++) {
      const paramObject = {}
      paramObject.TypeName =
        task.args[j * 2] === 'Typ prosty'
          ? `${zmienNazwyTypow(task.args[j * 2 + 1])}`
          : `${zmienNazwyTypow(task.args[j * 2 + 1])}[]`
      paramObject.Value =
        task.args[j * 2] === 'Typ prosty'
          ? returnValue(filteredResults[i * task.iloscArg + j])
          : returnArrayValue(filteredResults[i * task.iloscArg + j])
      result.Parameters.push(paramObject)
    }
    result.ResultTypeName =
      task.returnArgs[0] === 'Typ prosty'
        ? `${zmienNazwyTypow(task.returnArgs[1])}`
        : `${zmienNazwyTypow(task.returnArgs[1])}[]`

    result.ExpectedResult =
      task.returnArgs[0] === 'Typ prosty'
        ? returnValue(task.wyniki[(task.iloscArg + 1) * (i + 1) - 1])
        : returnArrayValue(task.wyniki[(task.iloscArg + 1) * (i + 1) - 1])
    if (task.czyRekurencja) {
      result.CodeChecks = ['RecursionCheck']
    }
    finalResult.tests.push(result)
  }

  return finalResult
}

export default generateTaskStructure
