export default {
    state: {
        isCollapse: false,
        tabName: 'homePage',
        tabsList: [
            {
                path: '/homePage',
                label: '首页',
                name: 'welcome',
                icon: 's-home'
            }
        ],
        currentTabs: null,
        menuList: [
            {
                path: '/homePage',
                label: '首页',
                name: 'welcome',
                icon: 's-home'
            },
            {
                path: '/liveManage',
                label: '直播管理',
                icon: 's-grid',
                name: 'liveManage',
                children: [
                    {
                        path: '/roomList',
                        label: '直播间',
                        icon: 'menu',
                        name: 'roomList'
                    },
                    {
                        path: '/customerList',
                        label: '客户列表',
                        icon: 'menu',
                        name: 'customerList'
                    },
                    {
                        path: '/distributorList',
                        label: '分销商列表',
                        icon: 'menu',
                        name: 'distributorList'
                    },
                    {
                        path: '/goodsList',
                        label: '商品库',
                        icon: 'menu',
                        name: 'goodsList',
                        children: [
                            {
                                path: '/noInStorage',
                                label: '未入库',
                                icon: 'menu',
                                name: 'noInStorage'
                            },
                            {
                                path: '/inStorage',
                                label: '已入库',
                                icon: 'menu',
                                name: 'inStorage'
                            }
                        ]
                    },
                    {
                        path: '/orderList',
                        label: '订单列表',
                        icon: 'menu',
                        name: 'orderList'
                    },
                    // {
                    //     path: '/anchorList',
                    //     label: '直播成员',
                    //     icon: 'menu',
                    //     name: 'anchorList' 
                    // },
                    // {
                    //     path: '/subscribeManage',
                    //     label: '订阅管理',
                    //     icon: 'menu',
                    //     name: 'subscribeManage' 
                    // },
                    // {
                    //     path: '/liveSet',
                    //     label: '直播设置',
                    //     icon: 's-operation',
                    //     name: 'liveSet' ,
                    //     children: [
                    //         {
                    //             path: '/serviceManage',
                    //             label: '客服管理',
                    //             icon: 'menu',
                    //             name: 'serviceManage',
                    //         },
                    //         {
                    //             path: '/serviceManage',
                    //             label: '回访管理',
                    //             icon: 'menu',
                    //             name: 'serviceManage',
                    //         },
                    //         {
                    //             path: '/silentManage',
                    //             label: '禁言管理',
                    //             icon: 'menu',
                    //             name: 'silentManage',
                    //         },
                    //         {
                    //             path: '/embodyManage',
                    //             label: '收录管理',
                    //             icon: 'menu',
                    //             name: 'embodyManage',
                    //         }
                    //     ]
                    // }
                ]
            },
            // {
            //     path: '/customerManage',
            //     label: '客户管理',
            //     icon: 's-custom',
            //     name: 'customerManage',
            //     children: [
            //         {
            //             path: '/clueList',
            //             label: '线索列表',
            //             icon: 's-custom',
            //             name: 'clueList'
            //         },
            //         {
            //             path: '/customerList',
            //             label: '客户列表',
            //             icon: 's-custom',
            //             name: 'customerList'
            //         }
            //     ]
            // },
            // {
            //     path: '/memberManage',
            //     label: '会员管理',
            //     name: 'memberManage',
            //     icon: 's-custom',
            //     children: [
            //         {
            //             path: '/memberList',
            //             label: '会员列表',
            //             icon: 's-custom',
            //             name: 'memberList'
            //         },
            //         {
            //             path: '/memberTypeList',
            //             label: '会员类型管理',
            //             icon: 's-custom',
            //             name: 'memberTypeList'
            //         },
            //         {
            //             path: '/memberLevelList',
            //             label: '会员等级管理',
            //             icon: 's-custom',
            //             name: 'memberLevelList'
            //         },
            //         {
            //             path: '/memberDayManage',
            //             label: '纪念日管理',
            //             icon: 's-custom',
            //             name: 'memberDayManage'
            //         },
            //         {
            //             path: '/memberCube',
            //             label: '会员魔方',
            //             icon: 's-custom',
            //             name: 'memberCube'
            //         }
            //     ]
            // }
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