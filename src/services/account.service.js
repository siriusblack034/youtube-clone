import axios from "axios";
import constant from '../constant'
import db from '../firebase'
export const accountService = {
  authenticate,
  addVideoFb,
  deleteVideoFb,
  getVideo,
  addChannel,
  deleteChannelFb,
  getChannelFb
}
function authenticate(params) {
  let uri = params.uri
  let key = constant.fbApiKey
  let url = uri + key
  return axios.post(url, {
    email: params.email,
    password: params.password,
    returnSecureToken: true
  })
}
async function addVideoFb(data) {
  var dataRef = db.collection(`${data.idUser}/listVideo/${data.type}`)
  return await dataRef.doc(`${data.video.id}`).set(
    {
      timeAt: data.video.timeAt
    }
  )
}

async function deleteVideoFb(data) {
  var dataRef = db.collection(`${data.idUser}/listVideo/${data.type}`)
  return await dataRef.doc(`${data.id}`).delete()
}
async function getVideo(data) {
  return await db.collection(`${data.idUser}/listVideo/${data.type}`).get()
}
async function addChannel(data) {
  var dataRef = db.collection(`${data.idUser}/channels/list`)
  return await dataRef.doc(`${data.channel.id}`).set(
    {
      timeAt: data.channel.timeAt
    }
  )
}
async function getChannelFb(data) {
  return await db.collection(`${data.idUser}/channels/list`).get()
}
function deleteChannelFb(data) {
  var dataRef = db.collection(`${data.idUser}/channels/list`)
  return dataRef.doc(`${data.id}`).delete()
}