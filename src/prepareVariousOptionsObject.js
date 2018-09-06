/**
* Возвращает все возможные часы старта для всех устройств c сум. стоимостью для каждого варианта.
* @param {array} goodStartHours - все возм. часы старта всех ус-тв и сум. rate каждого варианта.
* @param {object} inptFileContent - данные из входного файла.
* @returns {object} goodStartHours - возмож. часы старта ус-тв отсортированные по сум.стоимости.
*/
const prepareVariousOptionsObject = (goodStartHours, inputFileContent) => {
  const variousOptionsObject = {} // выходной объект

  // функция - получим мощность для каждого прибора
  const getPowers = () => {
    const powers = []
    inputFileContent.devices.forEach((elem) => {
      powers.push(elem.power)
    })
    return powers
  }


  const powers = getPowers()
  // наполним выходной объект
  goodStartHours.forEach((elem, index) => {
    const arr = []
    // мощность каждого устройства /1000, чтобы привести ее из Вт в кВт
    const devicePower = powers[index] / 1000
    Object.keys(elem).forEach((objKey) => {
      const obj = {}
      obj[objKey] = (elem[objKey] * devicePower).toFixed(4)
      arr.push(obj)
    })
    // сортируем объекты в массиве
    arr.sort((a, b) => a[Object.keys(a)] - b[Object.keys(b)])
    // отправляем массив в объект
    variousOptionsObject[index] = arr
  })
  return variousOptionsObject
}

export default prepareVariousOptionsObject
