CKEDITOR.plugins.add("specialchar2", {
    icons: 'specialchar2',
    requires: "dialog",
    init: function (a) {
        a.addCommand("specialchar2", new CKEDITOR.dialogCommand("specialchar2Dialog"));
        a.ui.addButton && a.ui.addButton("SpecialChar2", {
            label: "插入符号",
            command: "specialchar2",
            icon: this.path + "/icons/specialChar2.png",
        })
        CKEDITOR.dialog.add("specialchar2Dialog", this.path + "dialogs/specialchar2.js");
    }
});