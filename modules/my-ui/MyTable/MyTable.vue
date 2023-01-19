<template>
    <table border="1" class="my-table">
        <thead>
            <tr>
                <th
                v-for="info of tHead"
                :key="info.key"
                >{{ info.text }}</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item, index) of tBody"
                :key="item.id"
            >
                <td
                    v-for="(value, key) in item"
                    :key="key"
                    @click.stop="showEditInput($event, key, index)"
                >{{ value }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    import { createApp, reactive, toRefs } from "vue";
    import EditInput from "./EditInput";

    let editInputApp = null;

    const state = reactive({
        key: '',
        value: '',
        index: -1,
        text: ''
    })

    const props = defineProps({
        data: {
            type: Object,
            default: () => ({
                tHead: [],
                tBody: []
            })
        }
    });

    const emit = defineEmits(['submit']);

    const { tHead, tBody } = toRefs(props.data);

    function showEditInput(event, key, index) {
        // console.log(event, key, index);
        editInputApp && removeEditInputApp(editInputApp);
        if (!checkEditable(key)) return;

        //拿到 td
        const target = event.target;
        const oFrag = document.createDocumentFragment();
        
        //createApp -> 第一个参数是根组件，第二个参数可选，它是要传递给根组件的props。
        editInputApp = createApp(EditInput, {
            value: target.textContent,
            setValue
        })

        if(editInputApp) {
            //将应用实例挂载在一个容器元素中
            editInputApp.mount(oFrag);
            target.appendChild(oFrag);
            //此时td中有input，设置选中select方法
            target.querySelector('.edit-input').select();
        }

        setData({ index, key, text: findText(key) });
    }

    function setData({ index, key, text, value = '' }) {
        state.key = key;
        state.index = index;
        state.value = value;
        state.text = text;
    }

    //组件传递过来的value
    function setValue(value) {
        console.log(state);
        state.value = value;
        //像父组件传递参数
        emit('submit', { ...state }, removeEditInputApp);
    }

    function findText(key) {
        const { text } = tHead.value.find(item => item.key === key);
        return text;
    }

    function removeEditInputApp() {
        editInputApp && editInputApp.unmount();
        setData({
            index: -1,
            key: '',
            value: '',
            text: ''
        })
    }

     function checkEditable(key) {
        const { editable } = tHead.value.find(item => item.key === key);

        return editable;
     }

    window.addEventListener('click', removeEditInputApp, false)
</script>

<style lang="scss" scoped>
    .my-table {
        width: 100%;
        border-collapse: collapse;

        tr {
            height: 44px;
        }

        td {
            position: relative;
            text-align: center;
            cursor: pointer;
        }
    }
</style>