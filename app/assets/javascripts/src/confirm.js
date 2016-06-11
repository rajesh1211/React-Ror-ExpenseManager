var confirm = (function() {
  
  var  getEl = function(id){return document.getElementById(id)};
  
  var initObj = {
    type: '',
    msg :'',
    success: function(){},
    cancel: function(){},
    cachedDom: getEl('confirmBox')
  };

  var resetConfirm = function() {
    initObj = {
      msg :' please confirm',
      success: function(){},
      cancel: function(){},
      cachedDom: getEl('confirmBox')
    }
  }

  var showConfirmBox = function () {
    $(initObj.cachedDom).find('.confirm-msg').html(initObj.msg);
    initObj.cachedDom.classList.add('show');
    if (initObj.type == "alert") {
      initObj.cachedDom.classList.add('alert');
    }
  }

  var hideConfirmBox = function() {
   initObj.cachedDom.classList.remove('show');
  }
  
  this.initConfirm = function (type, msg, success, cancel) {
    initObj.type = type;
    initObj.msg = msg;
    initObj.success = success;
    initObj.cancel = cancel;
    showConfirmBox();
  }

  this.submit = function() {
    initObj.success();
    hideConfirmBox();
  }

  this.closeConfirm = function() {
    hideConfirmBox();
  }

  this.confirmCancel = function () {
    hideConfirmBox();
    initObj.cancel();
  }
  
  return this;
})();