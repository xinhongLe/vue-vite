/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("specialchar2Dialog", function (editor) {
    var jme_fid = "specialchar2_" + Math.ceil(Math.random() * 100);
    return {
        title: "符号大全",
        minWidth: 800,
        minHeight: 600,
        buttons: [CKEDITOR.dialog.cancelButton],
        contents: [{
            id: "specialchar2", 
            padding: 0,
            elements: [{
                type: "html",
                html: '<div style="width:800px;height:600px;"><iframe id="' + jme_fid + '" style="width:800px;height:600px;" frameborder="no" src="' + CKEDITOR.basePath + 'plugins/specialchar2/html/index.html"></iframe></div>',
            }]
        }],
        onShow: function () {
            var dialog = this
            // 添加 click 事件监听器
            var el = document.getElementById(jme_fid).contentWindow.document.getElementById("specialcharContent")
            el && el.addEventListener('click', customEventHandler);
            function customEventHandler(event) {
                if (event.target.getAttribute("class") !== "item-content") return
                event.stopPropagation()
                // 获取点击的元素节点
                var clickedElement = event.target;
                // 在编辑器中插入节点
                editor.insertHtml(`<span style="font-size: 20px">${clickedElement.textContent}</span>`);
                // 关闭对话框
                dialog.hide()
                // 销毁事件监听
                document.getElementById(jme_fid).contentWindow.document.getElementById("specialcharContent").removeEventListener('click', customEventHandler);
            }
        }
    }
});