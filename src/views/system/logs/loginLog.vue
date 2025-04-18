<template>
  <div class="ma-content-block lg:flex justify-between">
    <!-- CRUD 组件 -->
    <sa-table
      ref="crudRef"
      :options="options"
      :columns="columns"
      :searchForm="searchForm"
    >
      <!-- 搜索区 tableSearch -->
      <template #tableSearch>
        <a-col :span="8">
          <a-form-item field="user_name" label="登录用户">
            <a-input
              v-model="searchForm.user_name"
              placeholder="请输入登录用户"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="ip" label="登录IP">
            <a-input v-model="searchForm.ip" placeholder="请输入登录IP" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="status" label="状态">
            <a-select
              v-model="searchForm.status"
              :options="selectData"
              placeholder="请选择状态"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="16">
          <a-form-item field="login_time" label="登录时间">
            <a-range-picker
              v-model="searchForm.login_time"
              showTime
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </template>

      <!-- Table 自定义渲染 -->
      <template #status="{ record }">
        <a-tag v-if="record.status == 1" color="green">成功</a-tag>
        <a-tag v-else color="red">失败</a-tag>
      </template>
    </sa-table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Message } from "@arco-design/web-vue";
import loginLog from "@/api/system/loginLog";

const crudRef = ref();

const selectData = [
  { label: "成功", value: 1 },
  { label: "失败", value: 2 },
];

const searchForm = ref({
  name: "",
  status: "",
  login_time: [],
  orderBy: "login_time",
  orderType: "desc",
});

const options = reactive({
  api: loginLog.getPageList,
  pageLayout: "fixed",
  rowSelection: { showCheckedAll: true },
  operationColumnWidth: 100,
  delete: {
    show: true,
    auth: ["/core/logs/deleteLoginLog"],
    func: async (params) => {
      const resp = await loginLog.deletes(params);
      if (resp.code === 0) {
        Message.success(`删除成功！`);
        crudRef.value?.refresh();
      }
    },
  },
});

const columns = reactive([
  { title: "登录用户", dataIndex: "user_name", width: 120 },
  { title: "登录状态", dataIndex: "status", width: 100 },
  { title: "登录IP", dataIndex: "ip", width: 150 },
  { title: "登录地点", dataIndex: "ip_location", width: 150 },
  { title: "操作系统", dataIndex: "os", width: 140 },
  { title: "浏览器", dataIndex: "browser", width: 140 },
  { title: "登录信息", dataIndex: "message", width: 120 },
  { title: "登录时间", dataIndex: "login_time", width: 180 },
]);

const initPage = async () => {};

const refresh = async () => {
  crudRef.value?.refresh();
};

onMounted(async () => {
  initPage();
  refresh();
});
</script>
