<template>
  <a-modal v-model:visible="visible" @cancel="close" @before-ok="submit">
    <template #title>数据权限</template>
    <a-form :model="form">
      <a-form-item label="角色名称" field="name">
        <a-input disabled v-model="form.name" />
      </a-form-item>
      <a-form-item label="角色标识" field="code">
        <a-input disabled v-model="form.code" />
      </a-form-item>
      <a-form-item label="数据边界" field="data_scope">
        <a-select v-model="form.data_scope">
          <a-option v-for="item in scopeList" :key="item" :value="item.value">
            {{ item.label }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="部门列表"
        field="dept_ids"
        v-show="form.data_scope == '2'"
      >
        <a-spin :loading="loading" tip="部门加载中..." class="w-full">
          <div class="w-full">
            <a-space class="mt-1.5" size="large">
              <a-checkbox @change="handlerExpand">展开/折叠</a-checkbox>
              <a-checkbox @change="handlerSelect">全选/全不选</a-checkbox>
              <a-checkbox v-model="cancelLinkage" @change="handlerLinkage"
                >关闭父子级联动</a-checkbox
              >
            </a-space>
            <div class="tree-container">
              <sa-tree-slider
                ref="tree"
                :data="deptList"
                checkable
                :fieldNames="{ title: 'label', key: 'id' }"
                searchPlaceholder="过滤部门"
                v-model:checked-keys="selectKeys"
                :check-strictly="cancelLinkage"
                :virtual-list-props="{ height: 300 }"
                @click="handlerClick"
              />
            </div>
          </div>
        </a-spin>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref } from "vue";
import commonApi from "@/api/common";
import role from "@/api/system/role";
import { Message } from "@arco-design/web-vue";

const visible = ref(false);
const loading = ref(true);
const deptList = ref([]);
const selectKeys = ref([]);
const cancelLinkage = ref(false);
const tree = ref();
const form = ref({ name: undefined, code: undefined, data_scope: 1 });
const scopeList = ref([
  { value: 1, label: "全部数据权限" },
  { value: 2, label: "自定义数据权限" },
  { value: 3, label: "本部门数据权限" },
  { value: 4, label: "本部门及以下数据权限" },
  { value: 5, label: "本人数据权限" },
]);

const emit = defineEmits(["success"]);

const open = async (row) => {
  visible.value = true;
  form.value = {
    id: row.id,
    name: row.name,
    code: row.code,
    data_scope: row.data_scope,
  };
  handlerExpand(false);
  handlerSelect(false);
  handlerLinkage(false);
  await setData(row.id);
};

const handlerExpand = (value) => {
  tree.value.saTree.expandAll(value);
};

const handlerSelect = (value) => {
  tree.value.saTree.checkAll(value);
};

const handlerLinkage = (value) => {
  cancelLinkage.value = value;
};

const handlerClick = (value) => {
  const t = tree.value.saTree;
  const nodes = t.getExpandedNodes().map((item) => item.id);
  t.expandNode(value, nodes.includes(value[0]) ? false : true);
};

const setData = async (roleId) => {
  loading.value = true;
  const deptResponse = await commonApi.commonGet(
    "/core/auth/dept/select?tree=true&auth=true"
  );
  deptList.value = deptResponse.data.items;
  const roleResponse = await role.getDeptByRole(roleId);
  selectKeys.value = roleResponse.data.depts.map((item) => item.id);
  selectKeys.value.length > 0 && handlerLinkage(true);
  loading.value = false;
};

const submit = async (done) => {
  const nodes = tree.value.saTree.getCheckedNodes();
  const ids = nodes.map((item) => item.id);
  const response = await role.updateDataPermission(form.value.id, {
    data_scope: form.value.data_scope,
    dept_ids: ids,
  });
  response.code === 0 && Message.success(response.msg);
  emit("success");
  done(true);
};

const close = () => (visible.value = false);

defineExpose({ open });
</script>

<style scoped>
.tree-container {
  border: 1px solid var(--color-fill-2);
  max-height: 350px;
  padding-bottom: 8px;
  margin-top: 5px;
}
</style>
