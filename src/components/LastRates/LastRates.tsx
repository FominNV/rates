import { FC, ReactNode } from "react"
import { useTypedSelector } from "../../store/selectors"
import { ILastRates, IValute } from "../../store/rate/types"
import { ILastRatesProps } from "./LastRatesTypes"
import PercentCounter from "../PercentCounter/PercentCounter"

import { format } from "date-fns"

import "./LastRates.scss"

const LastRates: FC<ILastRatesProps> = ({ code }): JSX.Element => {
  const { lastRates, loading } = useTypedSelector((state) => state.rate)

  const showLastRates = (data: ILastRates[]): ReactNode => {
    return data.map((elem: ILastRates, i: number) => {
      const date = format(new Date(elem.date), "dd.MM")
      let prevValue = 0
      let currentValue = 0

      Object.entries(elem.rates).map((item: [string, IValute]) => {
        if (item[0] === code) {
          currentValue = item[1].Value
          prevValue = item[1].Previous
        }
      })

      return (
        <div className="LastRates__item" key={i}>
          <div className="LastRates__item_date">{date}</div>
          <div className="LastRates__item_value">{currentValue.toFixed(2)}</div>
          <div className="LastRates__item_prcent">
            {prevValue && currentValue && (
              <PercentCounter prev={prevValue} current={currentValue} />
            )}
          </div>
        </div>
      )
    })
  }

  return <div className="LastRates">{!loading && lastRates && showLastRates(lastRates)}</div>
}

export default LastRates
