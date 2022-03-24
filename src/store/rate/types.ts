export interface IRateState {
  rates: IRate | null
  date: Date | null
  lastRates: ILastRates[] | null
  loading: boolean
}

export interface IRate {
  [code: string]: IValute
}

export interface IValute {
  ID: string
  NumCode: string
  CharCode: string
  Nominal: number
  Name: string
  Value: number
  Previous: number
}

export interface ILastRates {
  date: Date
  rates: IRate
}

export interface IData {
  Date: Date
  PreviousDate: Date
  PreviousURL: string
  Timestamp: Date
  Valute: IRate
}

export interface IFetchOptions {
  method: FETCH_METHOD
}

export interface IFetchState {
  data: IData | null
  error: Error | null
}

export enum FETCH_METHOD {
  GET = "GET"
}

export enum RateActionTypes {
  GET_RATES = "GET_RATES",
  GET_LAST_RATES = "GET_LAST_RATES",
  SET_LOADING = "SET_LOADING"
}

export enum URLS {
  GET_RATES_URL = "https://www.cbr-xml-daily.ru/daily_json.js"
}

type GetRatesAction = {
  type: RateActionTypes.GET_RATES
  payload: { rates: IRate | null; date: Date }
}

type GetLastRatesAction = {
  type: RateActionTypes.GET_LAST_RATES
  payload: { lastRates: ILastRates[]; loading: boolean }
}

type SetLoadingAction = {
  type: RateActionTypes.SET_LOADING
  payload: { loading: boolean }
}

export type RateAction = GetRatesAction | SetLoadingAction | GetLastRatesAction
