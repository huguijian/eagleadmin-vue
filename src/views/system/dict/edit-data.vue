<template>
  <component
    is="a-modal"
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
      <a-form-item label="字典标签" field="dict_name">
        <a-input v-model="formData.dict_name" placeholder="请输入字典标签" />
      </a-form-item>
      <a-form-item label="字典键值" field="dict_value">
        <a-input v-model="formData.dict_value" placeholder="请输入字典键值" />
      </a-form-item>
      <a-form-item label="排序" field="sort">
        <a-input-number v-model="formData.sort" placeholder="请输入排序" />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <sa-radio
          v-model="formData.status"
          dict="data_status"
          placeholder="请选择状态"
        />
      </a-form-item>
      <a-form-item label="备注" field="remark">
        <a-textarea v-model="formData.remark" placeholder="请输入备注" />
      </a-form-item>
    </a-form>
    <!-- 表单信息 end -->
  </component>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { Message } from "@arco-design/web-vue";
import { dict } from "@/api/system/dict";

const emit = defineEmits(["success"]);

// 引用定义
const formRef = ref();
const mode = ref("");
const visible = ref(false);
const loading = ref(false);

let title = computed(() => {
  return "字典数据" + (mode.value == "add" ? "-新增" : "-编辑");
});

// 表单信息
const formData = reactive({
  id: "",
  category_id: null,
  dict_code: "",
  dict_name: "",
  dict_value: "",
  status: 1,
  sort: 100,
  remark: "",
});

// 验证规则
const rules = {
  label: [{ required: true, message: "字典标签不能为空" }],
  value: [{ required: true, message: "字典键值不能为空" }],
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
      result = await dict.saveDictData(data);
    } else {
      // 修改数据
      result = await dict.updateDictData(data);
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
