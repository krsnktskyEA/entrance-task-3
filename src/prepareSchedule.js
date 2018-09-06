/**
* Подготаввливает расписание
* @param {object} variousOptionsObject - возможные варианты времени старта устройства и соотв. цена.
* @param {object} inputFileContent - входные данные.
* @param {object} allowedAreasObject - часы работы (0-23) с отмеченными зонами allow/deny.
* @returns {array} result - [0] - объект с данными о часе старта каждого уст-ва и др. инфой.
  [1] - сверстанное почасовое расписание работы с отмеченными зонами allow/deny.
*/
const prepareSchedule = (variousOptionsObject, inputFileContent, allowedAreasObject) => {
  // входные параметры
  const devicesQty = [] // кол-во устройств
  const devicesQty2 = [] // кол-во устройств
  const powers = [] // мощности
  const durations = [] // периоды работы
  const names = [] // наименования
  const ids = [] // id-шники

  // получим максимально допустимую мощность
  const maxPowerAllowed = inputFileContent.maxPower

  // получим кол-во приборов из входного файла и др. параметры
  const getInputParams = () => {
    inputFileContent.devices.forEach((elem) => {
      devicesQty.push(0)
      devicesQty2.push(0)
      powers.push(elem.power)
      durations.push(elem.duration)
      names.push(elem.name)
      ids.push(elem.id)
    })
  }

  /**
  * Проверяет чтобы при выбранных часах старта нигде не превышалось maxPower
  * @param {array} startPeriod - объект с данными о часе старта и др. инфой для powerChecker().
  * ex строки: i(устройство): [j(час), p(мощность), d(duration), s(сум. сут. стоимсоть работы), ...]
  * @param {object} allowedAreasObjectParam - часы работы (0-23) с отмеченными зонами allow/deny.
  * @returns {array} result - [0] - true/false - валиден ли выбранный период работы устройств.
  * [1] - новый вариант расписания (если предыдущий не прошел проверку на maxPower)
  */
  const powerChecker = (startPeriod, allowedAreasObjectParam) => {
    let allowedAreasObjectInner = JSON.parse(JSON.stringify(allowedAreasObjectParam))

    /**
    * Записывает значение мощности данного устройства в данный час в allowedAreasObjectInner.
    * @param {number} device - номер устройства.
    */
    const writePowerValue = (device) => {
      let lastHour
      let nextDayHour

      if (startPeriod[device][0] + startPeriod[device][2] <= 23) {
        lastHour = startPeriod[device][0] + startPeriod[device][2]
        for (let hour = startPeriod[device][0]; hour < lastHour; hour += 1) {
          allowedAreasObjectInner[hour][device] = startPeriod[device][1]
        }
      } else {
        lastHour = 23
        nextDayHour = startPeriod[device][0] + startPeriod[device][2] - 25
        for (let hour = startPeriod[device][0]; hour <= lastHour; hour += 1) {
          allowedAreasObjectInner[hour][device] = startPeriod[device][1]
        }
        for (let hour = 0; hour <= nextDayHour; hour += 1) {
          allowedAreasObjectInner[hour][device] = startPeriod[device][1]
        }
      }
    }

    const powerByHours = [] // суммарная мощость для каждого часа

    // отформатируем allowedAreasObject удалив из него все лишнее
    Object.keys(allowedAreasObjectInner).forEach((objKey) => {
      allowedAreasObjectInner[objKey].splice(0, 3)
    })

    // заполним allowedAreasObjectInner значениями мощности
    Object.keys(startPeriod).forEach((device) => {
      writePowerValue(device)
    })

    // Вычисляем суммарное суточное потребление для каждого часа старта
    Object.keys(allowedAreasObjectInner).forEach((hour) => {
      const objectInnerFiltered = allowedAreasObjectInner[hour].filter(i => typeof (i) === 'number')
      const sumPower = objectInnerFiltered.reduce((total, num) => total + num)
      powerByHours.push(sumPower)
    })

    const periodValidity = powerByHours.every(power => power <= maxPowerAllowed)
    const result = [periodValidity, allowedAreasObjectInner]

    return result
  }

  /**
  * Возвращает индексы самых дешевых часов старта
  * @returns {object} cheapestHours - объект содержит индексы самых дешевых часов старта.
  */
  const getCheapestStartHours = () => {
    const cheapestHours = {}
    Object.keys(variousOptionsObject).forEach((key) => {
      const minPrice = variousOptionsObject[key][0][Object.keys(variousOptionsObject[key][0])]
      const newHoursForDevice = []
      variousOptionsObject[key].forEach((elem, index) => {
        if (elem[Object.keys(elem)] === minPrice) {
          newHoursForDevice.push(index)
          cheapestHours[key] = newHoursForDevice
        }
      })
    })
    return cheapestHours
  }

  let deviceNumber = 0 // текущий номер устройства
  let startHourCase = 0 // индекс часа старта для устройства
  let alterStartegy = false // альтернативная стратегия подбора новых часов старта
  /**
  * Подбирает новые часы (индексы) запуска для всех устройств из (variousOptionsObject)
  * @param {object} cheapestStartHours  - объект с индексами самых дешевых часов старта.
  * @returns {array} newPeriod - массив из следующих индексов начальных часов.
  */
  const newPeriodGiver = (cheapestStartHours) => {
    const newPeriod = alterStartegy ? devicesQty2 : devicesQty

    if (startHourCase >= cheapestStartHours[deviceNumber].length) {
      deviceNumber += 1
      startHourCase = 0
      if (alterStartegy === true) {
        newPeriod[deviceNumber - 1] = 0
      }
    }

    if (deviceNumber <= devicesQty.length - 1) {
      newPeriod[deviceNumber] = cheapestStartHours[deviceNumber][startHourCase]
    } else if (alterStartegy === false) {
      alterStartegy = true
      deviceNumber = 0
      startHourCase = 0
    } else if (alterStartegy === true) {
      console.log('                                                                   ')
      console.log(' --- Похоже это слишком сложная задача... Я старался как мог... ---')
      console.log('                                                                   ')
    }

    startHourCase += 1
    console.log('newPeriod=', newPeriod)
    return newPeriod
  }

  /**
  * Принимает массив из цифр длинной = количеству устройств.
    Формирует объект с данными о часах старта и др. инфой для передачи в powerChecker()
  * @param {array} nextStartHours - индексы часов старта. На первой итерации каждый индекс = 0.
  * @returns {object} startPeriod - объект с данными о часе старта и др. инфой для powerChecker().
  * ex строки: i(устройство): [j(час), p(мощность), d(duration), s(сум. сут. стоимсоть работы), ...]
  */
  const newPeriodTaker = (nextStartHours) => {
    const startPeriod = {}
    Object.keys(variousOptionsObject).forEach((objKey) => {
      const arr = []

      const thisDeviceStartHour = nextStartHours[objKey]
      const thisDeviceStartVariant = variousOptionsObject[objKey][thisDeviceStartHour]

      const newStartHour = Number(Object.keys(thisDeviceStartVariant))
      const newSumRate = Number(thisDeviceStartVariant[Object.keys(thisDeviceStartVariant)])


      arr.push(newStartHour)
      arr.push(powers[objKey])
      arr.push(durations[objKey])
      arr.push(newSumRate)
      arr.push(names[objKey])
      arr.push(ids[objKey])
      startPeriod[objKey] = arr
    })
    return startPeriod
  }


  getInputParams() // читаем входные параметры и структурируем их в удомном формате

  let periodIsValid = [false, {}] // до первого вызова powerChecker()
  let nextStartHours = devicesQty2 // индексы часов старта каждого уст-ва - изначально [0, 0, ...]

  let startPeriod = newPeriodTaker(nextStartHours) // объект для передачи в powerChecker()
  periodIsValid = powerChecker(startPeriod, allowedAreasObject) // проверка на непревышение maxPower


  // обрабатываем случай если periodIsValid = false
  const cheapestStartHours = getCheapestStartHours()
  while (periodIsValid[0] === false) {
    nextStartHours = newPeriodGiver(cheapestStartHours) // Формирует след. массив индексов нач.часов
    startPeriod = newPeriodTaker(nextStartHours) // следующий объект для передачи в powerChecker()
    periodIsValid = powerChecker(startPeriod, allowedAreasObject) // проверка на maxPower
  }

  // возвращаем результат
  const result = []
  result[0] = startPeriod
  result[1] = periodIsValid[1]

  return result
}

export default prepareSchedule
