export function array2Tree(rows) {
    function exists(rows, parentId) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id === parentId) return true;
        }
        return false;
    }

    let nodes = [];
    // get the top level nodes
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (!exists(rows, row.parentId)) {
            nodes.push(row);
        }
    }

    let toDo = [];
    for (let i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i]);
    }
    while (toDo.length) {
        // the parent node
        let node = toDo.shift();
        // get the children nodes
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row.parentId === node.id) {
                if (node.children) {
                    node.children.push(row);
                } else {
                    node.children = [row];
                }
                toDo.push(row);
            }
        }
    }
    return nodes;
}
