export default {
  namespaced: true,
  // 重要信息：state 必须是一个函数，用于服务端渲染, 避免数据共享。
  // 因此可以创建多个实例化该模块
  state: () => ({
    count: 0
  }),
  actions: {
    async inc({ commit }) {
      console.log("commit");
      return commit("inc");
    }
  },
  mutations: {
    inc: state => state.count++
  }
};
