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
          <a-form-item label="知能体名称" field="name">
            <a-tree-select
              v-model="searchForm.name"
              :data="[]"
              placeholder="请输入智能体名称"
              allow-clear
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
  { title: "智能体名称", dataIndex: "name", width: 180 },
  { title: "API", dataIndex: "api", width: 180 },
  { title: "API-KEY", dataIndex: "api_key", width: 180 },
  { title: "输入参数", dataIndex: "input", width: 180 },
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
