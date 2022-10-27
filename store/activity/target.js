export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async criteria({ commit }) {
    const {data} = await this.$axios.get("/Target/criteria");
    return data;
  },
  async store({ commit }, payload) {
    const {data}  = await this.$axios.post("/Target", payload);
    return data;
  },
  async history({ commit }, payload) {
    const {data}  = await this.$axios.post("/Target/criteria", payload);
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