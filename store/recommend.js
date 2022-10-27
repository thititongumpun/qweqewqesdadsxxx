export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async find({ commit }, payload) {
    const data = await this.$axios.get("/Advice");
    return data;
  },
  async findOne({ commit }, payload) {
    const data = await this.$axios.get(`/Advice/${payload}`);
    return data;
  }
};