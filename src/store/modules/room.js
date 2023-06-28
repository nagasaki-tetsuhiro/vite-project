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
        setRoomId (state, value) {
            state.branchId = value
        },
        setRoomName (state, value) {
            state.branchName = value
        },
    },
    getters: {
        getRoomId(state) {
            return state.branchId
        },
        getRoomName(state) {
            return state.branchName
        },
    },
};