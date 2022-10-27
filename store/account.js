export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async register({ commit }, payload) {
    let { data } = await this.$axios.post("/Accounts/register", payload);
    return data;
  },
  async forgotPassword({ commit }, payload) {
    let { data } = await this.$axios.post("/Accounts/forgot-password", payload);
    return data;
  },
  async resetPassword({ commit }, { token, payload }) {
    let request = {
      token: token.token,
      password: payload.password
    };
    let { data } = await this.$axios.post("/Accounts/reset-password", request);
    return data;
  },
  async update({ commit }, payload) {
    let { data } = await this.$axios.put(`/Accounts`, payload);
    return data;
  },
};
