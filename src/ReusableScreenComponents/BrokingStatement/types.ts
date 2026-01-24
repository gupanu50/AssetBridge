export type FilterTab = {
    id: string
    label: string
    count: number
}

export type Props = {
    activeTab: string
    setActiveTab: (val: string) => void
}

export type RowItem = {
    id: string
    title: string
    subtitle: string
    amount: string
    amountType: 'debit' | 'credit'
    icon?: any
}