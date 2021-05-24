<template>
  <div class="grid wide full-creen">
    <div class="row form">
      <div class="col c-10 c-o-1 m-8 m-o-2 l-4 l-o-4 login">
        <div class="login-form">
          <div class="login-form__logo">
            <div id="logo" class="v8vQje" title="Google">
              <div class="rr0DNb" jsname="l4eHX">
                <svg
                  viewBox="0 0 75 24"
                  width="75"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="l5Lhkf"
                >
                  <g id="qaEJec">
                    <path
                      fill="#ea4335"
                      d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"
                    ></path>
                  </g>
                  <g id="YGlOvc">
                    <path
                      fill="#34a853"
                      d="M58.193.67h2.564v17.44h-2.564z"
                    ></path>
                  </g>
                  <g id="BWfIk">
                    <path
                      fill="#4285f4"
                      d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"
                    ></path>
                  </g>
                  <g id="e6m3fd">
                    <path
                      fill="#fbbc05"
                      d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"
                    ></path>
                  </g>
                  <g id="vbkDmc">
                    <path
                      fill="#ea4335"
                      d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"
                    ></path>
                  </g>
                  <g id="idEJde">
                    <path
                      fill="#4285f4"
                      d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <h2 class="login-form__title">Đăng Nhập</h2>
          <h3 class="login-form__des">Tiếp tục với YouTube</h3>
          <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
            <form @submit.prevent="handleSubmit()" @reset.prevent="reset">
              <ValidationProvider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <input
                  class="login-form__account"
                  v-model="email"
                  type="email"
                  error-messages="errors"
                  label="Email"
                  placeholder="Email hoặc số điện thoại"
                />
                <span class="errors-text">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Password"
                rules="required"
              >
                <input
                  class="login-form__password"
                  :type="passwordType"
                  v-model="password"
                  @keyup.enter="onSignIn"
                  error-messages="errors"
                  label="Password"
                  placeholder="Password"
                />
                <span class="errors-text">{{ errors[0] }}</span>
                <a href="" class="login-form__forget-pass">
                  <span> Forget PassWord ? </span>
                </a>
              </ValidationProvider>

              <div class="login-form__showpass">
                <input
                  type="checkbox"
                  @click="switchVisibility"
                  class="login-form__showpass-checkbox"
                />

                <span class="show-password">Show Password</span>
              </div>
              <span class="errors-text">{{ error }}</span>
              <div class="login-form__btn">
                <button
                  class="login-form__logup btn btn-primary"
                  @click="onSignup"
                >
                  Create new account
                </button>
                <button
                  @click.prevent="onSignIn"
                  type="submit"
                  class="login-form__login btn btn-success"
                >
                  Sign in
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { checkAuth } from "../../mixins/checkAuth";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordType: "password",
      error: "",
    };
  },
  mixins: [checkAuth],
  created() {
    if (this.isLogin) {
    }
  },
  methods: {
    onSignup() {
      this.push({ path: "/logup" });
    },
    onSignIn() {
      this.authenticateUser({
        isLogin: true,
        email: this.email,
        password: this.password,
      })
        .then((result) => {
          if (result.success) {
            this.initAuth().then(async () => {
              await this.getDataFb().then(() => {
                this.$router.push({ path: "/" });
              });
            });
          }
        })
        .catch((error) => {
          this.error = "Tài khoản hoặc mật khẩu sai!";
        });
    },
    switchVisibility() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    ...mapActions("user", ["authenticateUser", "initAuth", "getDataFb"]),
  },
};
</script>

<style scoped>
.full-creen {
  height: 100vh;
}
.form {
  display: flex;
  align-items: center;
  height: 100vh;
}
.login {
  min-height: 500px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
  position: relative;
}
.login-form__logo {
  padding: 20px 0 20px;
}
.login-form__title {
  font-size: 2.2rem;
  font-weight: 400;
  margin: 0;
}
.login-form__des {
  font-size: 1.7rem;
  font-weight: 400;
  opacity: 0.7;
  padding: 4px 0;
}
.login-form__account,
.login-form__password {
  width: 100%;
  font-size: 1.6rem;
  line-height: 3.5rem;
  padding-top: 4px;
  padding-bottom: 4px;
  margin: 8px 0;
  padding-left: 8px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.login-form__account:focus,
.login-form__password:focus {
  border-radius: 3px;
  outline: 1px auto var(--success-color);
}
.login-form__account span,
.login-form__password span {
  color: var(--dangerous-color);
  font-size: 1.8rem;
}
.errors-text,
.login-form__forget-pass {
  color: var(--dangerous-color);
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
}

.login-form__forget-pass {
  display: block;
  color: var(--success-color);
  text-decoration: none;
  position: absolute;
  right: 0;
  padding: 4px 0;
}
.login-form__btn {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.login-form__logup {
  border: none;
  color: var(--success-color);
  font-weight: 600;
}
.login-form__login {
  min-width: 100px;
  font-weight: 600;
  border-radius: 3px;
}
.login-form__showpass {
  display: flex;
  font-size: 1.4rem;
  align-items: center;
  padding-top: 4px;
}
.login-form__showpass-checkbox {
  margin-right: 8px;
}
</style>
