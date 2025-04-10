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
      <a-form-item label="用户名" field="user_name">
        <a-input v-model="formData.user_name" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="昵称" field="nick_name">
        <a-input v-model="formData.nick_name" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item label="密码" field="password">
        <a-input v-model="formData.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item label="性别" field="sex">
        <sa-select v-model="formData.sex" dict="sex" placeholder="请选择性别" />
      </a-form-item>
      <a-form-item label="头像" field="avatar">
        <sa-upload-image v-model="formData.avatar" :rounded="true" />
      </a-form-item>
      <a-form-item label="邮箱" field="email">
        <a-input v-model="formData.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item label="手机" field="phone">
        <a-input v-model="formData.phone" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item label="状态" field="status">
        <sa-select
          v-model="formData.status"
          dict="ai_user_status"
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
import api from "../../api/user/user";

const emit = defineEmits(["success"]);

// 引用定义
const formRef = ref();
const mode = ref("");
const visible = ref(false);
const loading = ref(false);

let title = computed(() => {
  return "会员" + (mode.value == "add" ? "-新增" : "-编辑");
});
const formData = reactive({
  id: "",
  user_name: "",
  nick_name: "",
  password: "",
  avatar: "",
  sex: "",
  phone: "",
  status: "1",
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
      result = await api.addUser(data);
    } else {
      // 修改数据
      result = await api.editUser(data);
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
