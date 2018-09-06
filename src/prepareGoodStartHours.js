/**
* Возвращает все возможные часы старта для всех устройств и суммарный rate для каждого варианта.
* @param {object} allowedAreasObject - часы работы (0-23) с отмеченными зонами allow/deny.
* @param {object} inptFileContent - данные из входного файла.
* @returns {array} goodStartHours - все возм. часы старта всех ус-тв и сум. rate каждого варианта.
*/
const prepareGoodStartHours = (allowedAreasObject, inputFileContent) => {
  // функция - получим время работы в часах для каждого прибора
  const getDurations = () => {
    const durations = []
    inputFileContent.devices.forEach((elem) => {
      durations.push(elem.duration)
    })
    return durations
  }

  // проверяет возможность работы прибора в период длительностью duration, начиная с заданного часа
  // и рассчитывает суммарный rate.
  const periodChecker = (strokeNumber, duration, deviceNumber) => {
    const arr = []
    const arr2 = []
    let result
    let stroke

    if (strokeNumber + duration - 1 <= 23) {
    /* ---------------------------------------------------------------------------- */
      for (stroke = strokeNumber; stroke < (strokeNumber + duration); stroke += 1) {
        if (allowedAreasObject[stroke][deviceNumber] === 'allow') {
          arr.push('true')
          arr2.push(allowedAreasObject[stroke][2])
        } else if (allowedAreasObject[stroke][deviceNumber] === 'deny') {
          arr.push('false')
        }
      }
    } else {
      const iterationCounter = 24 - strokeNumber
      for (stroke = strokeNumber; stroke < 24; stroke += 1) {
        if (allowedAreasObject[stroke][deviceNumber] === 'allow') {
          arr.push('true')
          arr2.push(allowedAreasObject[stroke][2])
        } else if (allowedAreasObject[stroke][deviceNumber] === 'deny') {
          arr.push('false')
        }
      }

      if (duration - iterationCounter > 0) {
        for (stroke = 0; stroke < duration - iterationCounter; stroke += 1) {
          if (allowedAreasObject[stroke][deviceNumber] === 'allow') {
            arr.push('true')
            arr2.push(allowedAreasObject[stroke][2])
          } else if (allowedAreasObject[stroke][deviceNumber] === 'deny') {
            arr.push('false')
          }
        }
      }
    }

    const sum = arr2.reduce((x, y) => x + y)

    if (arr.includes('false')) {
      result = false
    } else {
      result = [true, sum]
    }
    /* ---------------------------------------------------------------------------- */
    return result
  }

  // определим для каждого прибора часы в которые можно запуститься
  const getGoodStartHours = (durations) => {
    const goodStartHours = []
    let increment = 0
    const devNumber = inc => (2 + inc)
    /* ------------------------------------ */
    durations.forEach((duration) => {
      const goodStartHoursForDevice = {}

      increment += 1
      const deviceNumber = devNumber(increment)

      Object.keys(allowedAreasObject).forEach((objStrokeNumber) => {
        if (allowedAreasObject[objStrokeNumber][deviceNumber] === 'allow') {
          const periodIsValid = periodChecker(Number(objStrokeNumber), duration, deviceNumber)[0]
          if (periodIsValid === true) {
            goodStartHoursForDevice[objStrokeNumber] = periodChecker(Number(objStrokeNumber), duration, deviceNumber)[1]
          }
        }
      })
      goodStartHours.push(goodStartHoursForDevice)
    })
    return goodStartHours
  }


  // 1 - получим время работы в часах для каждого прибора
  const durations = getDurations()

  // 2 - получим все часы в которые каждый прибор может начать работу
  const goodStartHours = getGoodStartHours(durations)
  return goodStartHours
}

export default prepareGoodStartHours
