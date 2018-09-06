/**
* Возвращает заготовку расписания c метками о возможности/невозможности работы.
* @param {object} scheduleSkeletonObject - заготовка объекта содержащего пока пустое расписание.
* @param {object} inptFileContent - данные из входного файла.
* @returns {object} scheduleSkeletonObject - расписание c метками о возможности/невозможности р-ты.
* Пример строки: i(час): [i(час), mode(день/ночь), rate(тариф), allow, allow, deny, ...]
*/
const prepareAllowedAreasObject = (scheduleSkeletonObject, inputFileContent) => {
  inputFileContent.devices.forEach((elem) => {
    switch (elem.mode) {
      case 'day':
        Object.keys(scheduleSkeletonObject).forEach((key) => {
          if (scheduleSkeletonObject[key][1] === 'day') {
            scheduleSkeletonObject[key].push('allow')
          } else {
            scheduleSkeletonObject[key].push('deny')
          }
        })
        break
      case 'night':
        Object.keys(scheduleSkeletonObject).forEach((key) => {
          if (scheduleSkeletonObject[key][1] === 'night') {
            scheduleSkeletonObject[key].push('allow')
          } else {
            scheduleSkeletonObject[key].push('deny')
          }
        })
        break
      default:
        Object.keys(scheduleSkeletonObject).forEach((key) => {
          scheduleSkeletonObject[key].push('allow')
        })
    }
  })
  return scheduleSkeletonObject
}

export default prepareAllowedAreasObject
