/**
* Возвращает объект содержащий заготовку для расписания.
* @param {object} inptFileContent - данные из входного файла.
* @returns {object} prepareScheduleObject - объект-заготовка для расписания.
* Пример строки: i(час): [i(час), mode(день/ночь), rate(тариф), <Тут будут наименования приборов>]
*/
const prepareScheduleObject = (inptFileContent) => {
  const scheduleObject = {} // объект который вернем

  /**
  * Определяет период перехода через сутки.
  * @returns {number} latestPeriodIndex - индекс элемента массива "rates" из input.json.
  */
  const getLatestPeriodIndex = () => {
    let maxHour = inptFileContent.rates[0].from
    let minHour = inptFileContent.rates[0].to
    let latestPeriodIndex

    inptFileContent.rates.forEach((elem, index) => {
      if (elem.from > maxHour && elem.to < minHour) {
        maxHour = elem.from
        minHour = elem.to
        latestPeriodIndex = index
      }
    })
    return latestPeriodIndex
  }


  const latestPeriodIndex = getLatestPeriodIndex()


  /**
   * Возвращает тариф (rate) в зависимости от часа.
   * @param {number} hour - значение часа
   * @returns {number} currentRateOutput - тариф соответствующий часу.
   */
  const getRate = (hour) => {
    let currentRate

    inptFileContent.rates.forEach((elem) => {
      if (hour >= elem.from && hour < elem.to) {
        currentRate = elem.value
      }
    })

    const currentRateOutput = currentRate || inptFileContent.rates[latestPeriodIndex].value
    return currentRateOutput
  }

  for (let i = 0; i <= 23; i += 1) {
    const mode = (i >= 7 && i < 21) ? 'day' : 'night'
    const rate = getRate(i)
    scheduleObject[i] = [i, mode, rate]
  }
  return scheduleObject
}

export default prepareScheduleObject
