export const rules = {
    thumb: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    date: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    time: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    ],
    type: [
        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    ],
    resource: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
    ]
};

export const moduleTypeMap = {
    'TABLE': '表格组合',
    'NONE': '空白页面'
};

export const booleanMap = {
    'true': '是',
    'false': '否'
};

export const tableDefaultData = [
    {
        key: 'id',
        title: 'ID',
        value: '+1',
        default: null,
        options: null,
        filter: 'false',
        validate: 'false'
    },
    {
        key: 'name',
        title: '活动名称',
        value: '@cname()',
        default: null,
        options: null,
        filter: 'true',
        validate: 'true'
    },
    {
        key: 'type',
        title: '活动类型',
        value: '@cname()',
        default: 1,
        options: {
            1: '抽奖',
            2: '户外'
        },
        filter: 'true',
        validate: 'true'
    },
    {
        key: 'thumb',
        title: '活动banner',
        value: '@image("64")',
        default: null,
        options: {
            name: 'thumb',
            apiURL: '/api/v1/thumb'
        },
        filter: 'true',
        validate: 'true'
    },
    {
        key: 'date',
        title: '日期',
        value: '@date()',
        default: '@now()',
        options: {},
        filter: 'false',
        validate: 'true'
    },
    {
        key: 'delivery',
        title: '即时配送',
        value: 0,
        default: '',
        options: {
            1: '是',
            0: '否'
        },
        filter: 'false',
        validate: 'true'
    },
    {
        key: 'resource',
        title: '特殊资源',
        value: '@cname()',
        default: '',
        options: {},
        filter: 'false',
        validate: 'true'
    },
    {
        key: 'desc',
        title: '描述',
        value: '@cname(20)',
        default: '',
        options: {},
        filter: 'false',
        validate: 'true'
    }
];
