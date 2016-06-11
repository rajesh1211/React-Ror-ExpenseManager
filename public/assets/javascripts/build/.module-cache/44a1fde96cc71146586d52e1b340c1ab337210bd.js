var responseMessage = (function() {

  var getEl = function(id){return document.getElementById(id)};

  var cachedDom = getEl('responseMessage');

  this.showSuccess = function (message) {
    cachedDom.classList.add("show","success");
    cachedDom.innerHTML = message;

    setTimeout(function () {
      cachedDom.classList.remove('show',"success");
    },1000);
  }

  this.showError = function (message) {
    cachedDom.classList.add('show','error');
    cachedDom.innerHTML = message;
    setTimeout(function () {
      cachedDom.classList.remove('show',"error");
    },1000);
  }

  return this;
})();
