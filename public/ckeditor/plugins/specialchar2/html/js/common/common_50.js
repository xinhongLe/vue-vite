

document.writeln("<script src='" + boot_body + "/lib/JQuery-3.4.1/jquery-3.4.1.min.js'></script>");
document.writeln("<script src='" + boot_body + "/lib/bootstrap-4.3.1-dist/js/bootstrap.bundle.min.js'></script>");

var scriptLoader = {
  script_list: {
    latex: ["<script src='" + boot_body + "/lib/tippy/popper.min.js'></script>", "<script src='" + boot_body + "/lib/caret/caret.js'></script>", "<script src='" + boot_body + js_body + "?ver=" + ver_body + "' type='module'></script>"]
  },
  init: function () {
    if (scriptLoader.isIE()) {
      document.getElementById("isJavaScript").style.display = "none";
      document.getElementById("ifIE-show").style.display = "block";
      document.body.style.overflowY = "hidden";
      return false;
    } else {
      document.getElementById("isJavaScript").remove();
      document.getElementById("ifIE-show").remove();
      scriptLoader.loadOuterScript();
      document.body.removeChild(document.getElementById("common_50"));
    }
  },
  isIE: function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return true;
      } else if (fIEVersion == 8) {
        return true;
      } else if (fIEVersion == 9) {
        return true;
      } else if (fIEVersion == 10) {
        return true;
      } else {
        return true; //IE版本<=7
      }
    } else if (isEdge) {
      return true; //edge
    } else if (isIE11) {
      return true; //IE11
    } else {
      return false; //不是ie浏览器
    }
  },
  loadOuterScript: function () {
    let array = scriptLoader.script_list[page_type];
    array.forEach((script) => {
      document.writeln(script);
    });
  }
};

scriptLoader.init();
