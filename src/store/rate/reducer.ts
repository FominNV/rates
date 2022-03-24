import { IRateState, RateAction, RateActionTypes } from "./types"

const initialState: IRateState = {
  rates: null,
  date: null,
  lastRates: null,
  loading: false
}

export function rateReducer(state: IRateState = initialState, action: RateAction): IRateState {
  switch (action.type) {
    case RateActionTypes.GET_RATES:
      return {
        ...state,
        rates: action.payload.rates,
        date: action.payload.date
      }

    case RateActionTypes.GET_LAST_RATES:
      return {
        ...state,
        lastRates: action.payload.lastRates,
        loading: action.payload.loading
      }

    case RateActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }

    default:
      return state
  }
}
