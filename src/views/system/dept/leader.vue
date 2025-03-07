<template>
  <a-modal v-model:visible="visible" fullscreen :footer="false">
    <template #title>部门领导列表</template>
    <a-alert>部门的领导人可以跨部门设置</a-alert>
    <sa-table
      ref="crudRef"
      :options="options"
      :columns="columns"
      :searchForm="searchForm"
    >
      <!-- 搜索区 tableSearch -->
      <template #tableSearch>
        <a-col :span="8">
          <a-form-item field="user_name" label="用户名">
            <a-input
              v-model="searchForm.user_name"
              placeholder="请输入用户名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="nick_name" label="用户昵称">
            <a-input
              v-model="searchForm.nick_name"
              placeholder="请输入用户昵称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="status" label="状态">
            <sa-select
              v-model="searchForm.status"
              dict="data_status"
              placeholder="请选择状态"
              allow-clear
            />
          </a-form-item>
        </a-col>
      </template>
      <!-- 操作前置扩展 -->
      <template #tableBeforeButtons>
        <sa-user
          text="新增领导"
          :onlyId="false"
          :isEcho="false"
          v-model="users"
          @success="selectedSuccess"
        />
      </template>
    </sa-table>
  </a-modal>
</template>

<script setup>
import { ref, reactive } from "vue";
import api from "@/api/system/dept";
import { Message } from "@arco-design/web-vue";

const visible = ref(false);
const crudRef = ref();
const deptId = ref();
const users = ref([]);

const searchForm = ref({
  user_name: "",
  nick_name: "",
  dept_id: null,
  status: "",
});

const open = (row) => {
  deptId.value = row.id;
  visible.value = true;
  searchForm.value.dept_id = deptId.value;
  crudRef.value?.refresh();
};

const selectedSuccess = async () => {
  const data = users.value.map((item) => {
    return { user_id: item.id, user_name: item.user_name };
  });
  const response = await api.addLeader({ dept_id: deptId.value, users: data });
  if (response.code === 0) {
    users.value = [];
    crudRef.value?.refresh();
  }
};

const options = reactive({
  api: api.getLeaderList,
  height: 680,
  rowSelection: { showCheckedAll: true },
  singleLine: true,
  delete: {
    show: true,
    auth: ["/core/dept/destroy"],
    func: async (params) => {
      const resp = await api.delLeader(params);
      if (resp.code === 0) {
        Message.success(`删除成功！`);
        crudRef.value?.refresh();
      }
    },
  },
});

const columns = reactive([
  { title: "用户名", dataIndex: "user_info.user_name" },
  { title: "用户昵称", dataIndex: "user_info.nick_name" },
  { title: "手机", dataIndex: "user_info.phone" },
  { title: "邮箱", dataIndex: "user_info.email" },
  {
    title: "状态",
    dataIndex: "user_info.status",
    width: 100,
    dict: "data_status",
  },
]);

defineExpose({ open });
</script>
