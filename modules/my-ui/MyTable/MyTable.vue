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
    import { createApp, onDeactivated, toRefs } from "vue";
    import EditInput from "./EditInput";

    let editInputApp = null;

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

    const { tHead, tBody} = toRefs(props.data);

    function showEditInput(event, key, index) {
        // console.log(event, key, index);
        editInputApp && removeEditInputApp(editInputApp);

        //拿到 td
        const target = event.target;
        const oFrag = document.createDocumentFragment();
        
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
    }

    //组件传递过来的value
    function setValue(value) {

    }

    function removeEditInputApp(app) {
        app && app.unmount();
    }

    window.addEventListener('click', () => removeEditInputApp(editInputApp), false)
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