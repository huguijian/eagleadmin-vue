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
            <a-input v-model="searchForm.name" placeholder="请输入知能体名称" />
          </a-form-item>
        </a-col>
      </template>
      <template #tableAfterButtons>
        <a-button type="primary" @click="syncAgent">同步</a-button>
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
  api: api.select,
  recycleApi: api.select,
  rowSelection: { showCheckedAll: true },
  operationColumn: false,
  add: {
    show: false,
    auth: [""],
    func: async () => {
      editRef.value?.open();
    },
  },
  edit: {
    show: false,
    auth: [""],
    func: async (record) => {
      editRef.value?.open("edit");
      editRef.value?.setFormData(record);
    },
  },
  delete: {
    show: false,
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
    show: false,
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
  { title: "app_id", dataIndex: "app_id", width: 180 },
  { title: "智能体名称", dataIndex: "name", width: 180 },
  { title: "应用类型", dataIndex: "mode", width: 180 },
  { title: "图标", dataIndex: "icon", width: 180 },
  { title: "流程ID", dataIndex: "workflow_id", width: 180 },
  { title: "描述", dataIndex: "description", width: 180 },
]);

// 页面数据初始化
const initPage = async () => {};

// SaTable 数据请求
const refresh = async () => {
  crudRef.value?.refresh();
};

const syncAgent = async () => {
  const resp = await api.syncAgent();
  if (resp.code === 0) {
    Message.success(`同步成功！`);
    crudRef.value?.refresh();
  }
};

// 页面加载完成执行
onMounted(async () => {
  initPage();
  refresh();
});
</script>
