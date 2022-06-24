export default {
    state: {
        tableHeight: null
    },
    mutations: {
        // 设置全局表格满屏高度
        setTableHeight: function (state, step) {
            state.tableHeight = step
        }
    }
}