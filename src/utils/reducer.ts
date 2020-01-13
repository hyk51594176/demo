export const initState = {
  favourites: [],
  episodes: []
}
export interface State {
  favourites: []
  episodes: []
}
interface Action {
  type: string
  payload: any
}
export function reducer(state = initState, action: Action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, episodes: action.payload }
    case 'ADD_DATA':
      return { ...state, episodes: [...state.episodes, action.payload] }
    case 'ADD_FAV':
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      }
    case 'REMOVE_FAV':
      return {
        ...state,
        favourites: action.payload
      }
    default:
      return state
  }
}
