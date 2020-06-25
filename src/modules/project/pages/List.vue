<template>
    <div class="project-list">
        <dl>
            <dt>项目 ({{ total }})</dt>
            <dd class="btn btn-add" @click="handleAddClick">
                <div class="item">
                    <div class="item-inner">
                        <span class="icon-add"></span>
                    </div>
                </div>
            </dd>
            <dd v-for="item in list"
                :key="item.id"
            >
                <div class="item">
                    <div class="item-inner" @click="handleDesignClick(item)">
                        <h5>{{ item.name }}</h5>
                        <p>{{ item.description }}</p>
                    </div>
                    <ul class="item-bar">
                        <!--
                        <li @click="handleDesignClick(item)">
                            <vue-design-iconfont type="setting" />
                        </li>
                        -->
                        <li @click.stop="handleEditClick(item)">
                            <vue-design-iconfont type="brush" />
                        </li>
                        <li @click.stop="handleDeleteClick(item)">
                            <vue-design-iconfont type="empty" />
                        </li>
                    </ul>
                </div>
            </dd>
        </dl>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'project-list',
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters('project', [
            'list',
            'total'
        ])
    },
    created() {
        this.find();
    },
    methods: {
        ...mapActions('project', ['find']),
        handleAddClick() {
            this.$router.push({
                name: 'project-add'
            });
        },
        handleEditClick({ uuid }) {
            this.$router.push({
                name: 'project-edit',
                params: { uuid }
            });
        },
        async handleDeleteClick({ uuid }) {
            const isDelete = await this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => true).catch(() => false);

            if (isDelete) {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });   
                return;
            }
            this.$store.dispatch('project/destroy', { uuid });
        },
        handleDesignClick({ uuid }) {
            this.$router.push({
                name: 'project-design',
                params: { uuid }
            });
        }
    }
};
</script>

<style lang="scss" scope>
    .project-list {
        padding: 32px;
        width: 100%;

        .item-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .item-bar {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            height: 28px;
            z-index: 2;
            justify-content: flex-end;

            li {
                width: 28px;
                line-height: 28px;
                height: 28px;
                text-align: center;

                i {
                    color: #999;
                }
            }
        }
        
        dl {
            display: flex;
            flex-wrap: wrap;
        }

        dt {
            clear: both;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            color: #666;
        }
        dd {
            width: 25%;
            height: auto;
            padding: 10px;

            &:hover {
                .item {
                    box-shadow: 0 0 1px 2px rgba($color: #000000, $alpha: .02);
                    cursor: pointer;
                }
                &.btn-add {
                    .item {
                        background-color: rgba($color: #000000, $alpha: .07);
                        box-shadow: 0 0 1px 2px rgba($color: #000000, $alpha: .01) inset;
                        .icon-add::after,
                        .icon-add::before {
                            background-color: #fff;
                        }
                    }
                }
            }
            &.btn-add {
                .item {
                    display: flex;
                    background-color: rgba($color: #000000, $alpha: .05);
                    align-items: center;
                    justify-content: center;
                }
            }
            .item {
                display: block;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 66.666%;
                background-color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                h5,
                p {
                    text-align: center;
                }
                h5 {
                    color: #444;
                    line-height: 24px;
                }
                p {
                    color: #999;
                    line-height: 28px;
                }
            }
        }

        .icon-add {
            position: absolute;
            width: 48px;
            height: 48px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

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
    }


    @media (max-width: 800px) {
        .project-list {
            dd {
                width: 50%;
            }
        }
    }

    @media (min-width: 700px) and (max-width: 1100px) {
        .project-list {
            dd {
                width: 33.333%;
            }
        }
    }

    @media (min-width: 1101px) and (max-width: 1500px) {
        .project-list {
            dd {
                width: 25%;
            }
        }
    }

    @media screen and (min-width: 1501px) {
        .project-list {
            dd {
                width: 20%;
            }
        }
    }

</style>
