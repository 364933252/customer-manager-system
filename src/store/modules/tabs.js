export default {
    state: {
        isCollapse: false,
        tabName: 'homePage',
        tabsList: [
            {
                path: '/homePage',
                label: '首页',
                name: 'homePage',
                icon: 's-home'
            }
        ],
        currentTabs: null,
        menuList: [
            {
                path: '/homePage',
                label: '首页',
                name: 'homePage',
                icon: 's-home'
            },
            {
                path: '/customerManage',
                label: '客户管理',
                icon: 's-custom',
                name: 'customerManage',
                children: [
                    {
                        path: '/clueList',
                        label: '线索列表',
                        icon: 's-custom',
                        name: 'clueList'
                    },
                    {
                        path: '/customerList',
                        label: '客户列表',
                        icon: 's-custom',
                        name: 'customerList'
                    }
                ]
            }
        ]
    },
    mutations: {
        // 控制左侧菜单是否展开
        isCollapse: function(state) {
            state.isCollapse = !state.isCollapse
        },
        // 修改标签页默认选中
        editTabsSelected: function (state, step) {
            console.log('12313', step)
            state.tabName = step
        },
        // 控制tags及面包屑数据
        selectMenu: function (state, step) {
            if (step.name !== 'homePage') {
                state.currentTabs = step
                const res = state.tabsList.findIndex(item => item.name === step.name)
                if (res === -1) {
                    state.tabsList.push(step)
                }
            }else {
                state.currentTabs = null
            }
        },
        // 删除tags
        closeTag: function (state, step) {
            // const res = state.tabsList.findIndex(item => item.name === step.name)
            const res = state.tabsList.findIndex(item => item.name === step)
            state.tabsList.splice(res, 1)
        }
    }
}