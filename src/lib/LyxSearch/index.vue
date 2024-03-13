<template>
    <div class="search-container">
        <div class="item" v-for="item in list" :key="item.prop">
            <div class="label" v-if='item.label'>{{ item.label }}：</div>

            <div class="content">
                <template v-if="item.type === 'input'">
                    <el-input
                        clearable
                        v-model="item.value"
                        style="width: 210px"
                        :placeholder="'请输入' + (item.placeholder || item.label)"
                        :prefix-icon="item.iconInput ? iconList[item.iconInput]  : ''"
                    />
                </template>
                <template v-else-if="item.type === 'select'">
                    <el-select
                        clearable
                        v-model="item.value"
                        style="width: 180px"
                        :placeholder="'请选择' + item.label"
                        @change="handle($event, item)"
                    >
                        <el-option
                            v-for="it in item.fieldList"
                            :key="it.value"
                            :label="it.label"
                            :value="it.value"
                        />
                    </el-select>
                </template>
                <template v-else-if="item.type === 'date'">
                    <el-date-picker
                        clearable
                        :editable="false"
                        :teleported="true"
                        type="daterange"
                        range-separator="~"
                        v-model="item.value"
                        style="width: 240px"
                        value-format="YYYY-MM-DD"
                        end-placeholder="结束时间"
                        start-placeholder="开始时间"
                        @change="handle($event, item)"
                    />
                </template>
                <template v-else-if="item.type === 'cascade'">
                    <el-cascader
                        clearable
                        placeholder="全部"
                        style="width: 180px"
                        v-model="item.value"
                        :options="item.fieldList"
                        @change="handle($event, item)"
                    />
                </template>
            </div>
        </div>
        <div class="item">
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { cloneDeep } from 'lodash'
    import type { PropType } from 'vue'
    import type { searchColumnProps } from './props'
    import { Search } from '@element-plus/icons-vue'
    import { defineComponent, ref, watch } from 'vue'

    export default defineComponent({
        name: 'LyxSearch',
        props: {
            columns: {
                type: Array as PropType<searchColumnProps[]>,
                default: () => []
            }
        },
        emits: ['query', 'change'],
        setup(props, { emit }) {
            const list = ref<searchColumnProps[]>(cloneDeep(props.columns))

            const iconList = {
                search: Search
            }

            watch(
                () => props.columns,
                value => {
                    list.value = cloneDeep(value)
                    console.log("gaibianannnnnn")
                },
                { deep: true }
            )

            // 操作筛选条件
            const handle = (e: any, item: searchColumnProps) => {
                if (['date', 'cascade'].includes(item.type)) {
                    const find = list.value.find(it => it.prop === item.prop) as searchColumnProps
                    find.value = e
                }
                emit('change', item.prop, e)
            }

            // 查询
            const handleQuery = () => {
                const param: { [key: string]: any } = {}

                list.value.forEach(item => {
                    if (item.value instanceof Array && item.suffix1 && item.suffix2) {
                        param[item.prop + item.suffix1] = (item.value as Array<string>)[0] || ''
                        param[item.prop + item.suffix2] = (item.value as Array<string>)[1] || ''
                    } else {
                        param[item.prop] = item.value
                    }
                })
                emit('query', param)
            }

            // 重置
            const handleReset = () => {
                list.value = list.value.map(item => {
                    item.value = ""
                    return item
                })
                handleQuery()
            }

            const changeFieldList = (props: string, data: any) => {
                for (let i = 0; i < list.value.length; i++) {
                    const item = list.value[i]

                    if (item.prop !== props) continue

                    item.fieldList = data
                    item.value = ''
                }
            }

            return {
                iconList,
                list,
                handle,
                handleQuery,
                handleReset,
                changeFieldList
            }
        }
    })
</script>

<style scoped lang="scss">
    .search-container {
        @include flex(flex-start);
        flex-wrap: wrap;
        margin-bottom: 16px;
        padding-top: 10px;

        .item {
            margin: 12px 24px 0 0;
            @include flex();
            flex-shrink: 1;
        }
    }

    ::v-deep(.el-button--primary) {
        background-color: #ffffff;
        border: 1px solid #0057fe;
        color: #0057fe;
    }

    ::v-deep(.el-date-editor) {
        width: 232px;
        justify-content: flex-start;

        .el-range-input {
            width: 75px;
        }

        .el-range__icon {
            position: absolute;
            right: 12px;
        }

        .el-range-separator {
            flex: none;
        }
    }
</style>
