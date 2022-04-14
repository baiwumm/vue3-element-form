// 岗位列表
export const jobsList = [
    {
        value: 'FrontEndEngineer',
        label: '前端工程师'
    },
    {
        value: 'BackEndEngineer',
        label: '后端工程师'
    }
]

// 部门列表
export const departmentList = [
    {
        id: 'hr',
        name: '人事'
    },
    {
        id: 'financial',
        name: '财务'
    },
    {
        id: 'manager',
        name: '经理'
    }
]

// 省份
export const provinces = [
    {
        value: 'guangdong',
        label: '广东'
    },
    {
        value: 'hunan',
        label: '湖南'
    }
]

// 市区列表
export const cityGdList = [
    {
        value: 'zhanjiang',
        label: '湛江'
    },
    {
        value: 'shenzhen',
        label: '深圳'
    },
    {
        value: 'guangzhou',
        label: '广州'
    },
]

export const cityHnList = [
    {
        value: 'changsha',
        label: '长沙'
    },
    {
        value: 'zhuzhou',
        label: '株洲'
    }
]

// 城市级联数据
export const areaOpts = [
    {
        value: 'guangdong',
        label: '广东',
        children: [
            {
                value: 'shenzhen',
                label: '深圳',
            },
            {
                value: 'zhanjiang',
                label: '湛江',
            }
        ]
    },
    {
        value: 'hunan',
        label: '湖南',
        children: [
            {
                value: 'zhuzhou',
                label: '株洲',
            },
            {
                value: 'changsha',
                label: '长沙',
            }
        ]
    }
]

// 取色器预设
export const predefineColors = [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
]

//   树形控件-权限菜单
export const predefineTrees = [
    {
        id: 'home',
        label: '主页',
    },
    {
        id: 'setting',
        label: '系统设置',
        children: [
            {
                id: 'menu',
                label: '菜单管理',
            },
            {
                id: 'log',
                label: '操作日志',
            },
        ]
    }
]