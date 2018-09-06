import { readInput, writeOutput } from './src/handleIO'
import prepareScheduleObject from './src/prepareScheduleObject'
import prepareAllowedAreasObject from './src/prepareAllowedAreasObject'
import prepareGoodStartHours from './src/prepareGoodStartHours'
import prepareVariousOptionsObject from './src/prepareVariousOptionsObject'
import prepareSchedule from './src/prepareSchedule'
import prettifySchedule from './src/prettifySchedule'

// 0 шаг - читаем входной файл input.json
const inputFileContent = readInput()

// 1 шаг - создадим заготовку объекта содержащего пока пустое расписание работы приборов.
const scheduleSkeletonObject = prepareScheduleObject(inputFileContent)

// 2 шаг - В расписании пометим часы в которых приборам разрешено/запрещено работать.
const allowedAreasObject = prepareAllowedAreasObject(scheduleSkeletonObject, inputFileContent)

// 3 шаг - Получим все возможные значения часов начала работы и суммарный rate для каждого варианта.
const goodStartHours = prepareGoodStartHours(allowedAreasObject, inputFileContent)

// 4 шаг - Получим все варианты суммарной стоимости суточной работы каждого прибора.
const variousOptionsObject = prepareVariousOptionsObject(goodStartHours, inputFileContent)

// 5 шаг - Составим и проверим расписание
const schedule = prepareSchedule(variousOptionsObject, inputFileContent, allowedAreasObject)

// 6 шаг - Окончательно оформим расписание
const prettySchedule = prettifySchedule(schedule)

// 7 шаг - записываем результат в output.json
writeOutput(prettySchedule)
