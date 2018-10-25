import Mock from 'mockjs';

Mock.mock(/\/api\/v1\/user/, 'get', options => {
    console.log('mock:/api/v1/group');
    return {
        type: options.type,
        code: 200,
        data: Mock.mock({
            'data|10': [
                {
                    'id|+1': 1,
                    date: '@DATETIME',
                    name: '@NAME',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            total: 100
        })
    };
});
