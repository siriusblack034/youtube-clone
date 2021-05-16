import uriApi from '../uriApi'
import { accountService } from '../services/account.service'

const state = {
  listVideo: {
    videoLiked: [],
    watchLate: [],
    watched: []
  },
  listChannel: [],
  auth: {
    token: '',
    email: '',
    idUser: ''
  }
}
const mutations = {
  addVideo(state, data) {
    let list = []
    let type = data.type
    if (type === 'watchLate') {
      list = state.listVideo.watchLate
      let check = list.some(video => video == data.video.id)
      if (check) {
        let index = list.findIndex(video => video == data.video.id)
        list.splice(index, 1)
      }
      list.unshift(data.video)

    }
    else if (type === 'videoLiked') {
      list = state.listVideo.videoLiked
      let check = list.some(video => video.id == data.video.id)
      if (check) {
        let index = list.findIndex(video => video.id == data.video.id)
        list.splice(index, 1)
      }
      list.unshift(data.video)

    }
    else if (type === 'watched') {
      list = state.listVideo.watched
      let check = list.some(video => video.id == data.video.id)
      if (check) {
        let index = list.findIndex(video => video.id == data.video.id)
        list.splice(index, 1)
      }
      list.push(data.video)
    }
  },

  deleteVideo(state, data) {
    let type = data.type
    if (type === 'videoLiked') {
      let index = state.listVideo.videoLiked.findIndex(video => video.id == data.id)
      state.listVideo.videoLiked.splice(index, 1)
    }
    else if (type === 'watched') {
      let index = state.listVideo.watched.findIndex(video => video.id == data.id)
      state.listVideo.watched.splice(index, 1)
    }
  },
  setAuth(state, auth) {
    state.auth.token = auth.token
    state.auth.email = auth.email
    state.auth.idUser = auth.idUser
  },
  clearToken(state) {
    state.auth.token = ''
    state.auth.email = ''
    state.auth.idUser = ''
    state.listVideo.watchLate = []
    state.listVideo.watched = []
    state.listVideo.videoLiked = []
    state.listChannel = []
  },
  sortList(state) {
    state.listVideo.watched.sort((a, b) => {
      return a.timeAt > b.timeAt ? -1 : 1;
    });
    state.listVideo.videoLiked.sort((a, b) => {
      return a.timeAt > b.timeAt ? -1 : 1;
    });
    state.listVideo.watchLate.sort((a, b) => {
      return a.timeAt > b.timeAt ? -1 : 1;
    });
    state.listChannel.sort((a, b) => {
      return a.timeAt > b.timeAt ? -1 : 1;
    });
  },
  addChannel(state, data) {
    let list = state.listChannel
    let check = list.some(channel => channel.id == data.channel.id)
    if (check) {
      let index = list.findIndex(channel => channel.id == data.channel.id)
      list.splice(index, 1)
    }
    list.unshift(data.channel)
  },
  deleteChannel(state, data) {
    let id = data.id
    let list = state.listChannel
    let index = list.findIndex(channel => channel.id == id)
    list.splice(index, 1)
  }
}


const actions = {
  authenticateUser({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      let uri = uriApi.firebase.auth.logup
      if (params.isLogin) {
        uri = uriApi.firebase.auth.login
      }
      (
        accountService.authenticate({
          uri: uri,
          email: params.email,
          password: params.password
        }).then(result => {
          let durationToken = new Date().getTime() + result.data.expiresIn * 1000
          $cookies.set('token', result.data.idToken)
          $cookies.set('expirationToken', durationToken)
          $cookies.set('email', result.data.email)
          $cookies.set('idUser', result.data.localId)
          dispatch('setLogoutTimer', result.data.expiresIn * 1000)
          resolve({
            success: true
          })
        }).catch(error => {
          reject(error.response)
        })
      )
    }
    )
  },
  setLogoutTimer({ dispatch }, duration) {
    setTimeout(() => {
      dispatch('userLogout')
    }, duration)
  },
  initAuth({ commit, dispatch }) {
    const token = $cookies.get('token')
    const expire = $cookies.get('expirationToken')
    const email = $cookies.get('email')
    const idUser = $cookies.get('idUser')
    if (new Date().getTime() > expire || !token)
      dispatch('userLogout')

    commit('setAuth', { token: token, email: email, idUser: idUser })

  },
  userLogout({ commit }) {
    $cookies.remove('token');
    $cookies.remove('expirationToken')
    $cookies.remove('email')
    $cookies.remove('idUser')

    commit('clearToken')
  },
  /* Data */
  addVideo({ commit, state }, data) {
    let idUser = state.auth.idUser
    let type = data.type
    console.log('11111');
    commit('addVideo', data)
    accountService.addVideoFb({
      video: data.video,
      type,
      idUser
    }).then(response => {
      console.log(response + 'addVideo');
    }).catch(error => {
      console.log(error);
    })
  },
  getDataFb({ commit, state }) {
    let idUser = state.auth.idUser
    accountService.getVideo({ idUser, type: 'watched' }).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit('addVideo', {
          type: 'watched',
          video: {
            id: doc.id,
            timeAt: doc.data().timeAt
          }
        })
      });
    }).then(() => {
      accountService.getVideo({ idUser, type: 'videoLiked' }).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commit('addVideo', {
            type: 'videoLiked',
            video: {
              id: doc.id,
              timeAt: doc.data().timeAt
            }
          })
        });
      })
    }).then(() => {
      accountService.getVideo({ idUser, type: 'watchLate' }).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commit('addVideo', {
            type: 'watchLate',
            video: {
              id: doc.id,
              timeAt: doc.data().timeAt
            }
          })
        });
      })
    }).then(() => {
      accountService.getChannelFb({ idUser }).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commit('addChannel', {
            channel: {
              id: doc.id,
              timeAt: doc.data().timeAt
            }
          })
        });
      })
    })
      .then(() => {
        console.log('11111111');
        commit('sortList')
      })

  },
  deleteVideoFb({ commit, state }, data) {
    let idUser = state.auth.idUser
    let type = data.type
    console.log(data);
    commit('deleteVideo', data)
    accountService.deleteVideoFb({
      idUser,
      id: data.id,
      type
    }).then(() => {
      console.log('success');
    }).catch(() => {
      console.log('errors');
    })


  },
  addChannel({ commit, state }, data) {
    let idUser = state.auth.idUser
    commit('addChannel', data)
    accountService.addChannel({
      channel: data.channel,
      idUser
    }).then(response => {
      console.log(response + 'addVideo');
    }).catch(error => {
      console.log(error);
    })
  },
  deleteChannel({ commit, state }, data) {
    let idUser = state.auth.idUser
    commit('deleteChannel', data)
    accountService.deleteChannelFb({
      idUser,
      id: data.id,

    }).then(() => {
      console.log('success');
    }).catch(() => {
      console.log('errors');
    })

  }

}

export const user = {
  namespaced: true,
  state,
  mutations,
  actions
}