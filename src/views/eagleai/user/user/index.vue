<template>
  <div class="ma-content-block">
    <sa-table
      ref="crudRef"
      :options="options"
      :columns="columns"
      :searchForm="searchForm"
    >
      <!-- 搜索区 tableSearch -->
      <template #tableSearch>
        <a-col :span="8">
          <a-form-item label="用户名" field="user_name">
            <a-input
              v-model="searchForm.user_name"
              placeholder="请输入用户名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="昵称" field="nick_name">
            <a-input
              v-model="searchForm.nick_name"
              placeholder="请输入用昵称"
            />
          </a-form-item>
        </a-col>
      </template>
    </sa-table>

    <!-- 编辑表单 -->
    <edit-form ref="editRef" @success="refresh" />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import EditForm from "./edit.vue";
import api from "../../api/user/user";

// 引用定义
const crudRef = ref();
const editRef = ref();

// 搜索表单
const searchForm = ref({
  user_name: "",
  nick_name: "",
});

// SaTable 基础配置
const options = reactive({
  api: api.select,
  recycleApi: api.select,
  rowSelection: { showCheckedAll: true },
  add: {
    show: true,
    auth: [""],
    func: async () => {
      editRef.value?.open();
    },
  },
  edit: {
    show: true,
    auth: [""],
    func: async (record) => {
      editRef.value?.open("edit");
      editRef.value?.setFormData(record);
    },
  },
  delete: {
    show: true,
    auth: [""],
    func: async (params) => {
      const resp = await api.delUser(params);
      if (resp.code === 0) {
        Message.success(`删除成功！`);
        crudRef.value?.refresh();
      }
    },
    realAuth: [""],
    realFunc: async (params) => {
      const resp = await api.realDestroy(params);
      if (resp.code === 0) {
        Message.success(`销毁成功！`);
        crudRef.value?.refresh();
      }
    },
  },
});

// SaTable 列配置
const columns = reactive([
  { title: "用户名", dataIndex: "user_name", width: 180 },
  { title: "昵称", dataIndex: "nick_name", width: 180 },
  { title: "性别", dataIndex: "sex_txt", width: 180 },
  { title: "头像", dataIndex: "avatar", width: 180 },
  { title: "邮箱", dataIndex: "email", width: 180 },
  { title: "手机", dataIndex: "phone", width: 180 },
  { title: "状态", dataIndex: "status_txt", width: 180 },
]);

// 页面数据初始化
const initPage = async () => {};

// SaTable 数据请求
const refresh = async () => {
  crudRef.value?.refresh();
};

// 页面加载完成执行
onMounted(async () => {
  initPage();
  refresh();
});
</script>
