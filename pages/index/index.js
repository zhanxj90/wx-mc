//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude: "113.324520",
    latitude: "23.099994",
    markers: [{
      iconPath: "/img/sell.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 20,
      height: 20
    }],
    controls: [{
        iconPath: '/img/pin.png',
        position: {
          left: (app.globalData.iw - 22) / 2,
          top: (app.globalData.ih - 106) / 2,
          width: 22,
          height: 30
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: '/img/center.png',
        position: {
          left: 30,
          top: app.globalData.ih - 126,
          width: 24,
          height: 24
        },
        clickable: true
      }
    ]
  },
  //事件处理函数
  onLoad() {
    this.getLocation()
    this.map = wx.createMapContext('map')
    this.getMarkers()
  },
  getLocation() {
    wx.getLocation({
      success: this.handleGetLocation
    })
  },
  handleGetLocation(res) {
    this.setData({
      latitude: res.latitude,
      longitude: res.longitude
    })
  },
  toPublish() {
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //移动地图时触发的事件
  regionchange(e) {},
  //控件事件，返回地图标点
  controltap(e) {
    this.map.moveToLocation()
  },

  markertap(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.markerId,
    })
  },

  getMarkers() {
    wx.request({
      url: 'http://localhost:3000/data',
      success: this.markersSuccess
    })
  },
  markersSuccess(res) {
    let arr = [];
    res.data.map((item) => {
      let obj = {};
      obj.iconPath = "/img/" + item.type + ".png",
        obj.id = item.id;
      obj.latitude = item.latitude;
      obj.longitude = item.longitude;
      obj.width = 40;
      obj.height = 40;
      arr.push(obj);
    })
    this.setData({
      markers: arr
    })
  }
})