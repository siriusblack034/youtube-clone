import axios from "axios";
import uriApi from "../uriApi";
import constant from '../constant'
export const videoService = {
  getList,
  getVideoDetails,
  getChannelDetails
};

function getList(params) {
  let uri;
  if (params.type == 'searchList') {
    uri = uriApi.youtube.searchVideo;
  }
  else if (params.type == 'homeList') {
    uri = uriApi.youtube.getVideo
  }
  let p = params.uri;
  p.key = constant.ytbApiKey
  console.log(uri);
  return axios.get(uri, {
    params: p
  });
}
async function getVideoDetails(params) {
  let uri;
  uri = uriApi.youtube.getVideo
  let p = params;
  p.key = constant.ytbApiKey
  return await axios.get(uri, {
    params: p
  });
}
async function getChannelDetails(params) {
  let uri;
  uri = uriApi.youtube.channelDetails
  let p = params;
  p.key = constant.ytbApiKey
  return await axios.get(uri, {
    params: p
  })
}
