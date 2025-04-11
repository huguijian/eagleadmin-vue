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
          <a-form-item label="角色名称" field="name">
            <a-input v-model="searchForm.name" placeholder="请输入角色名称" />
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
import api from "../../api/aihelper/agent";

// 引用定义
const crudRef = ref();
const editRef = ref();

// 搜索表单
const searchForm = ref({
  name: "",
  handler: "",
});

// SaTable 基础配置
const options = reactive({
  api: api.getPageList,
  recycleApi: api.getRecyclePageList,
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
      const resp = await api.delete(params);
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
  recovery: {
    show: true,
    auth: [""],
    func: async (params) => {
      const resp = await api.recovery(params);
      if (resp.code === 0) {
        Message.success(`恢复成功！`);
        crudRef.value?.refresh();
      }
    },
  },
});

// SaTable 列配置
const columns = reactive([
  { title: "ID", dataIndex: "id", width: 180 },
  { title: "名称", dataIndex: "name", width: 180 },
  { title: "头像", dataIndex: "avatar", width: 180 },
  { title: "简介", dataIndex: "desc", width: 180 },
  { title: "角色提示", dataIndex: "prompt", width: 180 },
  { title: "问候语", dataIndex: "greeting", width: 180 },
  { title: "模型", dataIndex: "model", width: 180 },
  { title: "预安装", dataIndex: "preinstalled", width: 180 },
  { title: "安装量", dataIndex: "installed", width: 180 },
  { title: "分类", dataIndex: "category", width: 180 },
  { title: "状态", dataIndex: "status", width: 180 },
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
