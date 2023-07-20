<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="Name" prop="name">
      <a-input
        v-model="form.name"
        @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    <a-form-model-item label="Address" ref="address" prop="address">
      <a-input type="text" v-model="form.address"> </a-input>
    </a-form-model-item>
    <a-form-model-item label="Phone Number" ref="phone" prop="phone">
      <a-input type="text" v-model="form.phone"> </a-input>
    </a-form-model-item>
    <a-form-model-item label="Email" required prop="email">
      <a-input type="email" v-model="form.email" />
    </a-form-model-item>
    <a-form-model-item label="Technology" required prop="technology">
      <a-select v-model="form.technology" mode="multiple">
        <a-select-option value="reactJS"> ReactJS </a-select-option>
        <a-select-option value="vuejs"> VueJS </a-select-option>
        <a-select-option value="nodejs"> NodeJS </a-select-option>
        <a-select-option value="php"> PHP </a-select-option>
        <a-select-option value="laravel"> laravel </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Level of Experience" prop="experience">
      <a-input type="number" v-model="form.experience"></a-input>
    </a-form-model-item>
    <a-form-model-item label="Upload" prop="upload">
      <!-- <a-input type="file" @change="handleFile"> </a-input> -->
      <a-upload
        :before-upload="handleBeforeUpload"
        :show-upload-list="true"
        :validator="validateDocument"
      >
        <a-button> <a-icon type="upload" /> Select File </a-button>
      </a-upload>
      <p v-if="documentStatus && file == null" style="color: #f86b60">
        Please upload document
      </p>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit" :loading="loading">
        {{ isUpdate ? "Update" : "Register" }}
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> Reset </a-button>
    </a-form-model-item>
    <!-- {{ record }} -->
  </a-form-model>
</template>
<script>
import axios from "axios";
import api from "../api";
import bus from "../eventBus";

export default {
  data() {
    return {
      isUpdate: false,
      loading: false,
      prefix: "977",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      file: null,
      documentStatus: false,
      receivedData: {},
      form: {
        name: "",
        phone: "",
        email: "",
        technology: [],
        experience: "",
        age: 32,
        address: "",
      },
      // technology: ["reactjs", "vuejs"],
      rules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "Please input address",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please input phone number",
            trigger: "change",
          },
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "Please input your E-mail!",
          },
        ],
        technology: [
          {
            // type: "array",
            required: true,
            message: "Please select technology",
            trigger: "change",
          },
        ],
        // upload: [
        //   {
        //     required: true,
        //     message: "Please upload document",
        //   },
        // ],
      },
    };
  },

  created() {
    bus.$on("recordData", (data) => {
      // this.form.name = this.data.name;
      this.receivedData = data;
      console.log(this.receivedData);
      console.log("asdf", data);
      this.isUpdate = true;
      this.form = data;
    });
  },

  methods: {
    handleEvent(cmp, record) {
      console.log("from insdie the addprofile component");
    },
    // handleFile(e) {
    //   this.file = e.target.files[0];
    //   console.log("asdfsaf", this.file);
    // },
    onSubmit() {
      (this.documentStatus = true),
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.file != null) {
              (this.documentStatus = false), (this.loading = true);
              console.log(this.form);
              const formData = new FormData();
              for (const property in this.form) {
                formData.append(property, this.form[property]);
              }
              formData.append("document", this.file);

              if (this.isUpdate) {
                console.log("For updating the data");
                api.update(this.receivedData.id, formData).then((res) => {
                  this.loading = false;
                  this.isUpdate = false;
                  this.form = "";
                  this.$notification["success"]({
                    message: "Successful",
                    description: "Data successfully updated",
                  });
                  console.log("response:", res);
                });
                console.log("id is", this.receivedData.id);
              } else {
                console.log("For registering the data");
                api
                  .addNewUser(formData)
                  .then((res) => {
                    this.loading = false;
                    this.$notification["success"]({
                      message: "Successful",
                      description: "Data created successfully",
                      duration: 2,
                    });
                    this.resetForm();
                  })
                  .catch((err) => {
                    (this.loading = false), console.log(err);
                    this.$notification["error"]({
                      message: "Error",
                      description: "Something went wrong",
                    });
                  });
              }
            }
          } else {
            console.log("error submit!!");
            this.$notification["error"]({
              message: "Error",
              description: "Error in registering data",
            });
            return false;
          }
        });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleBeforeUpload(file) {
      this.file = file;
      console.log("file here:", this.file);
      return false;
      // Validate the file if needed
      // Return false to prevent uploading
      // Return a Promise to handle asynchronous validation
    },
  },
};
</script>
