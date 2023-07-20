<template>
  <div>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="posts"> Posts </a-menu-item>
      <a-menu-item key="assignments"> Assignments </a-menu-item>
      <a-menu-item key="files"> Files </a-menu-item>
    </a-menu>

    <!-- For content of posts -->
    <div v-if="current == 'posts'">
      <br />
      <a-card>
        <a-comment>
          <template slot="actions">
            <span key="comment-basic-like">
              <a-tooltip title="Like">
                <a-icon
                  type="like"
                  :theme="action === 'liked' ? 'filled' : 'outlined'"
                  @click="like"
                />
              </a-tooltip>
              <span style="padding-left: '8px'; cursor: 'auto'">
                {{ likes }}
              </span>
            </span>
            <span key="comment-basic-dislike">
              <a-tooltip title="Dislike">
                <a-icon
                  type="dislike"
                  :theme="action === 'disliked' ? 'filled' : 'outlined'"
                  @click="dislike"
                />
              </a-tooltip>
              <span style="padding-left: '8px'; cursor: 'auto'">
                {{ dislikes }}
              </span>
            </span>
            <span key="comment-basic-reply-to">Reply to</span>
          </template>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p slot="content">
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
          <a-tooltip
            slot="datetime"
            :title="moment().format('YYYY-MM-DD HH:mm:ss')"
          >
            <span>{{ moment().fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-card>
      <br />
      <a-card title="Joe Black" style="width: 100%">
        <a slot="extra" href="#">more</a>
        <p>Added a new file inside the Reading folder</p>
      </a-card>
      <br />
      <!-- <a-card>
        <a-card-meta
          title="Jim Green"
          sub-title="Card Sub-Title"
          :description="cardDescription"
        />
      </a-card> -->
    </div>
    <!-- For content of assignments -->
    <div v-if="current == 'assignments'">
      <a-page-header title="New Assignment" style="color: rgb(0, 21, 41, 0.8)">
        <template slot="extra">
          <a-button key="3"> Discard </a-button>
          <a-button key="2"> Save </a-button>
          <a-button
            key="1"
            type="primary"
            :disabled="isButtonDisabled"
            @click="uploadData"
          >
            Assign
          </a-button>
        </template>
        <div style="margin-top: 20px">
          <span style="font-weight: 600">Title (required)</span>
          <a-textarea
            placeholder="Enter Title"
            auto-size
            style="margin-top: 5px"
            v-model="text"
          />
          <a-upload style="cursor: pointer">
            <a-icon type="tag" />
            <span
              style="
                color: rgba(0, 21, 41, 0.6);
                margin-left: 5px;
                font-weight: 500;
              "
              >Add category</span
            >
          </a-upload>
        </div>
        <div style="margin-top: 15px">
          <span style="font-weight: 600">Instructions</span>
          <a-textarea
            placeholder="Enter Instructions"
            auto-size
            style="margin-top: 5px"
            v-model="instruction"
          />
          <a-upload style="cursor: pointer">
            <a-icon type="paper-clip" />
            <span
              style="
                color: rgba(0, 21, 41, 0.6);
                margin-left: 5px;
                font-weight: 500;
              "
              >Add resources</span
            >
          </a-upload>
        </div>
        <div style="margin-top: 15px">
          <span style="font-weight: 600">Assign to:</span>
          <a-select
            mode="multiple"
            style="width: 100%"
            placeholder="Assign to.."
            option-label-prop="label"
            v-model="value"
          >
            <a-select-option
              v-for="data in datas"
              :key="data.id"
              :value="data.name"
              :label="data.name"
            >
              {{ data.name }}
            </a-select-option>
            <!-- <a-select-option value="jim" label="Jim"> Jim </a-select-option>
            <a-select-option value="tim" label="Tim"> Tim </a-select-option>
            <a-select-option value="fin" label="Fin"> Fin </a-select-option> -->
          </a-select>
        </div>
        <div style="margin-top: 15px">
          <a-row type="flex" justify="space-between">
            <a-col :span="10">
              <span style="font-weight: 600">Due Date</span> <br />
              <a-date-picker @change="onChange" style="width: 100%" />
            </a-col>
            <a-col :span="10">
              <span style="font-weight: 600">Due Time</span> <br />
              <a-time-picker
                use12-hours
                @change="onChange"
                style="width: 100%"
              />
            </a-col>
          </a-row>
        </div>
        <h4
          style="font-weight: 400; color: rgba(0, 21, 41, 1); margin-top: 10px"
        >
          Assignment will be posted immediately
        </h4>
      </a-page-header>
    </div>
    <!-- For content of files -->
    <div v-if="current == 'files'">insdie files</div>
  </div>
</template>
<script>
import moment from "moment";
import api from "../api";
// for the add category below the enter title
let index = 0;
export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      // Field value of uploading the assessment
      text: "",
      instruction: "",
      value: [],
      date: "",
      time: "",

      current: ["posts"],
      cardDescription: "Added a new file inside the Assignment folder",
      datas: [],

      // For comment
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
    };
  },
  created() {
    api.allUser().then((res) => {
      this.datas = res.data;
      console.log("data here: ", this.datas);
      // console.log("length of data here: ", this.datas.length);
    });
  },
  watch: {
    value(val) {
      console.log(`selected:`, val);
    },
  },
  computed: {
    isButtonDisabled() {
      return this.text.length < 3;
    },
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
    },
    uploadData() {
      const formData = new FormData();
      formData.append("title", this.text);
      formData.append("instruction", this.instruction);
      formData.append("assignedto", this.value);
      formData.append("date", this.date);
      formData.append("date", this.time);
      console.log("Data from assessment: ", formData);
    },
  },
};
</script>
