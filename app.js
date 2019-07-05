//app.js
App({
  onLaunch: function () {
   wx.getSystemInfo({
     success: this.getSreen
   })
  },
  getSreen(data) {
    this.globalData.iw = data.windowWidth;
    this.globalData.ih = data.windowHeight;
  },
  globalData: {
    iw: "",
    ih: ""
  }
})