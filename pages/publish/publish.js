// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "buy",
    address: "点击选择,要勾选哦~",
    flag: 1
  },

  /**
   * 存入数据库的数据
   */
  userInfo: {
    type: "buy"
  },

  handleAddress(){
    wx.chooseLocation({
      success: this.addSuccess
    })
  },
  addSuccess(data){
    this.setData({
      address: data.address
    })
    this.userInfo.address = data.address;
    this.userInfo.latitude = data.latitude;
    this.userInfo.longitude = data.longitude;
  },

  radioChange(e) {
    this.setData({
      type: e.detail.value
    })
    this.userInfo.type = e.detail.value;
  },

  handleInfo(e){
    this.userInfo.des = e.detail.value;
  },

  handleTel(e) {
    this.userInfo.tel = e.detail.value;
  },

  handlepublish(){
    wx.showLoading({
      title: '正在发布中···',
      mask: true
    })
    wx.request({
      url: 'http://localhost:3000/data',
      method: "post",
      data: this.userInfo,
      success: this.submitSuccess
    })
  },
  submitSuccess(){
    wx.hideLoading()
    this.setData({
      flag: 2
    })
  },

  handleHomeTo() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})