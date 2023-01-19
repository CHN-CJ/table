<template>
  // 向组件中传值
  // 注册事件，子组件可以接收并传递参数给父组件
  <my-table
    :data="tableData"
    @submit="editData"
  ></my-table>
</template>

<script setup>
  // import MyTable from '../modules/my-ui/MyTable'
  import { ref } from 'vue';

  //包裹对象
  /**
   * tableData: {
   *  tHead:[{}，{}],
   *  tBody:[{}，{}]
   * }
   */
  const tableData = ref({
    tHead: [
      {
        key: 'id',
        text: '学号',
        editable: false
      },
      {
        key: 'name',
        text: '姓名',
        editable: false
      },
      {
        key: 'age',
        text: '年龄',
        editable: false
      },
      {
        key: 'chinese',
        text: '语文',
        editable: true
      },
      {
        key: 'math',
        text: '数学',
        editable: true
      },
      {
        key: 'english',
        text: '英语',
        editable: true
      }
    ],
    tBody: [
      {
        id: 1,
        name: '张三',
        age: 16,
        chinese: 121,
        math: 98,
        english: 138
      },
      {
        id: 2,
        name: '李四',
        age: 17,
        chinese: 91,
        math: 147,
        english: 118
      },
      {
        id: 3,
        name: '王五',
        age: 18,
        chinese: 129,
        math: 139,
        english: 141
      }
    ]
  })

  //需要传递的参数
  //传递函数
  const editData = ({ index, key, value, text }, removeInput) => {
    if (tableData.value.tBody[index][key] !== value) {
      // 含有确定或取消的弹框
      // 会返回 true 或 false3
      const cfm = window.confirm(`
        确定要将数据下标为【${ index }】项
        【${ text }】字段的内容修改为【${ value }】吗？
      `);

       if (cfm) {
        tableData.value.tBody = tableData.value.tBody.map((item, idx) => {
          index === idx && (item[key] = value);
          return item;
        })
       } else {
          removeInput();
       }
    }
  }
</script>

<style lang="scss">

</style>
