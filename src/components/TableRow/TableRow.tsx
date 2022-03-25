import { FC, useState } from "react"
import LastRates from "../LastRates/LastRates"
import PercentCounter from "../PercentCounter/PercentCounter"
import { ITableRowProps } from "./TableRowTypes"

import "./TableRow.scss"

const TableRow: FC<ITableRowProps> = ({
  name,
  code,
  prevValue,
  currentValue,
  even,
  setValue
}): JSX.Element => {
  const [showLastRates, setShowLastRates] = useState<boolean>(false)

  const onMouseEnterHandler = (e: React.MouseEvent<HTMLTableRowElement>): void => {
    if (e.currentTarget.dataset.name) {
      setValue(e.currentTarget.dataset.name)
    }
  }

  const onClickHandler = (e: React.MouseEvent<HTMLTableRowElement>): void => {
    setShowLastRates(!showLastRates)
  }

  return (
    <>
      <tr
        data-name={name}
        className={`TableRow ${even ? "TableRow_even" : ""} ${
          showLastRates ? "TableRow_active" : ""
        }`}
        onMouseEnter={onMouseEnterHandler}
        onClick={onClickHandler}
      >
        <td>{code}</td>
        <td>{currentValue.toFixed(2)}</td>
        <td>
          <PercentCounter prev={prevValue} current={currentValue} />
        </td>
      </tr>
      <tr
        className={`TableRow__lastRates ${showLastRates ? "TableRow__lastRates_active" : ""}`}
        onClick={onClickHandler}
      >
        <td colSpan={3} className="TableRow__LastRates_td">
          <LastRates code={code} />
        </td>
      </tr>
    </>
  )
}

export default TableRow
