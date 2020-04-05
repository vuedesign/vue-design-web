<template>
    <div class="project-add">
        <div class="project-list-nav">
            <ul>
                <li v-for="(item, index) in projectList"
                    :key="index"
                >{{ item }}</li>
            </ul>
        </div>
        <div class="project-add-main">
            <vue-design-breadcrumb />
        </div>
    </div>
</template>

<script>
// import ProjectAdd from '../components/ProjectAdd';

export default {
    name: 'project-edit',
    data() {
        return {
            projectList: [1, 2, 3]
        };
    }
};
</script>

<style lang="scss">
    .project-add{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .project-list-nav {
        width: 280px;
        ul {
            padding: 20px;
        }
        li {
            height: 50px;
            line-height: 50px;
            margin-bottom: 10px;
            background-color: #fff;
        }
    }
    .project-add-main {
        flex: 1;
        background-color: #fff;
    }
</style>
