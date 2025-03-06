<template>
  <div>
    <a-modal v-model:visible="visible" fullscreen :footer="false">
      <template #title>维护 {{ currentRow.name }} 字典数据</template>
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
            <a-form-item field="dict_name" label="字典标签">
              <a-input
                v-model="searchForm.dict_name"
                placeholder="请输入字典标签"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="dict_value" label="字典键值">
              <a-input
                v-model="searchForm.dict_value"
                placeholder="请输入字典键值"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="status" label="状态">
              <sa-select
                v-model="searchForm.status"
                dict="data_status"
                placeholder="请选择状态"
              />
            </a-form-item>
          </a-col>
        </template>
        <!-- Table 自定义渲染 -->
        <template #status="{ record }">
          <sa-switch
            v-model="record.status"
            @change="changeStatus($event, record.id)"
          ></sa-switch>
        </template>
      </sa-table>
    </a-modal>

    <!-- 编辑表单 -->
    <edit-form ref="editRef" @success="refresh" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { dict } from "@/api/system/dict";
import { Message } from "@arco-design/web-vue";
import EditForm from "./edit-data.vue";

const crudRef = ref();
const editRef = ref();
const visible = ref(false);
const currentRow = ref({});

const searchForm = ref({
  category_id: null,
  dict_name: "",
  dict_value: "",
  status: "",
  orderBy: "sort",
  orderType: "desc",
});

const changeStatus = async (status, id) => {
  const response = await dict.changeStatus({ id, status });
  if (response.code === 0) {
    Message.success(response.msg);
    crudRef.value.refresh();
  }
};

const open = (row) => {
  currentRow.value = row;
  searchForm.value.category_id = row.id;
  crudRef.value?.refresh();
  visible.value = true;
};

const options = reactive({
  api: dict.getPageList,
  rowSelection: { showCheckedAll: true },
  singleLine: true,
  add: {
    show: true,
    auth: ["/core/dictCategory/save"],
    func: async () => {
      editRef.value?.open();
      editRef.value?.setFormData({
        category_id: searchForm.value.category_id,
        code: searchForm.value.code,
      });
    },
  },
  edit: {
    show: true,
    auth: ["/core/dictCategory/update"],
    func: async (record) => {
      editRef.value?.open("edit");
      editRef.value?.setFormData(record);
    },
  },
  delete: {
    show: true,
    auth: ["/core/dictCategory/destroy"],
    func: async (params) => {
      const resp = await dict.deletesDictData(params);
      if (resp.code === 0) {
        Message.success(`删除成功！`);
        crudRef.value?.refresh();
      }
    },
  },
});

const columns = reactive([
  { title: "字典标签", dataIndex: "dict_name", width: 220 },
  { title: "字典键值", dataIndex: "dict_value", width: 220 },
  { title: "排序", dataIndex: "sort", width: 180 },
  { title: "状态", dataIndex: "status", dict: "status", width: 180 },
  { title: "创建时间", dataIndex: "create_time", width: 180 },
]);

const refresh = async () => {
  crudRef.value?.refresh();
};

defineExpose({ open });
</script>

<style scoped></style>
