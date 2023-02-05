import type { DateType } from "@/types"

const DIVISIONS = [
  { amount: 60, name: "s" },
  { amount: 60, name: "m" },
  { amount: 24, name: "h" },
  { amount: 7, name: "d" },
  { amount: 4.34524, name: "w" },
  { amount: 12, name: "m" },
  { amount: Number.POSITIVE_INFINITY, name: "y" },
]

export function formatDistanceToNow(date: DateType): string {
  if (!date || date === "") return ""
  date = new Date(date)
  //@ts-ignore
  let duration = (date - new Date()) / 1000

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return `${Math.abs(Math.round(duration))}${division.name}`
    }
    duration /= division.amount
  }
  return ""
}

export function formatDate(date: DateType): string {
  if (!date || date === "") return ""
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDateWithTime(date: DateType): string {
  if (!date || date === "") return ""
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
}
