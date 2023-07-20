<template>
  <div>
    <!-- This specific is for popup when clicked on row of the data contents -->
    <div>
      <a-modal
        v-model="visible"
        title="Details"
        :dialog-style="{ top: '20px' }"
        @ok="handleOk"
        footer=""
      >
        <!-- <a-descriptions>
          <a-descriptions-item label="Resume">
            <div
              v-if="
                documentURL.endsWith('jpg') ||
                documentURL.endsWith('jpeg') ||
                documentURL.endsWith('png')
              "
            >
              <img :src="documentURL" height="80" alt="img" />
            </div>
            <div v-else>
              <a :href="documentURL" target="_blank">View PDF</a>
            </div>
          </a-descriptions-item>
          <a-descriptions-item label="Username">
            {{ showData.name }}
          </a-descriptions-item>
          <a-descriptions-item label="Telephone">
            {{ showData.telephone }}
          </a-descriptions-item>
          <a-descriptions-item label="Live">
            {{ showData.address }}
          </a-descriptions-item>
          <a-descriptions-item label="Remark">
            {{ showData.remark }}
          </a-descriptions-item>
          <a-descriptions-item label="Address">
            {{ showData.address }}
          </a-descriptions-item>
          <a-descriptions-item label="Skills">
            {{ showData.skills }}
          </a-descriptions-item>
          <a-descriptions-item label="Email">
            {{ showData.email }}
          </a-descriptions-item>
          <a-descriptions-item label="Status" span="3">
            {{ action_status }}
          </a-descriptions-item>
        </a-descriptions> -->
        <a-row>
          <a-col span="15">
            <a-descriptions>
              <a-descriptions-item label="Resume">
                <div
                  class="document"
                  v-if="
                    documentURL.endsWith('jpg') ||
                    documentURL.endsWith('jpeg') ||
                    documentURL.endsWith('png')
                  "
                >
                  <img :src="documentURL" alt="img" />
                </div>
                <div v-else>
                  <a :href="documentURL" target="_blank">View PDF</a>
                </div>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col span="9" style="margin-left: 1px">
            <a-descriptions>
              <a-descriptions-item label="Username" span="24">
                {{ showData.name }}
              </a-descriptions-item>
              <a-descriptions-item label="Telephone" span="24">
                {{ showData.telephone }}
              </a-descriptions-item>
              <a-descriptions-item label="Live" span="24">
                {{ showData.address }}
              </a-descriptions-item>
              <a-descriptions-item label="Remark" span="24">
                {{ showData.remark }}
              </a-descriptions-item>
              <a-descriptions-item label="Address" span="24">
                {{ showData.address }}
              </a-descriptions-item>
              <a-descriptions-item label="Skills" span="24">
                {{ showData.skills }}
              </a-descriptions-item>
              <a-descriptions-item label="Email" span="24">
                {{ showData.email }}
              </a-descriptions-item>
              <a-descriptions-item label="Status" span="24">
                {{ action_status }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
        </a-row>
      </a-modal>
    </div>
    <!-- End of the popup div -->

    <!-- Row is for the searching field where you can search by name, status, and skills -->
    <a-row>
      <a-col :span="21">
        <!-- For searching people with name -->
        <a-input
          placeholder="Search name"
          style="width: 200px; margin-bottom: 5px; margin-right: 5px"
          @search="onSearchName"
          v-model="searchText"
        />
        <!-- For searching people with experience -->
        <!-- <a-input
          placeholder="Search by experience"
          style="width: 200px; margin-bottom: 5px; margin-right: 5px"
          @search="onSearchExperience"
          v-model="searchExperience"
        /> -->
        <!-- For searching people with tags -->
        <a-input
          placeholder="Search tag"
          style="width: 200px; margin-bottom: 5px; margin-right: 5px"
          @search="onSearchTag"
          v-model="searchTag"
        />
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
    <!-- End of the row -->
    <br />

    <!-- This is where data is being displayed -->
    <a-table :data-source="filteredData" :columns="columns">
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
      <span slot="date">
        <a-date-picker @change="onChange" />
      </span>
      <span slot="status" slot-scope="text, record">
        <a-select default-value="select" style="width: 120px">
          <a-select-option
            @click="selectPeople(record, 'shortlisted')"
            value="shortlist"
          >
            Shortlist
          </a-select-option>
          <a-select-option
            @click="selectPeople(record, 'not-shortlisted')"
            value="notShortlist"
          >
            Not Shortlisted
          </a-select-option>
          <a-select-option
            @click="selectPeople(record, 'first-interview')"
            value="firstInterview"
          >
            First Interview
          </a-select-option>
          <a-select-option
            @click="selectPeople(record, 'second-interview')"
            value="secondInterview"
          >
            Second Interview
          </a-select-option>
          <a-select-option @click="selectPeople(record, 'hired')" value="hired">
            Hired
          </a-select-option>
          <a-select-option
            @click="selectPeople(record, 'rejected')"
            value="rejected"
          >
            Rejected
          </a-select-option>
        </a-select>
      </span>
      <span slot="action" slot-scope="text, record">
        <a href="#" @click="showModal(record)">
          <a-icon type="eye" />
        </a>
        <a-divider type="vertical" />
        <a href="#">
          <a-icon type="edit" @click="editProfileData(record)" />
        </a>
        <a-divider type="vertical" />

        <a-popconfirm
          title="Are you sure delete this data?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteData(record.id)"
          @cancel="cancel"
        >
          <a href="#"><a-icon type="delete" :loading="loading" /> </a>
        </a-popconfirm>
      </span>
    </a-table>
    <!-- End of the table for displaying data -->
  </div>
</template>

<script>
import axios from "axios";
import api from "../api";
import bus from "../eventBus";

export default {
  data() {
    return {
      loading: false,
      // For displaying data inside the clicked row
      name: "",
      telephone: "",
      live: "",
      remark: "",
      address: "",
      skills: "",
      email: "",
      action_status: "",
      // --------------------------------------------------------------------------------
      date: "",
      searchText: "",
      // searchExperience: "",
      searchStatus: "",
      searchTag: "",
      searchInput: null,
      searchedColumn: "",
      visible: false,
      showData: {},
      datas: [],
      tagvalue: [],
      columns: [
        {
          title: "S.N",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Experience",
          dataIndex: "experience",
          key: "experience",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
          // ellipsis: true,
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
          width: "18%",
        },
        {
          title: "Status",
          key: "status",
          dataIndex: "status",
          // scopedslots helps in customizing the value in template by its use
          scopedSlots: {
            customRender: "status",
          },
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
          width: "12%",
        },
      ],
    };
  },
  created() {
    this.fetchTable();
  },

  inject: ["editProfileData"],

  computed: {
    documentURL() {
      return "http://192.168.1.75:8000/images/cv/" + this.showData.document;
    },
    filteredData() {
      const searchText = this.searchText.toLowerCase();
      const searchTag = this.searchTag.toLowerCase();
      // const searchExperience = this.searchExperience;
      // const searchStatus = this.searchStatus.toLowerCase();

      return this.datas.filter((record) => {
        const nameMatch = record.name.toLowerCase().includes(searchText);
        const tagMatch = record.technology.toLowerCase().includes(searchTag);
        // const experienceMatch = record.experience.includes(searchExperience);
        // const statusMatch = record.status.toLowerCase().includes(searchStatus);
        // const tagMatch = record.tags.some((tag) => {
        //   return tag.toLowerCase().includes(searchTag);
        // });

        return nameMatch && tagMatch;
        // return nameMatch && statusMatch && tagMatch;
      });
    },
  },
  methods: {
    show(record) {},

    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handlingReset() {
      this.searchText = "";
      this.searchTag = "";
      // this.searchExperience = "";
      // this.searchStatus = "";
    },

    // handleReset(clearFilters) {
    //   clearFilters();
    //   this.searchText = "";
    //   this.searchTag = "";
    //   this.searchExperience = "";
    //   this.searchStatus = "";
    // },

    fetchTable() {
      api.fetchDataTable().then((res) => {
        this.datas = res.data.map((h, i) => {
          return {
            key: i + 1,
            ...h,
          };
        });
      });
    },

    handleChange() {},
    onSearchName(value) {
      this.searchText = value;
    },
    // onSearchExperience(value) {
    //   this.searchExperience = value;
    // },
    onSearchStatus(value) {
      this.searchStatus = value;
    },
    onSearchTag(value) {
      this.searchTag = value;
    },
    closeModal() {
      this.visible = false;
    },
    selectPeople(record, value) {
      let insert = {
        id: record.id,
        status: value,
        task: "Empty task currently...",
        interview_date: this.date,
      };

      api.selectStatus(insert).then((res) => {});
    },
    showModal(record) {
      this.showData = record;
      this.visible = true;
    },
    insertCV() {},
    deleteData(id) {
      (this.loading = true),
        api.delete(id).then((res) => {
          this.loading = false;
          this.$notification["success"]({
            message: "Successful",
            description: "Data deleted successfully",
            duration: 1,
          });
          this.fetchTable();
        });
    },
    cancel(e) {
      // Displays the message if clicked no on deleting
      // this.$message.error("Click on No");
    },
    onChange(date, dateString) {
      this.date = dateString;
    },
    sendData(record) {
      console.log("Clicked on edit");
      bus.$emit("dynamic-component", "AddProfile", record);
    },
    handleOk(e) {
      this.visible = false;
    },
    // For the notification popup
    openNotificationWithIcon(type) {
      this.$notification[type]({
        message: "Successful Login",
        description: "You are successfully logged in",
      });
    },
  },
};
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
.document {
  /* height: 500px; */
  width: 100%;
}
</style>
