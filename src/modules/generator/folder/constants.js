export const rules = {
    folderName: [
        { required: true, message: '请输入目录名称', trigger: 'blur' }
    ],
    folderLabel: [
        { required: true, message: '请输入目录描述', trigger: 'blur' }
    ],
    folderIcon: [
        { required: true, message: '请选择目录图标', trigger: 'blur' }
    ],
    isFolderMenu: [
        { required: true, message: '是否要加到左菜单', trigger: 'blur' }
    ]
};
