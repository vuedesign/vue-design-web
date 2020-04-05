<template>
    <div class="project-list">
        <dl>
            <dt>项目</dt>
            <dd @click="handleEditClick">
                <div class="item-inner"></div>
                <div class="item-bar"></div>
            </dd>
            <dd></dd>
            <dd></dd>
            <dd class="btn btn-add" @click="handleAddClick">
                <span class="icon-add"></span>
            </dd>
        </dl>
    </div>
</template>

<script>

export default {
    name: 'project-list',
    data() {
        return {
        };
    },
    methods: {
        handleAddClick() {
            this.$router.push({
                name: 'project-add'
            });
        },
        handleEditClick() {
            this.$router.push({
                name: 'project-edit'
            });
        }
    }
};
</script>

<style lang="scss" scope>
    .project-list {
        padding: 80px 100px;
        padding-right: 50px;
        width: 100%;
        dt {
            clear: both;
            width: 100%;
            height: 50px;
            line-height: 50px;
        }
        dd {
            float: left;
            width: 300px;
            height: 200px;
            margin-right: 50px;
            margin-bottom: 50px;
            background-color: #fff;
            padding: 10px;
            padding-bottom: 30px;
            &:hover {
                box-shadow: 0 0 1px 2px rgba($color: #000000, $alpha: .02);
                cursor: pointer;
                &.btn-add {
                    background-color: rgba($color: #000000, $alpha: .07);
                    box-shadow: 0 0 1px 2px rgba($color: #000000, $alpha: .01) inset;
                    .icon-add::after,
                    .icon-add::before {
                        background-color: #fff;
                    }
                }
                .item-inner {
                    display: block;
                }
            }
            &.btn-add {
                padding: 0;
                display: flex;
                background-color: rgba($color: #000000, $alpha: .05);
                align-items: center;
                justify-content: center;
            }
            .item-inner {
                display: none;
                position: relative;
                width: auto;
                height: 160px;
                background-color: rgba($color: #000000, $alpha: .5);
            }
        }
    }

    .icon-add {
        position: relative;
        width: 48px;
        height: 48px;
        &::after{
            position: absolute;
            top: 22px;
            content: '';
            display: block;
            width: 48px;
            height: 4px;
            background-color: #eef5f9;
        }
        &::before {
            position: absolute;
            left: 22px;
            content: '';
            display: block;
            height: 48px;
            width: 4px;
            background-color: #eef5f9;
        }
    }
</style>
