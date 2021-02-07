<template>
    <a-layout-content class="building-content">
        <div class="building-content-inner" style="width: 800px;">
            dddd
        </div>
    </a-layout-content>
</template>

<script>
import { computed } from 'vue';
// import Sortable from 'sortablejs';
import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
// import DbSortable from '@modules/globals/components/DbSortable';

export default {
    name: 'building-content',
    // components: {
    //     DbSortable
    // },
    setup() {
        const store = useStore();

        store.commit('building/UUID_LIST', [uuidv4()]);

        const list = computed({
            get() {
                const uuidList = store.getters['building/uuidList'];
                return uuidList.map(item => ({ uuid: item }));
            },
            set(val) {
                console.log('val', val);
                store.commit('building/UUID_LIST', val);
            }
        });

        console.log('list', list.value);
        // const newIndex = ref(null);

        // onMounted(() => {
        //     const el = document.getElementById('content');
        //     sortable = Sortable.create(el, {
        //         group: {
        //             name: 'content',
        //             put: ['layout', 'form']
        //         },
        //         dataIdAttr: 'data-uuid',
        //         onChange: function(/**Event*/ evt) {
        //             newIndex.value = evt.newIndex;
        //             console.log('content onChange evt', evt);
        //             // const cloneEl = evt.to;
        //             // console.log('evt', evt);
        //         },
        //         onAdd: function(/**Event*/ evt) {
        //             // evt.srcElement.removeChild(evt.srcElement.children[newIndex.value]);
        //             console.log('content onAdd evt', evt);
        //             const cloneEl = evt.item;
        //             cloneEl.dataset.uuid = uuidv4();
        //             console.log('cloneEl', cloneEl.dataset);
        //             // same properties as onEnd
        //             console.log('sortable=======', sortable);
        //             const uuidList = sortable.toArray();
        //             console.log('uuidList', uuidList);
        //             sortable.el.removeChild(sortable.el.children[newIndex.value]);
        //             store.commit('building/UUID_LIST', uuidList);
        //         }
        //     });
        // });

        // onUnmounted(() => {
        //     sortable.destroy();
        // });

        return {
            list
        };
    }
};
</script>

<style scoped lang="scss">
.building-content {
    background-color: #eee;
    position: relative;
}

.building-content-inner {
    padding: 20px 60px;
}

.drop-content {
    min-height: 500px;
    width: 100%;
    background-color: rgb(65, 105, 225, .1);
}
</style>
