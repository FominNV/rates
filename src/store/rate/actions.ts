import { Dispatch } from "react"
import fetchAction from "./fetchAction"
import { RateAction, RateActionTypes, URLS } from "./types"

import { format } from "date-fns"

export const getRates = () => async (dispatch: Dispatch<RateAction>) => {
  const { data, error } = await fetchAction(URLS.GET_RATES_URL)

  if (error) {
    throw new Error("Can't get rates: " + error.message)
  }

  dispatch({
    type: RateActionTypes.GET_RATES,
    payload: {
      rates: data !== null ? data.Valute : null,
      date: data?.Date as Date
    }
  })
}

export const getLastRates = () => async (dispatch: Dispatch<RateAction>) => {
  const dayMilliseconds = 24 * 3600 * 1000
  const result: any = []
  let count = 1

  const loadLastRates = (date: string): PromiseLike<void> => {
    count++
    return new Promise(async (resolve, reject) => {
      const url = `https://www.cbr-xml-daily.ru/archive/${date}/daily_json.js`

      try {
        const { data, error } = await fetchAction(url)

        if (!error) {
          result.push({ date: data!.Date, rates: data!.Valute })
        }

        if (error) {
          throw new Error(`can\`t get last rates`)
        }
      } catch (error) {
      } finally {
        if (result.length < 10) {
          const newDate = format(Date.now() - dayMilliseconds * count, "yyyy/MM/dd")
          loadLastRates(newDate)
        }
        resolve()
      }
    })
  }

  const date = format(Date.now() - dayMilliseconds, "yyyy/MM/dd")
  await loadLastRates(date)

  dispatch({
    type: RateActionTypes.GET_LAST_RATES,
    payload: {
      lastRates: result,
      loading: false
    }
  })
}

export const setLoading = (bool: boolean): RateAction => {
  return {
    type: RateActionTypes.SET_LOADING,
    payload: { loading: bool }
  }
}
