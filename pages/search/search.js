Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: '',
    list: []
  },
  timer: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  searchInfo(e){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setData({
        val: e.detail.value
      })
    },300)
  },

  toSearch(){
    if (!!this.data.val) {
      wx.request({
        url: 'http://localhost:3000/data?q=' + this.data.val,
        success: this.getList
      })
    }
  },
  getList(data) {
    let arr = [];
    data.data.map(item => {
      let obj = {};
      obj.add = item.address+"("+(item.type=='buy'?'购买':'转让')+')';
      obj.des = item.des;
      obj.id = item.id;
      arr.push(obj);
    })
    this.setData({
      val: '',
      list: arr
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    })
  }

})