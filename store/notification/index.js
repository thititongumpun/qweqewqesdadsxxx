export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async find({ commit }, payload) {
    const {data} = await this.$axios.post("/notification", payload);
    return data;
  },
};