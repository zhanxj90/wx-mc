// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id} = options;
    wx.request({
      url: 'http://localhost:3000/data?id=' + id,
      success: this.getDetail
    })
  },

  getDetail(data) {
    let obj = {};
    obj.address = data.data[0].address;
    obj.img = '/img/' + data.data[0].type + '.png';
    obj.des = data.data[0].des;
    obj.tel = data.data[0].tel;
    obj.type = data.data[0].type == 'buy' ? '购买' : '转让';
    this.setData({
      detail: obj
    })
  }
})