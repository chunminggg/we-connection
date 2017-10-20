//index.js
//获取应用实例

var app = getApp()
var netWork = require('../../utils/network.js')
Page({
  data: {
    dataArray: [],
    imageArray: [],
    /** 
    * 页面配置 
    */
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    specialPriceArray: [],
    recommendArray: [],
    followArray: [],
    freeArray: [],
    secondReommendArray: [],
    itemArray:[],
  },

  //事件处理函数
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
  
    Promise.all([netWork.getMainThemeList(), netWork.getRecommendList(true)]).then(([data1,data2]) => {
        let dataArray = []
        let sourceArray = []
       for (let item of data2) {
        dataArray.push({
          imageArray:item.attributes.imageArray,
          id:item.id
        })
       }

       for(let newItem of data1){

         newItem.attributes.id = newItem.id
         newItem.attributes.coverImage = newItem.attributes.imageArray[0].url
         sourceArray.push(newItem.attributes)
       }
       that.setData({ specialPriceArray:dataArray,itemArray:sourceArray})
      netWork.loginWithLeanCloud()
      wx.hideLoading()
      wx.getSystemInfo({
        success: function (res) {
          wx.hideLoading()
        }
      });
    })

  },
  clickImageidx(e) {
    var idx = e.currentTarget.dataset.type
    let naviTitle = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../itemList/itemList?type=${idx}&title=${naviTitle}`,
    })
  },
  allIslandsClick(e) {
    wx.navigateTo({
      url: '../islands/islands',
    })
  },
  clickRecommenItem(e) {

    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '../detail/detail?detailId=' + id,
    })
  },
  clickSpecialPrice(e) {
    let id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '../detail/detail?detailId=' + id,
    })
  },
  clickItem(e){
    var idx = e.currentTarget.dataset.type
    let naviTitle = e.currentTarget.dataset.title

    wx.navigateTo({
      url: `../itemList/itemList?type=${idx}&title=${naviTitle}`,
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: '超想去旅行',
      path: '/pages/index/index',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})
