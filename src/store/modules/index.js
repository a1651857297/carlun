import {getBrandList} from '../../api/index.js'
const state = {
    list: {},
}
// 异步请求操作
const actions = {
    getCarList ({commit}) {
        getBrandList().then(res => {
            commit('GETCARLIST', res.data)
        })
    }
}
// 对state进行修改 
const mutations = {
    GETCARLIST (state, payload) {
        var obj = {};
        payload.forEach(function(item) {
            var key = item.Spelling.slice(0,1);
            if (!obj[key]) {
                obj[key] = {
                    title: key,
                    list: []
                }
            }
            obj[key].list.push(item);
        })
        var arr = [];
        for (var k in obj) {
            arr.push(obj[k]);
        }
        state.list = arr
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
} 
