import { h, ref, computed, onMounted, onUnmounted } from 'vue';
import Sortable from 'sortablejs';
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'vd-sortable',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        tag: {
            type: String,
            default: 'div'
        },
        group: {
            type: Object,
            default: () => ({})
        },
        dataIdAttr: {
            type: String,
            default: 'data-uuid'
        }
    },
    setup(props, context) {
        const vm = this;
        console.log('context', vm);
        const newIndex = ref(null);
        const id = ref(uuidv4());
        let sortable = null;

        // const listRef = toRef(props.list);

        // console.log('listRef', listRef);

        const list = computed(() => props.list);

        console.log('listRef 3', list);

        onMounted(() => {
            console.log('context == =', ref(props.tag));
            const el = document.getElementById(id.value);
            sortable = Sortable.create(el, {
                group: props.group,
                dataIdAttr: props.dataIdAttr,
                onChange: function(/**Event*/ evt) {
                    newIndex.value = evt.newIndex;
                },
                onAdd: function(/**Event*/ evt) {
                    console.log('onAdd evt', evt);
                    const cloneEl = evt.clone;
                    const itemEl = evt.item;
                    console.log('cloneEl', cloneEl);
                    console.log('itemEl', itemEl);
                    itemEl.dataset.uuid = uuidv4();
                    const uuidList = sortable.toArray();
                    console.log('uuidList 0', uuidList);
                    console.log(sortable.el.children);
                    // sortable.el.removeChild(sortable.el.children[newIndex.value]);
                    console.log('uuidList 1', uuidList);
                    // listRef.value = uuidList;
                    // console.log('listRef.value', listRef.value);
                    // props.list.value = uuidList;
                    console.log('update:list2', uuidList);
                    context.emit('update:list', uuidList);
                    // store.commit('workbench/UUID_LIST', uuidList);
                }
            });
        });

        onUnmounted(() => {
            sortable.destroy();
        });

        const slots = context.slots.default ? context.slots.default({
            list: props.list
        }) : [];

        console.log('slots', slots);
        return () => h(props.tag, {
            id: id.value
        }, slots);
    }
};
