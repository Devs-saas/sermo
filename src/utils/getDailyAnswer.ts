export function getDailyAnswer(
  answers: Set<string>
): string {
  const today = new Date()
  const startDate = new Date(2024, 0, 1)

  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const startMidnight = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  )

  const diffInMs =
    todayMidnight.getTime() - startMidnight.getTime()

  const dayIndex = Math.floor(
    diffInMs / (1000 * 60 * 60 * 24)
  )

  const answersArray = Array.from(answers)

  const index = dayIndex % answersArray.length

  return answersArray[index]
}
