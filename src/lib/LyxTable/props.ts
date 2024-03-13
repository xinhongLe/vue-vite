export interface dataProps<T> {
    list: T
    pager: {
        Total: number
        PageNumber: number
        Pages: number
        PageSize?: number
    }
}

export interface tableColumnProps {
    label: string
    prop?: 'action' | string
    width?: number
    fixed?: 'left' | 'right'
    type?: 'selection' | 'index'
    sortable?: 'custom'
}
