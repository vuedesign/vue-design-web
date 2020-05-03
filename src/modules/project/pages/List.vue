<template>
    <div class="project-list">
        <dl>
            <dt>项目 ({{ total }})</dt>
            <dd class="btn btn-add" @click="handleAddClick">
                <span class="icon-add"></span>
            </dd>
            <dd v-for="item in list"
                :key="item.id"
                @click="handleEditClick(item)">
                <div class="item-inner">
                    <h5>{{ item.name }}</h5>
                    <p>{{ item.description }}</p>
                </div>
                <div class="item-bar"></div>
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
        }
    }
};
</script>

<style lang="scss" scope>
    .project-list {
        padding: 40px;
        width: 100%;
        dt {
            clear: both;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            color: #666;
        }
        dd {
            float: left;
            width: 300px;
            height: 200px;
            margin-right: 20px;
            margin-left: 20px;
            margin-bottom: 40px;
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
            }
            &.btn-add {
                padding: 0;
                display: flex;
                background-color: rgba($color: #000000, $alpha: .05);
                align-items: center;
                justify-content: center;
            }
            .item-inner {
                display: block;
                position: relative;
                width: auto;
                height: 160px;
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
