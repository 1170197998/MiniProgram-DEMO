//index.js
var uploadPicture = require('../Frameworks/common.js')
//获取应用实例
const app = getApp()

Page({
  data: {

    // 上传的案例图片集合
    uploadImages: [],
    // 设置上传案例图片的最大数目
    maxImages: 9,
    // 案例图片数目是否达到了最大数目
    isMaxImagesNum: false,
  },

  // 选择图片
  chooseImageTap: function() {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },

  // 选图
  chooseWxImage: function(type) {
    let _this = this;
    var picsItems;
    wx.chooseImage({
      // 相关属性设置
      count: _this.data.maxImages,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        var imgsrc = res.tempFilePaths;
        // concat数组连接，且不会改变现有数组
        var picss = _this.data.uploadImages.concat(imgsrc);
        var imagesArr = '';
        if (picss.length >= _this.data.maxImages) {
          _this.setData({
            isMaxImagesNum: true
          });
        }
        // 判断选择的数量是否超过设定数量
        let num = picss.length <= _this.data.maxImages ? picss.length : _this.data.maxImages;
        for (var i = 0; i < num; i++) {
          imagesArr += '{"imgurl":"' + picss[i] + '"},';
        }
        imagesArr = JSON.parse('[' + imagesArr.substring(0, imagesArr.length - 1) + ']');
        _this.setData({
          uploadImages: picss,
          picsItems: imagesArr
        });
      }
    })
  },

  // 预览所选图片
  selImagePre: function(e) {
    let _this = this;
    wx.previewImage({
      urls: this.data.uploadImages,
      current: e.currentTarget.dataset.src
    })
  },

  // 图片上传
  submitAction: function() {
    // 上传所选图片
    uploadPicture.uploadimg({
      // 传图同时携带的参数
      url: app.globalData.baseUrl + 'freePeopleDemoImgs.php',
      path: _this.data.uploadImages,
      name: 'caseImages',
      date: Date.now(),
    })
  },

})