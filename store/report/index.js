export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async find({ commit }, payload) {
    const { data } = await this.$axios.post("/chart", payload);
    return data;
  },
  async report({ commit }) {
    const data = await this.$axios.get("/Target/activity");
    return data;
  },
};
