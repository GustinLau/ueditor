/**
 * 设置字间距
 * @file
 * @since 1.2.6.1
 */
UE.plugins["letterspacing"] = function() {
  var me = this;
  me.setOpt({ letterspacing: ["0.5","1", "2", "5", "8", "10", "12", "15"] });

  /**
     * 字间距
     * @command letterspacing
     * @method execCommand
     * @param { String } cmdName 命令字符串
     * @param { String } value 传入的行高值， 该值是当前字体的倍数， 例如： 1.5, 1.75
     * @example
     * ```javascript
     * editor.execCommand( 'letterspacing', 1.5);
     * ```
     */
  /**
     * 查询当前选区内容的行高大小
     * @command letterspacing
     * @method queryCommandValue
     * @param { String } cmd 命令字符串
     * @return { String } 返回当前行高大小
     * @example
     * ```javascript
     * editor.queryCommandValue( 'letterspacing' );
     * ```
     */

  me.commands["letterspacing"] = {
    execCommand: function(cmdName, value) {
      this.execCommand("paragraph", "p", {
        style: "letter-spacing:" + (value == "1" ? "normal" : value + "px")
      });
      return true;
    },
    queryCommandValue: function() {
      var pN = domUtils.filterNodeList(
        this.selection.getStartElementPath(),
        function(node) {
          return domUtils.isBlockElm(node);
        }
      );
      if (pN) {
        var value = domUtils.getComputedStyle(pN, "letter-spacing");
        return value == "normal" ? 1 : value.replace(/[^\d.]*/gi, "");
      }
    }
  };
};
