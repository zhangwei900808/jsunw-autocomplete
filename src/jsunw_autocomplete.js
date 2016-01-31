/**
 * 自动完成，集成了标签输入功能
 * 支持自定义数据类型
 * 支持单选多选模式
 * 支持jsonp
 *
 * Copyright © 2015 [Sun Wang]. All Rights Reserved.
 * @author [Sun Wang]
 * @date 16/1/31
 * @time 下午10:04
 * @version 1.0
 */
(function(w, d, $, u) {
    if( !($ = w[$]) ) throw "jQuery is not found!"

    var jsunw = w.jsunw || ( w.jsunw = {} )
    if( jsunw.autocomplete ) return false;  // 保证脚本幂等性
    $.extend(true, jsunw, {
        autocomplete: {
            plugin: {
                name: "autocomplete",
                version: "1.0-SNAPSHOT"
            },
            global: {},
            modules: {}
        }
    })
    var autocomplete = jsunw.autocomplete,
        data_key = "jsunw-autocomplete",
        language

    var methods = {
        add: function( item ) {

        },
        /**
         * 初始化
         * @param options
         * @private
         */
        _init: function( options ) {
            methods._options.call( this, options )
            methods._create.call( this )
            methods._listen.call( this )
        },
        /**
         * 配置处理
         * @param options
         * @private
         */
        _options: function( options ) {
            options = $.extend( true, this.data() || {}, options )
            // 处理模块通用配置
            var module
            if( typeof ( module = options.module ) === "string" && module in autocomplete.modules ) {
                module = autocomplete.modules[ module ]
            }
            options = $.extend( true, {}, autocomplete.global, module, options )
            //语言初始化
            language = $.jsunw_autocomplete[ options.language ]
            this.options = options
            this.data( data_key, options )
        },
        /**
         * html
         */
        _html: {
            tags: "<div class=\"{inputClass} jsunw-autocomplete-tags\">",
            tag: "<span class=\"jsunw-autocomplete-tag label label-{tagStyle}\">",
            remove: "<span data-role=\"remove\" title=\"{removeTitle}\">",
            input: "<input class=\"jsunw-autocomplete-tags-input\">"
        },
        /**
         * 创建dom
         * @private
         */
        _create: function() {
            this.$div = $( methods._html.tags.replace( /\{inputClass\}/g, this.attr("class") || "" ))
                .insertBefore( this.addClass("hide") )
            this.$input = $( methods._html.input)
                .appendTo( this.$div )
        },
        /**
         * 监听事件
         * @private
         */
        _listen: function() {
            var self = this
            self.$div.on("click", function() {
                $(this).addClass("focus")
                self.$input.focus()
            }).on("click", "[data-role=remove]", function() {
                $(this).closest(".jsunw-autocomplete-tag").fadeOut("fast", function() {
                    if($.isFunction(self.options.remove)) self.options.remove.call( self, $(this).data( "jsunw-autocomplete-tag" ) )
                } )
            })
            self.$input.on("click", function() {

            })
        },
        _destroy: function() {
            this.$div
                .off("click")
                .remove()
            this.removeClass("hide")

        },
        _on: function() {
            this.$div.on("click", function() {
                this.$input.focus()
            })
        },
        _off: function() {

        },
        _enable: function() {

        },
        _disable: function() {

        },
        _trigger: function() {

        }
    }

    $.fn.jsunw_autocomplete = function( options ) {
        var result = []
        this.each(function() {
            if( typeof options === "string" && options.charAt(0) != "_" && methods[options] ) {
                result.push( methods[options].apply( $(this), Array.prototype.slice.call( 1 ) ) )
            } else if( !options || $.isPlainObject( options ) ) {
                methods._init.call( $(this), options )
            }
        })
        switch ( result.length ) {
            case 0:
                return this
            case 1:
                return result[0]
            default :
                return result;
        }
    }

    $.jsunw_autocomplete = {
        defaults: {
            // configurations
            module: "",
            language: "zh"

            // callback
        }
    }

    $.jsunw_autocomplete["zh"] = {
        removeTitle: "移除"
    }

    //别名设置
    !$.fn.jsunw_ac && !$.jsunw_ac && ( $.fn.jsunw_ac = $.fn.jsunw_autocomplete, $.jsunw_ac = $.jsunw_autocomplete )

    $(function() {
        $("[data-role=jsunw_autocomplete]").jsunw_autocomplete()
    })

})(window, document, "jQuery")