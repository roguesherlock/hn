export type Preferences = {
  scrollButtonPosition: {
    x: number
    y: number
  }
}

export const usePreferences = () => {
  const state = useLocalStorage<Preferences>("preferences", {
    scrollButtonPosition: {
      x: window.innerWidth - 100,
      y: window.innerHeight - 100,
    },
  })
  return state
}
