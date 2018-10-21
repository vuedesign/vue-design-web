module.exports = (options = {}) => {
    // options.contents 是 Buffer 类型；
    const contents = options.contents.toString();
    // console.log('contents', contents);
    const pkg = JSON.parse(contents);

    // 项目基本信息
    Object.assign(pkg, {
        name: options.name,
        version: options.version,
        description: options.description,
        author: options.author
    });

    // UI 组件库
    const UIComponentList = [
        {
            name: 'iview',
            version: '^3.1.3'
        },
        {
            name: 'element-ui',
            version: '^2.4.8'
        }
    ];
    const currentUIComponentItem = UIComponentList.find(item => item.name === options.UIComponent);
    Object.assign(pkg.dependencies, {
        [currentUIComponentItem.name]: currentUIComponentItem.version,
    });
    return JSON.stringify(pkg);
};
