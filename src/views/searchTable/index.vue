<template>
    <div class="container">
        <lyx-search :columns="formData" @change="formChange" @query="handleQuery" />
        <div class="table-title">
            <h1>采集点列表</h1>
            <el-button type="primary" :icon="Plus" @click="addBtn">
                新增采集点
            </el-button>
        </div>
        <div class="table-wrapper">
            <lyx-table :data="data" :columns="tableColumns" @change="handleTableChange">
                <template #CollectionPointStatus="{data}">
                    <span style="color: #2FD7A2" v-if='data === 1'>启用</span>
                    <span style="color: #F64949" v-else>禁用</span>
                </template>
                <template #OperatorTime="{data}">
                    <span>{{data && moment(data).format('YYYY-MM-DD HH:mm')}}</span>
                </template>
                <template #action="{row}">
                    <el-link type="primary" @click="editBtn(row)">编辑</el-link>
                    <el-link type="danger" @click="delBtn(row)">删除</el-link>
                </template>
            </lyx-table>
        </div>

        <point-edit v-if="detailVisible"
                    :type="type"
                    :currentRow='currentRow'
                    :phaseAndSubjectList="phaseAndSubjectList"
                    v-model:visible="detailVisible">
        </point-edit>
    </div>
</template>

<script lang='ts' setup>
import LyxSearch from '@/lib/LyxSearch/index.vue'
import LyxTable from '@/lib/LyxTable/index.vue'
import { searchColumns, tableColumns } from './props.ts'
import { onMounted, reactive, toRefs } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import PointEdit from './components/pointEdit.vue'
import { paramProps } from './props'


const state = reactive({
    detailVisible: false,
    type: "add",
    formData: searchColumns,
    currentRow: {},
    phaseAndSubjectList: [],
    form: {
        CollectionPointName: '',
        SchoolPhase: '',
        SubjectId: '',
    },
    data: {
        list: [],
        pager: {
            Total: 0,
            PageNumber: 1,
            PageSize: 20,
            Pages: 1,
        }
    }
})
const { detailVisible, data, type, formData, phaseAndSubjectList, currentRow } = toRefs(state)

const handleQuery = (params: paramProps) => {
    state.form = params
    _getCollectionPointList()
}

const handleTableChange = (pager: { PageNumber: number; PageSize: number }) => {
    state.data.pager.PageNumber = pager.PageNumber
    state.data.pager.PageSize = pager.PageSize
}
const addBtn = () => {
    state.type = 'add'
    state.currentRow = {}
    state.detailVisible = true
}

const editBtn = (row) => {
    state.type = 'edit'
    state.currentRow = row
    state.detailVisible = true
}

const delBtn = (row) => {
    ElMessageBox.confirm('是否确认删除?', '提示',
        { confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        ElMessage.success("删除成功")
    }).catch(() => {})
}

const formChange = (prop:string, value:number | string) => {
    console.log(prop, value, "=====" )
    if( prop === "SchoolPhase" ){
        const phaseObj = state.formData.find(item => item.prop === "SchoolPhase")
        const subjectObj = state.formData.find(item => item.prop === 'SubjectId')
        const find = phaseObj.fieldList?.find(item => item.value === value)
        const arr = [{ label: '全部学科', value: "" }]
        if(!find) return
        subjectObj.value = ""
        phaseObj.value = value
        subjectObj.fieldList = arr.concat(find.subjectList || [])
    }
}


</script>

<style scoped lang="scss">
.table-title {
    font-size: 16px;
    @include flex($jc: space-between);
    height: 55px;

    h1 {
        font-size: 16px;
        @include font();
    }
}

.table-container .el-link {
    margin-right: 15px;
}

</style>
