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

//DOM 事件
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

    //  所有的 props 都遵循着 单项绑定原则 ，props因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。
    //  prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。
    //  最好是新定义一个局部数据属性，从 props 上获取初始值即可

    const inputValue = ref(props.value);
 
    const onInput = (e) => {
        // 获取 input 上的数据：e.target.value
        inputValue.value = e.target.value.trim();
    }

    const onClick = (e) => {
        //阻止事件在DOM层次中的传播
        e.stopPropagation();
    } 

    const onBlur = () => {
        console.log(props.setValue);
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