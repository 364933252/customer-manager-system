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
                path: '/liveManage',
                label: '直播管理',
                icon: 's-custom',
                name: 'liveManage',
                children: [
                    {
                        path: '/roomList',
                        label: '直播间',
                        icon: 's-custom',
                        name: 'roomList'
                    },
                    {
                        path: '/customerList',
                        label: '客户列表',
                        icon: 's-custom',
                        name: 'customerList'
                    },
                    {
                        path: '/goodsList',
                        label: '商品库',
                        icon: 's-custom',
                        name: 'goodsList'
                    },
                    {
                        path: '/anchorList',
                        label: '直播成员',
                        icon: 's-custom',
                        name: 'anchorList' 
                    },
                    {
                        path: '/subscribeManage',
                        label: '订阅管理',
                        icon: 's-custom',
                        name: 'subscribeManage' 
                    },
                    {
                        path: '/liveSet',
                        label: '直播设置',
                        icon: 's-custom',
                        name: 'liveSet' ,
                        children: [
                            {
                                path: '/serviceManage',
                                label: '客服管理',
                                icon: '',
                                name: 'serviceManage',
                            },
                            {
                                path: '/serviceManage',
                                label: '回访管理',
                                icon: '',
                                name: 'serviceManage',
                            },
                            {
                                path: '/silentManage',
                                label: '禁言管理',
                                icon: '',
                                name: 'silentManage',
                            },
                            {
                                path: '/embodyManage',
                                label: '收录管理',
                                icon: '',
                                name: 'embodyManage',
                            }
                        ]
                    }
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