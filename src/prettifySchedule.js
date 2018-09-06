/**
* Возвращает все возможные часы старта для всех устройств c сум. стоимостью для каждого варианта.
* @param {array} schedule - [0] - объект с данными о часе старта каждого уст-ва и др. инфой.
  [1] - сверстанное почасовое расписание работы с отмеченными зонами allow/deny.
* @returns {object} finalSchedule - итоговое расписание в требуемом формате
*/
const prettifySchedule = (schedule) => {
  const finalSchedule = {}
  const consumedEnergy = {}
  const devices = {}
  let value = 0

  // проставим в расписание id-шники приборов и сформируем consumedEnergy
  Object.keys(schedule[0]).forEach((objKey) => {
    devices[schedule[0][objKey][5]] = schedule[0][objKey][3]
    for (let hour = 0; hour <= 23; hour += 1) {
      if (typeof (schedule[1][hour][objKey]) === 'number') {
        schedule[1][hour][objKey] = schedule[0][objKey][5]
      }
    }
  })

  Object.keys(devices).forEach((objKey) => {
    value += devices[objKey]
  })

  consumedEnergy.value = Number(value.toFixed(3))
  consumedEnergy.devices = devices

  // удалим из расписания все allow
  Object.keys(schedule[0]).forEach((objKey) => {
    for (let hour = 0; hour <= 23; hour += 1) {
      if (schedule[1][hour][objKey] === 'allow') {
        schedule[1][hour].splice(objKey, 1)
      }
    }
  })

  // удалим из расписания все deny
  Object.keys(schedule[0]).forEach((objKey) => {
    for (let hour = 0; hour <= 23; hour += 1) {
      if (schedule[1][hour][objKey] === 'deny') {
        schedule[1][hour].splice(objKey, 1)
      }
    }
  })

  finalSchedule.schedule = schedule[1]
  finalSchedule.consumedEnergy = consumedEnergy

  return finalSchedule
}

export default prettifySchedule
