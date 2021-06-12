const componentConfigs = import.meta.globEager('./**/config.json');

export default (categoryMap) => {
    let list = [];
    categoryMap.forEach(item => {
        let children = [];
        for(let key in componentConfigs) {
            const componentConfig = componentConfigs[key];
            if (componentConfig.category === item.value) {
                children.push(componentConfig.default);
            }
        }
        list.push({
            ...item,
            children
        });
    });
    return list;
};
