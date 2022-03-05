export function getRandomValue<T>(e: T): T[keyof T] {
    const enumValues = Object.keys(e)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]

  return randomEnumValue;
}

export function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}