import { FC, ReactNode, useEffect, useState } from "react"
import { useTypedSelector } from "../../store/selectors"
import { useDispatch } from "react-redux"
import { getRates } from "../../store/rate/actions"
import { IRate, IValute } from "../../store/rate/types"
import TableRow from "../TableRow/TableRow"

import ReactTooltip from "react-tooltip"

import "./Table.scss"

const Table: FC = (): JSX.Element => {
  const [valueName, setValueName] = useState<string>("")

  const { rates } = useTypedSelector((state) => state.rate)
  const dispatch = useDispatch()

  const createTable = (data: IRate): ReactNode => {
    return Object.entries(data).map((elem: [string, IValute], i: number) => {
      return (
        <TableRow
          key={i}
          name={elem[1].Name}
          code={elem[0]}
          prevValue={elem[1].Previous}
          currentValue={elem[1].Value}
          even={(i + 1) % 2 === 0 && true}
          setValue={setValueName}
        />
      )
    })
  }

  useEffect(() => {
    dispatch(getRates())
  }, [])

  return (
    <>
      <table className="Table" data-tip={valueName}>
        <thead>
          <tr>
            <td className="Table__column_first">Код валюты</td>
            <td className="Table__column_second">Значение</td>
            <td className="Table__column_third">%</td>
          </tr>
        </thead>
        <tbody>{rates && createTable(rates)}</tbody>
      </table>

      <ReactTooltip
        place="bottom"
        backgroundColor="rgba(255, 255, 255, 0.8)"
        textColor="blue"
        className="Table__tooltip"
        delayShow={100}
        isCapture
      />
    </>
  )
}

export default Table
