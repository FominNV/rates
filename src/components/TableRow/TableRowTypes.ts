export interface ITableRowProps {
  name: string
  code: string
  prevValue: number
  currentValue: number
  even?: boolean
  setValue: React.Dispatch<React.SetStateAction<string>>
}
