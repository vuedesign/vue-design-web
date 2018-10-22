import Mock from 'mockjs';

console.log('88***************', '/api/v1/group', Mock);

Mock.mock('/api/v1/group', 'get', options => {
    return {
        'list|1-10': [{
            'id|+1': 1,
            'email': '@EMAIL'
        }]
    };
});
