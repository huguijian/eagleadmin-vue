<template>
  <component
    :is="'a-modal'"
    v-model:visible="visible"
    :width="600"
    :title="title"
    :mask-closable="false"
    :ok-loading="loading"
    @cancel="close"
    @before-ok="submit"
  >
    <!-- 表单信息 start -->
    <a-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :auto-label-width="true"
    >
      <a-form-item label="智能体名称" field="name">
        <a-input v-model="formData.name" placeholder="请输入智能体名称" />
      </a-form-item>
      <a-form-item label="API" field="API">
        <a-input v-model="formData.api" placeholder="请输入API接口地址" />
      </a-form-item>
      <a-form-item label="API-KEY" field="api_key">
        <a-input v-model="formData.api_key" placeholder="请输入API KEY" />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <sa-select
          v-model="formData.ai_model_status"
          dict="ai_model_status"
          placeholder="请选择状态"
        />
      </a-form-item>
    </a-form>
    <!-- 表单信息 end -->
  </component>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { Message } from "@arco-design/web-vue";
import api from "../../api/aihelper/agent";

const emit = defineEmits(["success"]);

// 引用定义
const formRef = ref();
const mode = ref("");
const visible = ref(false);
const loading = ref(false);

let title = computed(() => {
  return "智能体" + (mode.value == "add" ? "-新增" : "-编辑");
});
const formData = reactive({
  id: "",
  name: "",
  handler: "",
  type: "",
  models: "",
  priority: "",
  settings: "",
  balance_visible: false,
  ai_model_status: "",
});

// 验证规则
const rules = {
  name: [{ required: true, message: "名称不能为空" }],
};

// 打开弹框
const open = async (type = "add") => {
  mode.value = type;
  visible.value = true;
  formRef.value.resetFields();
  await initPage();
};

// 初始化页面数据
const initPage = async () => {};

// 设置数据
const setFormData = async (data) => {
  for (const key in formData) {
    if (data[key] != null && data[key] != undefined) {
      formData[key] = data[key];
    }
  }
};

// 数据保存
const submit = async (done) => {
  const validate = await formRef.value?.validate();
  if (!validate) {
    loading.value = true;
    let data = { ...formData };
    let result = {};
    if (mode.value === "add") {
      // 添加数据
      data.id = undefined;
      result = await api.insert(data);
    } else {
      // 修改数据
      result = await api.update(data);
    }
    if (result.code === 0) {
      Message.success("操作成功");
      emit("success");
      done(true);
    }
    // 防止连续点击提交
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  done(false);
};

// 关闭弹窗
const close = () => (visible.value = false);

defineExpose({ open, setFormData });
</script>
