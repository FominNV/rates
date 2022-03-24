import { FC } from "react"
import { IPercentCounterProps } from "./PercentCounterTypes"

import "./PercentCounter.scss"

const PercentCounter: FC<IPercentCounterProps> = ({ prev, current }): JSX.Element => {
  const difference = Number((current - prev).toFixed(2))

  if (difference > 0) {
    const percent = (current - prev) / (prev / 100)
    return <span className="PercentCounter_high">{`+ ${percent.toFixed(2)}%`}</span>
  } else if (difference < 0) {
    const percent = (prev - current) / (prev / 100)
    return <span className="PercentCounter_low">{`- ${percent.toFixed(2)}%`}</span>
  }

  return <span className="PercentCounter">0</span>
}

export default PercentCounter
