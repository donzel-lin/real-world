const state = () => {
    return {
        user: null
    }
}


const mutations = {
    setUser(state, payload) {
        state.user = payload
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}