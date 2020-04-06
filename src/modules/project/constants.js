export const rules = {
    name: [
        { required: true, message: '请输入项目名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入项目描述', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    thumb: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
    ]
};

export const FROM_MAX_WIDTH = {
    maxWidth: '500px'
};
