export default {
    state: {
        isCollapse: false,
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
                path: '/clueManage',
                label: '线索管理',
                name: 'clueManage',
                icon: 's-marketing',
                children: [
                    {
                        path: '/personalClue',
                        label: '个人线索',
                        icon: 's-custom',
                        name: 'personalClue'
                    },
                    {
                        path: '/clueSea',
                        label: '线索公海',
                        icon: 's-custom',
                        name: 'clueSea'
                    }
                ]
            },
            {
                path: '/customerManage',
                label: '客户管理',
                icon: 's-custom',
                name: 'customerManage',
                children: [
                    {
                        path: '/personalCustomer',
                        label: '个人客户',
                        icon: 's-custom',
                        name: 'personalCustomer'
                    },
                    {
                        path: '/customerSea',
                        label: '客户公海',
                        icon: 's-custom',
                        name: 'customerSea'
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