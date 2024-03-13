<template>
    <lyx-dialog :width="500" v-model:show="show" :title="type === 'edit' ? '编辑采集点' : '新增采集点'"  @close="close">
        <el-form ref="formRef" :model="form" label-width="80">
            <el-form-item label="学段：" prop="SchoolPhaseObj.value" :rules="rules.Phase">
                <el-select v-model="form.SchoolPhaseObj" @change="handleChangePhase" placeholder="请选择"  value-key="value">
                    <el-option v-for="item in phaseList" :key="item.value" :label="item.label" :value="item" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学科：" prop="SubjectObj.value" :rules="rules.Subject">
                <el-select v-model="form.SubjectObj" placeholder="请选择" value-key="value">
                    <el-option v-for="item in subjectList" :key="item.value" :label="item.label" :value="item" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label=" index === 0 ? '采集点：' : ''" v-for="(item, index) in form.pointList" :key="index" :prop="`pointList[${index}]`" :rules="rules.Point">
                <div class="collect-point" >
                    <el-input v-model="form.pointList[index]" placeholder="请输入采集点，最多5个字符" maxlength="5"></el-input>
                    <img v-if="type === 'add'" src="@/assets/images/icon_add.svg" alt="" @click="handlePoint('add', index)">
                    <img v-if="type === 'add' && index !== 0" src="@/assets/images/icon_delete.svg" alt="" @click="handlePoint('delete', index)">
                </div>
            </el-form-item>
            <el-form-item label="状态：">
                <el-radio-group v-model="form.Status">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确定</el-button>
        </template>
    </lyx-dialog>
</template>


<script lang='ts' setup>
import { computed, defineEmits, defineProps, reactive, toRefs, ref, onMounted } from 'vue'
import LyxDialog from '@/lib/LyxDialog/index.vue'
import { ElMessage } from 'element-plus';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    currentRow: {
        type: Object,
        default: () => {}
    },
    phaseAndSubjectList: {
       type:Array,
       default: () => []
    },
    type: {
        type: String,
        default: ''
    }
})

const emits = defineEmits(["confirm", "update:visible"])

const show = computed(() => props.visible)
const formRef = ref()
const state = reactive({
    rules: {
        Phase: [{ required: true, message: '请选择学段', trigger: 'change' }],
        Subject: [{ required: true, message: '请选择科目', trigger: 'change' }],
        Point: [{ required: true, message: '请输入采集点', trigger: "blur" }]
    },
    form: {
        SchoolPhaseObj: {},
        SubjectObj: {},
        pointList: [""],
        Status: 1,
        IsSelf: 0
    },
    phaseList: [],
    subjectList: []
})

const { rules, form, phaseList, subjectList } = toRefs(state)

const handleChangePhase = (obj) => {
    const find = state.phaseList?.find(item => item.value === obj.value)
    state.subjectList = find?.subjectList || []
    state.form.SubjectObj = {}
}

const close = () => {
    emits("update:visible")
}

const handlePoint = (type:string, index:number) => {
    if(type === "add") {
        state.form.pointList.splice(index+1, 0 , '')
    } else {
        state.form.pointList.splice(index, 1)
    }
}


const handleConfirm = () => {
    formRef.value.validate((valid:Boolean) => {
        if (valid) {
           const data = {
               SchoolPhase: state.form.SchoolPhaseObj.value,
               SchoolPhaseName: state.form.SchoolPhaseObj.label,
               SubjectId: state.form.SubjectObj.value,
               SubjectName: state.form.SubjectObj.label,
               CollectionPointName: props.currentRow.CollectionPointId ? state.form.pointList[0] : state.form.pointList,
               IsOpen: state.form.Status,
               IsSelf: state.form.IsSelf
           }

           if(props.type === "add"){
               console.log("新增")
           }else{
               console.log("编辑")
           }
        }
    })
}

onMounted(() => {

})

</script>

<style scoped lang='scss'>
.el-select{
    width: 100%;
}
.collect-point {
    display: flex;
    width: 100%;
    img {
        margin-left: 12px;
        cursor: pointer;
    }
}
</style>
