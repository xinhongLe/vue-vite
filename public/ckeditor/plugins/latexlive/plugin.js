CKEDITOR.plugins.add("latexlive", {
    icons: 'latexlive', requires: ["dialog"],
        init: function(editor) {
            editor.addCommand("latexlive", new CKEDITOR.dialogCommand("latexlive"));
            editor.ui.addButton("latexlive", {
                label: "公式",//调用dialog时显示的名称
                command: "latexlive",
                icon: this.path + "/icons/latexlive.png"//在toolbar中的图标
            });
            editor.on("doubleclick", function (evt) {
                if (evt.data.element.$.previousSibling?.dataset?.widget === "mathjax") evt.data.dialog = "latexlive";
            });
            if ( editor.contextMenu ) {
                editor.addMenuGroup( 'latexliveGroup' );
                editor.addMenuItem( 'latexLiveMathEditorItem', {
                    label: '编辑公式',
                    icon: this.path + "/icons/latexlive.png",//在toolbar中的图标
                    command: 'latexlive',
                    group: 'latexliveGroup'
                });

                editor.contextMenu.addListener( function( element ) {
                    if ( element.$.children.length > 0 && element.$.children[0].dataset.latexlive ) {
                        return { latexLiveMathEditorItem: CKEDITOR.TRISTATE_OFF };
                    }
                });
            }

            CKEDITOR.dialog.add("latexlive", this.path + "dialogs/latexlive.js")

        }

});