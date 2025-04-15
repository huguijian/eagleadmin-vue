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
          <a-form-item label="角色" field="name">
            <a-input v-model="searchForm.name" placeholder="请输入角色名称" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="模型" field="model">
            <sa-select
              v-model="searchForm.model"
              dict="ai_model_type"
              placeholder="请选择模型类型"
            />
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item label="内容" field="content">
            <a-input v-model="searchForm.content" placeholder="请输入内容" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="IP" field="ip">
            <a-input v-model="searchForm.ip" placeholder="请输入IP地址" />
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
import api from "../../api/aihelper/message";

// 引用定义
const crudRef = ref();
const editRef = ref();

// 搜索表单
const searchForm = ref({
  name: "",
  model: "",
  content: "",
  ip: "",
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
  { title: "用户", dataIndex: "nick_name", width: 180 },
  { title: "角色", dataIndex: "role", width: 180 },
  { title: "模型", dataIndex: "model", width: 180 },
  { title: "内容", dataIndex: "input", width: 180 },
  { title: "IP", dataIndex: "status", width: 180 },
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
