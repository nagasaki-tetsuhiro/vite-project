const getDefaultState = () => ({
    branchId: '',
    branchName: '',
})

export default {
    namespaced: true,
    state: {
        branchId: '',
        branchName: '',
    },
    mutations: {
        reset(state) {
            Object.assign(state, getDefaultState())
        },
        setBranchId (state, value) {
            state.branchId = value
        },
        setBranchName (state, value) {
            state.branchName = value
        },
    },
    getters: {
        getBranchId(state) {
            return state.branchId
        },
        getBranchName(state) {
            return state.branchName
        },
    },
};