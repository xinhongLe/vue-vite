import type { tableColumnProps } from '@/lib/LyxTable/props'
import type { searchColumnProps } from '@/lib/LyxSearch/props'

export const tableColumns: tableColumnProps[] = [
    { label: '序号', type: 'index' },
    { label: '学段', prop: 'SchoolPhaseName' },
    { label: '学科', prop: 'SubjectName' },
    { label: '采集点名称', prop: 'CollectionPointName' },
    { label: '状态', prop: 'CollectionPointStatus', width: 100  },
    { label: '操作时间', prop: 'OperatorTime', width: 160 },
    { label: '操作人', prop: 'OperatorName' },
    { label: '操作', prop: 'action', fixed: 'right', width: 120 }
]

export const searchColumns: searchColumnProps[] = [
    { label: '学段', prop: 'SchoolPhase', type: 'select', value: "", fieldList: [] },
    { label: '学科', prop: 'SubjectId', type: 'select', value: "", fieldList: [{ label: '全部学科', value: "" }] },
    { label: '', prop: 'CollectionPointName', placeholder: '采集点名称', iconInput: 'search',  type: 'input', value: '' },
   ]

export interface paramProps {
    SchoolPhase: string
    SubjectId: string
    CollectionPointName: string
}

