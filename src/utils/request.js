// ES6 语法 封装异步请求
const baseURL = 'http://157.122.54.189:9088/image';

export default (params) => {
  // 开启 加载中... 效果
  uni.showLoading({
    title: '加载中...'
  });
  // 处理 params 中 url
  if (params.url.includes('/videoimg')) {
    params.url = baseURL.replace('/image', '') + params.url;
  } else {
    params.url = baseURL + params.url;
  }
  // 返回 Promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: (result) => {
        resolve(result);
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        uni.hideLoading();
      }
    });
  });
}