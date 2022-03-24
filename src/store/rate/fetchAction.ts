import { IData, IFetchOptions, IFetchState } from "./types"
import { FETCH_METHOD } from "./types"

const fetchOptions: IFetchOptions = {
  method: FETCH_METHOD.GET
}

const fetchAction = async (url: string): Promise<IFetchState> => {
  const state: IFetchState = {
    data: null,
    error: null
  }

  try {
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    state.data = (await response.json()) as IData
  } catch (error) {
    state.error = error as Error
  }

  return state
}

export default fetchAction
