import axios from "axios";
import uriApi from "../uriApi";
import constant from '../constant'
export const videoService = {
  getList,
  getVideoDetails
};

function getList(params) {
  let uri;
  if (params.type == 'searchList') {
    uri = uriApi.searchVideo;
  }
  else if (params.type == 'homeList') {
    uri = uriApi.getVideo
  }
  let p = params.uri;
  p.key = constant.KEY
  return axios.get(uri, {
    params: p
  });
}
async function getVideoDetails(params) {
  let uri;
  uri = uriApi.getVideo
  let p = params;
  p.key = constant.KEY
  return await axios.get(uri, {
    params: p
  });
}
