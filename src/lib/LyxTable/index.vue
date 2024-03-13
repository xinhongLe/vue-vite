<template>
    <div class="table-wrapper" ref="tableContainerRef">
        <div class="table-container" :class="{ max100: data && data.pager && data.pager.Total !== 0 }">
            <el-table
                size="large"
                :data="tableData"
                v-loading="loading"
                empty-text="暂无数据"
                :max-height="tableH"
                highlight-current-row
                @sort-change="handleSort"
                @current-change="handleItem"
                header-row-class-name="table-header"
                @selection-change="handleSelectionChange"
                header-cell-class-name="table-header-cell"
            >
                <el-table-column type="selection" width="60" label="" v-if="selection" />
                <el-table-column  width="60" label="序号" v-if="index" #default="{ $index }">
                    <span>{{  pager.pageSize * (pager.pageNum - 1 ) + $index + 1}}</span>
                </el-table-column>
                <el-table-column
                    align="left"
                    :key="item.prop"
                    :prop="item.prop"
                    :width="item.width"
                    :fixed="item.fixed"
                    :label="item.label"
                    :sortable="item.sortable"
                    v-for="item in tableColumns"
                >
                    <template v-if="slots[item.prop]" #default="{ row, $index }">
                        <div class="column-cell">
                            <slot :name="item.prop" :row="row" :index="$index" :data="row[item.prop]" />
                        </div>
                    </template>
                    <template v-else #default="{ row }">
                        <div class="column-cell">
                            {{ typeof row[item.prop] === 'number' ? row[item.prop] : row[item.prop] || '-' }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination" v-if="data && data.pager && data.pager.Total !== 0">
            <el-pagination
                background
                :total="pager.total"
                :default-page-size="pager.pageSize || 10"
                :current-page="pager.pageNum"
                @current-change="handleChange"
                @size-change="handleSizeChange"
                :page-sizes="[5, 10, 20, 30, 50, 100]"
                layout="total, prev, pager, next, sizes"
            />
            <div class="manual">
                <div class="jump">
                    <div>跳到 第</div>
                    <el-input-number
                        :min="1"
                        :controls="false"
                        :max="pager.pageTotal || 1"
                        v-model="pager.inputPageNum"
                        style="width: 48px; margin: 0 5px"
                    />
                    <div>页</div>
                </div>
                <el-button
                    plain
                    type="primary"
                    @click="handleConfirm"
                    style="margin-left: 16px"
                    :auto-insert-space="false"
                >
                    确定
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import type { PropType } from 'vue'
    import type { tableColumnProps, dataProps } from './props'
    import { computed, defineComponent, useSlots, watch, reactive, toRaw, ref, nextTick } from 'vue'

    export default defineComponent({
        name: 'LyxTable',
        props: {
            data: {
                type: Object as PropType<dataProps<any> | { [key: string]: any }[]>,
                default: null
            },
            columns: {
                type: Array as PropType<tableColumnProps[]>,
                default: () => []
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        emits: ['change', 'sort', 'item', 'select'],
        setup(props, { emit }) {
            const slots = useSlots()

            const index = computed(() => {
                return !!props.columns?.find(item => item.type === 'index')
            })
            const selection = computed(() => {
                return !!props.columns?.find(item => item.type === 'selection')
            })
            const tableData = computed(() => {
                if (!props.data) return []

                if (props.data instanceof Array) {
                    return props.data
                }

                return props.data.list || []
            })
            const tableColumns = computed<tableColumnProps[]>(() => {
                return props.columns?.filter(item => !item.type)
            })

            const tableH = ref(10000)
            const tableContainerRef = ref<HTMLElement>()
            const pager = reactive({
                total: 0,
                pageNum: 1,
                pageTotal: 0,
                inputPageNum: 1,
                pageSize: 1
            })
            watch(
                () => props.data,
                (value: dataProps<any> | { [key: string]: any }[]) => {
                    if (!value) return

                    const isArray = props.data instanceof Array

                    if (!isArray) {
                        const obj = toRaw<dataProps<any>>(value as dataProps<any>).pager || {}

                        pager.total = obj.Total || 0
                        pager.pageNum = obj.PageNumber || 1
                        pager.inputPageNum = obj.PageNumber || 1
                        pager.pageTotal = obj.Pages || 1
                        pager.pageSize = obj.PageSize || 1
                    }

                    nextTick(() => {
                        const clientHeight = tableContainerRef.value?.clientHeight as number
                        tableH.value = clientHeight === 60 ? 1000 : clientHeight - (isArray ? 0 : 70)
                    })
                },
                { deep: true, immediate: true }
            )

            const handleChange = (e: number) => {
                emit('change', {
                    PageNumber: e,
                    PageSize: pager.pageSize
                })
            }

            const handleSizeChange = (e: number) => {
                if (pager.pageNum !== 1) {
                    pager.pageSize = e
                    pager.pageNum = 1
                    return
                }

                emit('change', {
                    PageNumber: 1,
                    PageSize: e
                })
            }

            const handleSort = ({ prop, order }: { prop: string; order: string }) => {
                emit('sort', prop, order)
            }

            const handleConfirm = () => {
                emit('change', {
                    PageNumber: pager.inputPageNum,
                    PageSize: pager.pageSize
                })
            }

            const handleItem = (val: any) => {
                emit('item', val)
            }

            const handleSelectionChange = (rows: any) => {
                emit('select', rows)
            }

            return {
                slots,
                pager,
                index,
                tableH,
                selection,
                tableData,
                handleSort,
                handleItem,
                tableColumns,
                handleChange,
                handleConfirm,
                handleSizeChange,
                tableContainerRef,
                handleSelectionChange
            }
        }
    })
</script>

<style scoped lang="scss">
    .table-wrapper {
        height: 100%;
    }

    .table-container {
        max-height: 100%;
        overflow: hidden;

        &.max100 {
            max-height: calc(100% - 70px);
        }
    }

    ::v-deep(.table-header) {
        height: 46px;
        background: #f7f8fa;
        @include font();
        color: #252b39;

        .cell {
            position: relative;

            &:before {
                content: '';
                display: block;
                position: absolute;
                width: 1px;
                height: 20px;
                background: #eaedef;
                left: 0;
            }
        }
    }

    ::v-deep(.table-header-cell) {
        background: transparent !important;
    }

    .pagination {
        height: 50px;
        margin-top: 20px;
        @include flex($jc: flex-end);

        ::v-deep(.el-input) {
            width: 100px;
        }

        ::v-deep(.is-last) {
            margin-right: 16px !important;
        }

        ::v-deep(.el-button--primary) {
            background-color: #ffffff;
            color: #0057fe;
            border: 1px solid #0057fe;
        }

        ::v-deep(button) {
            background: #ffffff !important;
            border: 1px solid #dbe1e7;
            border-radius: 4px !important;
        }

        ::v-deep(.number) {
            border-radius: 4px !important;
            background: #ffffff !important;
            border: 1px solid #dbe1e7;

            &.is-active {
                color: #0057fe !important;
                border: 1px solid #0057fe;
                font-weight: normal !important;
            }
        }

        ::v-deep(.more) {
            background-color: #ffffff !important;
        }
    }

    .jump {
        font-size: 14px;
        color: #242b3a;
        @include flex();

        ::v-deep(.el-input__inner) {
            text-align: center;
        }
    }

    .manual {
        display: flex;
    }
</style>
