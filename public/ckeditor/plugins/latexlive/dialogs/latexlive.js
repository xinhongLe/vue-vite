CKEDITOR.dialog.add("latexlive", function (editor) {
    var jme_fid = "latexlive_" + Math.ceil(Math.random()*100) ;
    return {
        title: "公式编辑器",
        minWidth: "768px",
        minHeight: "600px",
        contents: [{
            id: "tab1", label: "", title: "", expand: true, width: "768px", height: "650px", padding: 0,
            elements: [{
                type: "html",
                html: '<div style="width:768px;height:650px;"><iframe id="'+jme_fid+'" style="width:768px;height:650px;" frameborder="no" src="' + CKEDITOR.basePath + 'plugins/latexlive/latexlive/html/index.html"></iframe></div>'
            }]
        }],
        onOk: function () {
            //点击确定按钮后的操作
            return document.getElementById(jme_fid).contentWindow.saveOK(editor);
        },
        onShow: function(){
            let mathml = '';
            let latex_data = '';
            let data_latex = '';
            if (editor.getSelection().getType() == CKEDITOR.SELECTION_ELEMENT && editor.getSelection().getSelectedElement().$.children.length > 0 && editor.getSelection().getSelectedElement().$.children[0].dataset.latexlive) {
                try {
                    latex_data = editor.getSelection().getSelectedElement().$.children[0].dataset.latexlive;
                }catch (e) {
                    latex_data = '';
                }

                mathml = latex_data != null?latex_data:data_latex;
            } else if(editor.getSelection().getType() == CKEDITOR.SELECTION_ELEMENT && editor.getSelection().getSelectedElement().getAttribute('data-latexlive')) {
                try {
                    latex_data = editor.getSelection().getSelectedElement().getAttribute('data-latexlive');
                }catch (e) {
                    latex_data = '';
                }

                mathml = latex_data != null?latex_data:data_latex;
            }

            try{
                document.getElementById(jme_fid).contentWindow.setLatex(mathml);
            }catch(e){

            }
            // sessionStorage.setItem("latex", mathml);
            // try {
            //     document.getElementById(jme_fid).contentWindow.setlatex(mathml === '' ? null: mathml);
            // }catch (e) {}
        }
    }
});


