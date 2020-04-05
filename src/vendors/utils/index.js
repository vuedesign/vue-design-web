import ListToTree from 'list-to-tree';

export const list2tree = (list) => {
    const ltt = new ListToTree(list, {
        key_id: 'id',
        key_parent: 'parentId',
        key_child: 'children'
    });
    return ltt.GetTree();
};

export function getActions(data, path) {
    let actions = [];
    setActions(data, path);
    function setActions(data, path) {
        data && data.length > 0 && data.forEach(item => {
            if (item.name && item.name === path) {
                if (item.actions && item.actions.length > 0) {
                    actions = item.actions;
                }
            } else {
                setActions(item.children, path);
            }
        });
    }
    return actions;
}
