export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async category({ commit }) {
    const {data}  = await this.$axios.get("/Category");
    return data;
  },
  async save({ commit }, payload) {
    const {data}  = await this.$axios.post("/ActivityHistory", payload);
    return data;
  },
  async find({ commit }, payload) {
    const {data} = await this.$axios.post("/ActivityHistory/date", payload);
    return data;
  },
  async findOne({ commit }, payload) {
    const {data} = await this.$axios.get(`/ActivityHistory/${payload}`);
    return data;
  },
  async update({ commit }, payload) {
    const {data} = await this.$axios.patch(`/ActivityHistory/${payload.id}`, payload.data);
    return data;
  },
  async delete({ commit }, payload) {
    const {data} = await this.$axios.delete(`/ActivityHistory/${payload}`);
    return data;
  }
};