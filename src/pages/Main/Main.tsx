import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import Table from "../../components/Table/Table"
import { format } from "date-fns"

import MainLayout from "../../layouts/MainLayout/MainLayout"
import { getLastRates, setLoading } from "../../store/rate/actions"

import "./Main.scss"
import { useTypedSelector } from "../../store/selectors"

const Main: FC = (): JSX.Element => {
  const { date } = useTypedSelector((state) => state.rate)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(getLastRates())
  }, [])

  return (
    <MainLayout title="Rates">
      <main className="Main">
        <div className="Main__content">
          <h1 className="Main__title">
            Курс рубля на {date && format(new Date(date), "dd.MM.yyy")}
          </h1>
          <Table />
        </div>
      </main>
    </MainLayout>
  )
}

export default Main
