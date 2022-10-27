export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async activity({ commit }) {
    const data  = await this.$axios.get("/Target/activity");
    return data;
  },
  async store({ commit }, payload) {
    const {data}  = await this.$axios.post("/Target", payload);
    return data;
  },
  async history({ commit }, payload) {
    const {data}  = await this.$axios.post("/Target/activity", payload);
    return data;
  },
  async findOne({ commit }, payload) {
    const {data}  = await this.$axios.get(`/Target/${payload}`);
    return data;
  },
  async update({ commit }, payload) {
    const {data} = await this.$axios.patch(`/Target/${payload.id}`, payload.data);
    return data;
  }
};