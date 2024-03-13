type searchType = 'input' | 'select' | 'date' | 'cascade'

export interface searchColumnProps {
    label: string
    placeholder?: string
    iconInput?: string
    prop: string
    type: searchType
    value: any
    fieldList?: { label: string; value: string | number, [value:string]:any }[]
    suffix1?: string
    suffix2?: string
}
