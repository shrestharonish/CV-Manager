<template>
  <div class="container">
    <img src="../assets/cvManager.svg" alt="logo" />
    <div class="form-container">
      <a-row>
        <a-col :span="24">
          <a-card
            title="Please Log In"
            :bordered="false"
            style="text-align: center; border-radius: 5px 5px 0 0"
          >
            <a-form layout="vertical" :form="form" @submit="handleSubmit">
              <a-form-item
                :validate-status="userNameError() ? 'error' : ''"
                :help="userNameError() || ''"
              >
                <a-input
                  v-decorator="[
                    'userName',
                    {
                      rules: [
                        { required: true, message: 'Please input your Email!' },
                      ],
                    },
                  ]"
                  placeholder="Email"
                >
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item
                :validate-status="passwordError() ? 'error' : ''"
                :help="passwordError() || ''"
              >
                <a-input
                  v-decorator="[
                    'password',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Password!',
                        },
                      ],
                    },
                  ]"
                  type="password"
                  placeholder="Password"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  style="width: 100%"
                  type="primary"
                  html-type="submit"
                  :disabled="hasErrors(form.getFieldsError())"
                  :loading="loading"
                >
                  Log in
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
      <span
        style="
          display: flex;
          color: rgba(0, 0, 0, 0.4);
          justify-content: center;
          background: white;
          border-radius: 0 0 5px 5px;
        "
        >&copy; SmartPalika {{ date }}</span
      >
    </div>
  </div>
</template>

<script>
import api from "../api";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      loading: false,
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
    };
  },
  computed: {
    date() {
      return new Date().getFullYear();
    },
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        if (!err) {
          this.loading = true;
          const email = this.form.getFieldValue("userName");
          const password = this.form.getFieldValue("password");
          const formData = {
            email: email,
            password: password,
          };

          api
            .loginAPI(formData)
            .then((res) => {
              this.loading = false;
              this.$notification["success"]({
                message: "Successful Login",
                description: "You are successfully logged in",
                duration: 2,
              });
              this.$router.push("/dashboard");
            })
            .catch((err) => {
              this.loading = false;
              if (err.message == "Network Error") {
                this.$notification["error"]({
                  message: "Login Failed",
                  description: "Please check your connection",
                });
              } else {
                this.$notification["error"]({
                  message: "Login Failed",
                  description: "Incorrect Username or Password",
                });
              }
              console.log("err", err.message);
            });
        }
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");
.container {
  width: 35%;
  height: 100%;
  margin: auto;
}
.container img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 45%;
  margin-top: -30px;
}
.form-container {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
}
</style>
