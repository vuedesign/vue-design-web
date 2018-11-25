import Mock from 'mockjs';

Mock.mock(/\/api\/v1\/operate\/activity/, 'get', options => {
    console.log('mock: /api/v1/operate/activity');
    return {
        type: options.type,
        code: 200,
        data: Mock.mock({
            'list|20': [
                {
                    'id|+1': 1,
                    name: '@cname()',
                    thumb: '@image("64")',
                    region: '@cname()',
                    date: '@date()',
                    time: '@time()',
                    delivery: false,
                    type: [1, 2, 3, 4],
                    resource: '@cname()',
                    desc: '@cname(20)'
                }
            ],
            pagination: {
                page: 1,
                limit: 20,
                pages: 1,
                total: 100,
                next: null,
                prev: null
            }
        })
    };
});
