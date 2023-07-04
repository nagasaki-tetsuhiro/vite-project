const getDefaultState = () => ({
    id: '',
    branchId: '',
    branchName: '',
})

export default {
    namespaced: true,
    state: {
        id: '',
        branchId: '',
        branchName: '',
    },
    mutations: {
        reset(state) {
            Object.assign(state, getDefaultState())
        },
        setId (state, value) {
            state.id = value
        },
        setBranchId (state, value) {
            state.branchId = value
        },
        setBranchName (state, value) {
            state.branchName = value
        },
    },
    getters: {
        getId(state){
            return state.id
        },
        getBranchId(state) {
            return state.branchId
        },
        getBranchName(state) {
            return state.branchName
        },
    },
};