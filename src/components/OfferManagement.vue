<template>
  <div class="main">
    <div>
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="upload">Upload Draft Letter</a-menu-item>
        <a-menu-item key="offer">Offer Letter</a-menu-item>
      </a-menu>
    </div>
    <div v-if="current == 'upload'">
      <br />
      <a-upload-dragger
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </a-upload-dragger>
    </div>
    <div v-if="current == 'offer'">
      <a-table :columns="columns" :data-source="datas">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="status" slot-scope="text, record">
          <a-tag
            v-for="values in record.cvstatus.status"
            :key="values"
            :color="
              values == 'Hire'
                ? 'green'
                : values == 'Reject'
                ? 'red'
                : 'geekblue'
            "
          >
            {{ values.toUpperCase() }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button
            type="primary"
            :disabled="!(record.action_status == 'Hire')"
          >
            Send Letter
          </a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../api";
export default {
  data() {
    return {
      current: ["upload"],
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Status",
          key: "status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      datas: [],
    };
  },

  mounted() {
    api.allUser().then((res) => {
      this.datas = res.data;
    });

    // fetch("http://localhost:3000/data")
    //   .then((res) => res.json())
    //   .then((data) => (this.datas = data))
    //   .catch((err) => console.log(err.message));
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>

<style></style>
