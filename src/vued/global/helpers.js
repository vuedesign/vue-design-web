
export const getAPI = (apis, name, params) => {
    return getUrl(apis, name, params);
};

export const getURL = (urls, name, params) => {
    return getUrl(urls, name, params);
};

function getUrl(urls, name, params) {
    let url = '';
    try {
        url = urls[name];
    } catch (error) {
        console.warn(error);
        return url;
    }
    if (!params) {
        return url;
    }
    let arr = url.split('/');
    arr = arr.map(item => {
        if (item.indexOf(':') === 0) {
            let key = item.replace(':', '');
            if (params[key]) {
                item = params[key];
            }
            return item;
        }
        return item;
    });
    return arr.join('/');
}
