<template>
    <input 
        type="text"
        class="edit-input"
        :value="value"
        @input="onInput"
        @blur="onBlur"
        @click="onClick"
    />
</template>

//@input是input框中的值变化时触发的函数
//@blur是当元素失去焦点时触发的函数

<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        value: {
            type: String,
            default: ''
        },
        setValue: {
            type: Function,
            default: () => {}
        }
    });

    const inputValue = ref(props.value);
 
    const onInput = (e) => {
        inputValue.value = e.target.value.trim();
    }

    const onClick = (e) => {
        //阻止事件在DOM层次中的传播
        e.stopPropagation();
    } 

    const onBlur = () => {
        props.setValue(inputValue.value);
    }
</script>

<style lang="scss" scoped>
    .edit-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid orange;
        text-align: center;
        outline: none;
    }
</style>