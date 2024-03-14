/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    
    //是否强制去除复制来的内容格式
    config.forcePasteAsPlainText = true
    // 语言配置
    config.language = 'zh-cn'
    // tab空格配置
    config.TabSpaces = 1
    //保留span元素
    config.allowedContent = true
    // 字体配置
    // config.font_names = '宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;' + config.font_names
    config.font_defaultLabel = 'Arial'
    config.fontSize_defaultLabel = '16'
    // 关闭底部标签
    config.removePlugins = 'elementspath,specialchar'
    config.resize_enabled = false
    // config.disableNativeSpellChecker = false
    // 数学公式table去格式化
    config.enterMode = CKEDITOR.ENTER_BR
    config.shiftEnterMode = CKEDITOR.ENTER_BR
    // config.extraAllowedContent = 'span[*]'
    // config.protectedSource.push(/<span dealflag=[\s\S]*?\>/g); //allows beginning <span> tag
    // config.protectedSource.push(/<\/span[\s\S]*?\>/g); //allows ending </span> tag
    //图片上传配置
    config.image_previewText = ' '
    config.removeDialogTabs = 'image:advanced;image:Link' //隐藏超链接与高级选项
    config.filebrowserImageUploadUrl = 'http://47.103.142.91:5002/Api/W4/Question/UploadImage?action=upload' //上传图片的地址
    // config.filebrowserImageUploadUrl = "http://192.168.20.44:5008/Api/W4/Question/UploadImage?action=upload";//上传图片的地址
    // 数学公式配置
    // config.mathJaxLib = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
    config.mathJaxLib = 'https://mathjax-lyzh.lyx-edu.com/MathJax.js?config=TeX-AMS-MML_HTMLorMML' //乐意智慧公司服务器，版本-2.7.1
    // 外部插件
    // config.extraPlugins = 'mathjax,quicktable'
    config.extraPlugins = 'quicktable,latexlive,specialchar2'

    // 工具栏配置
    config.toolbar = [
        {
            name: 'save',
            items: [
                'Undo',
                'Redo',
                '-',
                'Bold',
                'Italic',
                'Underline',
                'Strike',
                'Subscript',
                'Superscript',
                // 'SpecialChar',
                'SpecialChar2',
                // 'Mathjax',
                'latexlive',
                '-',
                'NumberedList',
                'BulletedList',
                'Outdent',
                'Indent',
                // 'HorizontalRule',
                '-',
                'JustifyLeft',
                'JustifyCenter',
                'JustifyRight',
                'JustifyBlock',
                '-',
                'Format', 'Font', 'FontSize', 'TextColor', 'BGColor', 'Image', 'Table'
            ]
        },
        // { name: 'basicstyles', items: ['Format', 'Font', 'FontSize', 'TextColor', 'BGColor', 'Image', 'Table', 'Maximize'] }
    ]
}