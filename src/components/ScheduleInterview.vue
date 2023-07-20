<template>
  <div>
    <a-row>
      <a-col :span="21">
        <!-- For searching people with status -->
        <a-input
          placeholder="Search status"
          style="width: 200px; margin-bottom: 5px; margin-right: 5px"
          @search="onSearchStatus"
          v-model="searchStatus"
        />
      </a-col>
      <a-col :span="1" type="flex" justify="end">
        <a-button style="width: 90px" @click="() => handlingReset()">
          Reset
        </a-button>
      </a-col>
    </a-row>
    <a-table :columns="columns" :data-source="filteredData">
      <span slot="date" slot-scope="text, record">
        {{ record.cvstatus.interview_date }}
      </span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="(tag, i) in tags.split(',')"
          :key="i"
          :color="
            tag.toUpperCase() == 'REACTJS'
              ? 'geekblue'
              : tag.toUpperCase() == 'VUEJS'
              ? 'green'
              : tag.toUpperCase() == 'PHP'
              ? 'purple'
              : 'volcano'
          "
          style="margin-bottom: 3px"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="status" slot-scope="text, record">
        {{ record.cvstatus.status }}
      </span>
      <!-- <span slot="action" slot-scope="text, record">
        <a-button type="primary" :disabled="record.status == 'Not Shortlisted'">
          Send Mail
        </a-button>
      </span> -->
    </a-table>
  </div>
</template>

<script>
import axios from "axios";
import api from "../api.js";

export default {
  data() {
    return {
      searchStatus: "",
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
          title: "Tags",
          key: "technology",
          dataIndex: "technology",
          scopedSlots: { customRender: "tags" },
        },
        {
          title: "Date",
          key: "date",
          dataIndex: "date",
          scopedSlots: { customRender: "date" },
        },
        {
          title: "Status",
          key: "status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        // {
        //   title: "Action",
        //   key: "action",
        //   scopedSlots: { customRender: "action" },
        // },
      ],
      datas: [],
    };
  },
  mounted() {
    // axios.get("http://192.168.1.145:8000/api/admin/dashboard").then((res) => {
    //   this.datas = res.data;
    //   console.log("test", res.data);
    // });

    // axios.get("http://192.168.1.146:8001/api/admin/alluser").then((res) => {
    //   this.datas = res.data;
    //   console.log(res.data);
    // });

    api.allUser().then((res) => {
      this.datas = res.data;
    });

    // fetch("http://localhost:3000/data")
    //   .then((res) => res.json())
    //   .then((data) => (this.datas = data))
    //   .catch((err) => console.log(err.message));
  },
  computed: {
    filteredData() {
      const searchStatuss = this.searchStatus.toLowerCase();
      return this.datas.filter((record) => {
        const statusMatch = record.cvstatus.status
          .toLowerCase()
          .includes(searchStatuss);
        return statusMatch;
      });
    },
  },
  methods: {
    // test(id) {
    //   return status.toLowerCase() === "not shortlisted";
    //   console.log("id", id);
    // },
    onSearchStatus(value) {
      this.searchStatus = value;
    },
    handlingReset() {
      this.searchStatus = "";
    },
  },
};
</script>

<style></style>
