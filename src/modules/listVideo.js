
import { videoService } from "../services";

const state = {
  listVideo: [],
  channelDetails: {},
  searchList: [],
  video: {}
};

const mutations = {
  setHomeList(state, data) {
    state.listVideo = data;
  },
  setSearchList(state, data) {
    state.searchList = data;
  },
  pushVideo(state, data) {
    state.listVideo.push(...data)

  },
  setVideoDetails(state, data) {
    let id = data.data.items[0].id
    let view = data.data.items[0].statistics.viewCount
    let like = data.data.items[0].statistics.likeCount
    let disLike = data.data.items[0].statistics.dislikeCount
    let comment = data.data.items[0].statistics.commentCount
    let item = state.listVideo.find(item => item.id == id).snippet
    item.view = view
    item.like = like
    item.dislike = disLike
    item.comment = comment
  },
  setVideoDetailsSearch(state, data) {
    let id = data.data.items[0].id
    let view = data.data.items[0].statistics.viewCount
    let like = data.data.items[0].statistics.likeCount
    let disLike = data.data.items[0].statistics.dislikeCount
    let comment = data.data.items[0].statistics.commentCount
    let item = state.searchList.find(item => item.id.videoId == id).snippet
    item.view = view
    item.like = like
    item.dislike = disLike
    item.comment = comment
  },
  setChannelDetails(state, data) {
    state.channelDetails = data
  },
  setVideo(state, data) {
    state.video = data
  },
  addInformVideoWatch(state, data) {
    state.video.data.items[0][`${data.param}`] = data.data.items[0][`${data.param}`]
  }
};
const actions = {

  async setList({ commit }, params) {
    let list = await videoService
      .getList(params)
      .then(response => {
        return response.data.items
      }
      )
      .catch(errors => {
        console.log(errors);
      })
    if (list) {
      if (params.type == 'homeList') {
        commit('setHomeList', list)
      }
      else if (params.type == 'searchList') {
        commit('setSearchList', list)
      }
    }
    else {
      if (params.type == 'homeList') {
        commit('setHomeList', [])
      }
      else if (params.type == 'searchList') {
        commit('setSearchList', [])
      }
    }

  },

  async setVideo({ commit }, params) {
    try {
      let response = await videoService.getVideoDetails(params);
      console.log('response: ', response);
      commit('setVideo', response || "")
    } catch (error) {
      console.error(error);
    }
  },
  setVideoDetails({ commit, state }, params) {
    for (let i = 0; i < state.listVideo.length; i++) {
      let id = state.listVideo[i].id
      params.id = id
      videoService.getVideoDetails(params).then(response => {
        if (response) {
          commit('setVideoDetails', response)
        }
        else {
          commit('setVideoDetails', [])
        }
      })
        .catch(errors => {
          console.log(errors);
        })
    }
  },
  setVideoDetailsSearch({ commit, state }, params) {
    for (let i = 0; i < state.searchList.length; i++) {
      let kind = state.searchList[i].id.kind;
      if (kind == 'youtube#video') {
        let id = state.searchList[i].id.videoId;
        params.id = id
        videoService.getVideoDetails(params).then(response => {
          if (response) {
            commit('setVideoDetailsSearch', response)
          }
          else {
            commit('setVideoDetailsSearch', [])
          }
        })
          .catch(errors => {
            console.log(errors);
          })
      }
      else if (kind == 'youtube#channel') {

      }
    }
  },
  async addInformVideo({ commit }, params) {
    try {
      let response = await videoService.getVideoDetails(params);
      if (response) {
        commit('addInformVideoWatch', {
          ...response, param: params.part
        })
      } else {
        commit('addInformVideoWatch', "")
      }
    } catch (error) {
      console.error(error);
    }
  },
  async setChannelDetails({ commit }, params) {
    await videoService.getChannelDetails(params).then((result) => {
      commit('setChannelDetails', result)
    }).catch((errors) => {
      console.log(errors);
    })
  }
};
const getters = {
  getVideo: (state) => {
    return state.video
  }
}
export const listVideo = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
