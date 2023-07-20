<template>
  <div class="profile">
    <!-- Main dashboard -->
    <a-layout
      id="components-layout-demo-custom-trigger"
      style="min-height: 100vh"
    >
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
          <a-menu-item
            key="1"
            @click="setSelectedComponent('DashboardProfile')"
          >
            <a-icon type="dashboard" theme="filled" />
            <span>Dashboard</span>
          </a-menu-item>
          <a-menu-item
            key="2"
            ref="profile"
            @click="setSelectedComponent('AddProfile')"
            :class="{ 'ant-menu-item-selected': isActive }"
          >
            <a-icon type="user" />
            <span>Upload Profile</span>
          </a-menu-item>
          <a-menu-item
            key="3"
            @click="setSelectedComponent('ScheduleInterview')"
          >
            <a-icon type="calendar" />
            <span>Schedule Interview</span>
          </a-menu-item>
          <a-menu-item key="4" @click="setSelectedComponent('OfferManagement')">
            <a-icon type="upload" />
            <span>Offer Management</span>
          </a-menu-item>
          <a-menu-item
            key="5"
            @click="setSelectedComponent('UploadAssessment')"
          >
            <a-icon type="carry-out" />
            <span>Upload Assessment </span>
          </a-menu-item>
          <a-menu-item
            key="6"
            @click="setSelectedComponent('EvaluateAssessment')"
          >
            <a-icon type="check-square" />
            <span>Evaluate Assessment</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!-- Collapsing the sidebar -->
        <a-layout-header style="background: #fff; padding: 0; position: sticky">
          <a-row :span="24">
            <a-col :span="21">
              <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="() => (collapsed = !collapsed)"
              />
            </a-col>
            <a-col :span="3" style="cursor: pointer" @click="logout('success')">
              Log out<a-icon style="margin-left: 5px" type="logout" />
            </a-col>
          </a-row>
        </a-layout-header>

        <!-- For the content of each sidebar navigation -->
        <a-layout-content
          :style="{
            margin: '24px',
            padding: '24px 24px ',
            background: '#fff',
          }"
        >
          <div>
            <component :is="selectedComponent">/</component>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import DashboardProfile from "./DashboardProfile.vue";
import ScheduleInterview from "./ScheduleInterview.vue";
import UploadAssessment from "./UploadAssessment.vue";
import EvaluateAssessment from "./EvaluateAssessment.vue";
import OfferManagement from "./OfferManagement.vue";
import AddProfile from "./AddProfile.vue";

import axios from "axios";
import api from "../api";
import bus from "../eventBus";

export default {
  data() {
    return {
      selectedComponent: "DashboardProfile",
      newData: {},
      collapsed: false,
      file: null,
      loading: false,
      message: "hello!",
      isActive: false,
    };
  },
  components: {
    DashboardProfile,
    ScheduleInterview,
    UploadAssessment,
    EvaluateAssessment,
    OfferManagement,
    AddProfile,
  },

  provide() {
    return {
      editProfileData: this.editData,
    };
  },

  methods: {
    setSelectedComponent(cmp) {
      this.selectedComponent = cmp;
      this.isActive = false;
    },

    onChange(value) {
      console.log("changed", value);
    },
    logout(type) {
      this.$router.push("/");
      this.$notification[type]({
        message: "Successful Logout",
        description: "You are successfully logged out",
      });
    },

    handleFile(e) {
      this.file = e.target.files[0];
      console.log("asdfsaf", this.file);
    },

    editData(record) {
      this.selectedComponent = AddProfile;
      this.$refs.profile.$el.click();
      this.$nextTick(() => {
        bus.$emit("recordData", record);
      });
    },

    handleSubmit() {},
  },
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-input .custom-input {
  width: 50px;
  height: 40px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
}
</style>
