var network = require('../../utils/network.js')
Page({
  data: {
    date: "2017-11-01",
    accounts: [],
    accountIndex: 0,
    isAgree: false,
    name:'',
    phoneNumber:'',
    peopleCount:'',
    onlyId:'',
    userInfo:{},
  },
  bindNameInput(e){
  this.setData({
    name:e.detail.value
  })
  },
  
  bindCountInput(e){
    this.setData({
      peopleCount: e.detail.value
    })
  },
  bindPhoneInput(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindAgreeChange(e){
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  onLoad(options) {
    
    this.setData({
      onlyId: options.id
    })

  },
  submitData(e){
    var that = this
    var dict = {
      phoneNumber: that.data.phoneNumber,
      name: that.data.name,
      address: that.data.peopleCount,
      itemId: that.data.onlyId,
    }
    debugger
    if(dict.phoneNumber.length){
      wx.showLoading({
        title: '提交中',
      })
      network.reserveItem(dict)
    }
    else{
      wx.showToast({
        title: '手机号码未填写',
      })
    }
 
  },

});