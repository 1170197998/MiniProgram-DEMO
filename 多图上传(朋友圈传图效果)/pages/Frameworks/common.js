var app = getApp();

//多张图片上传
function uploadimg(data) {
  console.log(data.date)
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;

  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: data.name,
    formData: {
      // 同时上传userId和当前时间
      userId: app.globalData.userId,
      date: data.date,
    },
    success: (resp) => {
      success++;
      app.globalData.xqimgList += resp.data + ",";
    },
    fail: (res) => {
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      i++;
      if (i == data.path.length) { // 图片传完时停止调用          

      } else { // 图片还没有传完继续调用函数
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }
    }
  });
}

module.exports = {
  uploadimg: uploadimg,
}