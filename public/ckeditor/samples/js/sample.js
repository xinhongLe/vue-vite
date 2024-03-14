/**
 * Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* exported initSample */

if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
  CKEDITOR.tools.enableHtml5Elements(document);

// The trick to keep the editor in the sample quite small
// unless user specified own height.
// CKEDITOR.config.image_previewText = ''
CKEDITOR.config.height = 150;
CKEDITOR.config.width = "auto";
CKEDITOR.config.mathJaxLib =
  "https://cdn.bootcss.com/mathjax/2.6.1/MathJax.js?config=TeX-AMS_HTML";
CKEDITOR.config.toolbar = [
  { name: "document", items: ["Source", "-", "Mathjax", "Link"] },
  {
    name: "clipboard",
    items: [
      "Cut",
      "Copy",
      "Paste",
      "PasteText",
      "PasteFromWord",
      "-",
      "Undo",
      "Redo",
    ],
  },
  { name: "basicstyles", items: ["Bold", "Italic", "Image", "Flash"] },
];

// 初始化编辑的函数
var initSampleMore = function (ed) {
  var wysiwygareaAvailable = isWysiwygareaAvailable(),
    isBBCodeBuiltIn = !!CKEDITOR.plugins.get("bbcode");

  // return function() {
  var editorElement = CKEDITOR.document.getById(ed);
  // alert(22222)
  // :(((
  if (isBBCodeBuiltIn) {
    editorElement.setHtml(
      "Hello world!\n\n" +
        "I'm an instance of [url=https://ckeditor.com]CKEditor[/url]."
    );
  }

  // Depending on the wysiwygare plugin availability initialize classic or inline editor.
  if (wysiwygareaAvailable) {
    console.log("========xxxx");
    CKEDITOR.replace(ed);
  } else {
    console.log("========dddddddxxxx");
    editorElement.setAttribute("contenteditable", "true");
    CKEDITOR.inline(ed);

    // TODO we can consider displaying some info box that
    // without wysiwygarea the classic editor may not work.
  }
  // };

  function isWysiwygareaAvailable() {
    // If in development mode, then the wysiwygarea must be available.
    // Split REV into two strings so builder does not replace it :D.
    if (CKEDITOR.revision == "%RE" + "V%") {
      return true;
    }

    return !!CKEDITOR.plugins.get("wysiwygarea");
  }
  // alert(ed);
};
var initSample = (function () {
  var wysiwygareaAvailable = isWysiwygareaAvailable(),
    isBBCodeBuiltIn = !!CKEDITOR.plugins.get("bbcode");

  return function () {
    var editorElement = CKEDITOR.document.getById("editor");

    // :(((
    if (isBBCodeBuiltIn) {
      editorElement.setHtml(
        "Hello world!\n\n" +
          "I'm an instance of [url=https://ckeditor.com]CKEditor[/url]."
      );
    }

    // Depending on the wysiwygare plugin availability initialize classic or inline editor.
    if (wysiwygareaAvailable) {
      CKEDITOR.replace("editor");
    } else {
      editorElement.setAttribute("contenteditable", "true");
      CKEDITOR.inline("editor");

      // TODO we can consider displaying some info box that
      // without wysiwygarea the classic editor may not work.
    }
  };

  function isWysiwygareaAvailable() {
    // If in development mode, then the wysiwygarea must be available.
    // Split REV into two strings so builder does not replace it :D.
    if (CKEDITOR.revision == "%RE" + "V%") {
      return true;
    }

    return !!CKEDITOR.plugins.get("wysiwygarea");
  }
})();
