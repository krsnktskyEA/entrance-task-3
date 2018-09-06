import fs from 'fs'
import stringify from 'json-stringify-pretty-compact'

/**
 * Возвращает объект, содержащий данные из входного файла.
 * @returns {object} - объект, содержащий данные из входного файла.
 */
export const readInput = () => {
  const inputData = fs.readFileSync('./data/input.json', 'utf8', (error) => {
    if (error) throw error
  })
  console.log('OK__Input file has been parsed!')
  return JSON.parse(inputData)
}


/**
 * Записывает принимаемый объект в выходной файл.
 * @param {object} outputData - объект, содержащий данные для записи в выходной файл.
 */
export const writeOutput = (outputData) => {
  fs.writeFile('./data/output.json', stringify(outputData, { maxLength: 200 }), (error) => {
    if (error) throw error
    console.log('OK__Output file has been saved!')
  })
}
