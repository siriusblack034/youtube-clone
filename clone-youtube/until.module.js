import {untilService} from "../_services/until.service";

const state = {
    provinces : [],
    listTruong : [],
};

const actions = {
    getProvince({commit}){
        untilService.getProvince().then(
            response => {
                if (response.data && response.data.code == 200){
                    commit('getProvince',response.data.data)
                }else {
                    commit('getProvince',[])
                }
            }
        ).catch(function (e){

        })
    },
    getListTruong({commit},data = {capHoc,provinceId}){

        let capHoc = data.capHoc ? data.capHoc : '',
            provinceId = data.provinceId ? data.provinceId : '';

        if (!capHoc||!provinceId){
            commit('getListTruong',[]);
            return ;
        }
        untilService.getListTruong(provinceId,capHoc).then(
            response => {
                if (response.data && response.data.code == 200){
                    commit('getListTruong',response.data.data)
                }else {
                    commit('getListTruong',[])
                }
            }
        ).catch(function (e){

        })
    }
};

const mutations = {
    getProvince(state,data) {
        state.provinces = data;
    },
    getListTruong(state,data){
        state.listTruong = data;
    }
};

export const until = {
    namespaced: true,
    state,
    actions,
    mutations
};
