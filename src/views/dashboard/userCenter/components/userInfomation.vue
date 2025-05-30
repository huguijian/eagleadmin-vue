<template>
  <a-form class="w-full md:w-full mt-3" :model="formData" @submit="modifyInfo">
    <a-form-item label="账户名" label-col-flex="80px">
      <a-input disabled :default-value="formData.user_name" allow-clear />
    </a-form-item>
    <a-form-item label="昵称" label-col-flex="80px">
      <a-input v-model="formData.nick_name" allow-clear />
    </a-form-item>
    <a-form-item label="手机" label-col-flex="80px">
      <a-input v-model="formData.phone" allow-clear />
    </a-form-item>
    <a-form-item label="邮箱" label-col-flex="80px">
      <a-input v-model="formData.email" allow-clear />
    </a-form-item>
    <!--
    <a-form-item label="个人签名" label-col-flex="80px">
      <a-textarea v-model="userInfo.signed" :max-length="255" class="h-28" show-word-limit allow-clear />
    </a-form-item>
    -->
    <a-form-item label-col-flex="80px">
      <a-button html-type="submit" type="primary">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/store";
import { Message } from "@arco-design/web-vue";
import user from "@/api/system/user";

const userStore = useUserStore();
const formData = reactive({
  id: userStore?.user?.id || "",
  user_name: userStore?.user?.user_name || "",
  nick_name: userStore.user ? userStore.user.nick_name : "",
  phone: userStore?.user?.phone || "",
  email: userStore?.user?.email || "",
});

const modifyInfo = async (data) => {
  data.values.avatar = userStore.user.avatar;
  const response = await user.savePersonal(data.values);
  if (response.code === 0) {
    Message.success(response.msg);
    userStore.user = data.values;
    return;
  }
};
</script>
