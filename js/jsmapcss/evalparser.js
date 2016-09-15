styleparser.evalparser = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleIndices = { Expression: 0 },
        peg$startRuleIndex   = 0,

        peg$consts = [
          peg$FAILED,
          "==",
          { type: "literal", value: "==", description: "\"==\"" },
          function(op1, op2) { return ""+(isNaN(+op1) || isNaN(+op2) ? op1 == op2 : +op1 == +op2) },
          "!=",
          { type: "literal", value: "!=", description: "\"!=\"" },
          "<>",
          { type: "literal", value: "<>", description: "\"<>\"" },
          function(op1, op2) { return ""+(isNaN(+op1) || isNaN(+op2) ? op1 != op2 : +op1 != +op2) },
          ">",
          { type: "literal", value: ">", description: "\">\"" },
          function(op1, op2) { return ""+(isNaN(+op1) || isNaN(+op2) ? op1 >  op2 : +op1 >  +op2) },
          ">=",
          { type: "literal", value: ">=", description: "\">=\"" },
          function(op1, op2) { return ""+(isNaN(+op1) || isNaN(+op2) ? op1 >= op2 : +op1 >= +op2) },
          "<",
          { type: "literal", value: "<", description: "\"<\"" },
          function(op1, op2) { return ""+(isNaN(+op1) || isNaN(+op2) ? op1 <  op2 : +op1 <  +op2) },
          "<=",
          { type: "literal", value: "<=", description: "\"<=\"" },
          function(op1, op2) { return ""+(isNaN(+op1) || isNaN(+op2) ? op1 <= op2 : +op1 <= +op2) },
          "eq",
          { type: "literal", value: "eq", description: "\"eq\"" },
          function(op1, op2) { return ""+(op1 === op2) },
          "ne",
          { type: "literal", value: "ne", description: "\"ne\"" },
          function(op1, op2) { return ""+(op1 !== op2) },
          "&&",
          { type: "literal", value: "&&", description: "\"&&\"" },
          function(op1, op2) { return ""+(["false", "no", "0", 0, ""].indexOf(op1) < 0 && ["false", "no", "0", 0, ""].indexOf(op2) < 0) },
          "||",
          { type: "literal", value: "||", description: "\"||\"" },
          function(op1, op2) { return ""+(["false", "no", "0", 0, ""].indexOf(op1) < 0 || ["false", "no", "0", 0, ""].indexOf(op2) < 0) },
          [],
          ".",
          { type: "literal", value: ".", description: "\".\"" },
          "+",
          { type: "literal", value: "+", description: "\"+\"" },
          "-",
          { type: "literal", value: "-", description: "\"-\"" },
          function(head, tail) {
                var result = head, i;

                for (i = 0; i < tail.length; i++) {
                  if (tail[i][1] === ".") { result = ""+(result + tail[i][3]); }
                  if (tail[i][1] === "+") { result = ""+(+result + +tail[i][3]); }
                  if (tail[i][1] === "-") { result = ""+(result-tail[i][3]); }
                }

                return result;
              },
          "*",
          { type: "literal", value: "*", description: "\"*\"" },
          "/",
          { type: "literal", value: "/", description: "\"/\"" },
          function(head, tail) {
                var result = head, i;

                for (i = 0; i < tail.length; i++) {
                  if (tail[i][1] === "*") { result = ""+(result * tail[i][3]); }
                  if (tail[i][1] === "/") { result = ""+(result / tail[i][3]); }
                }

                return result;
              },
          "!",
          { type: "literal", value: "!", description: "\"!\"" },
          function(expr) { return ["false", "no", "0", 0, ""].indexOf(expr) >= 0 ? "true" : "false" },
          "num(",
          { type: "literal", value: "num(", description: "\"num(\"" },
          ")",
          { type: "literal", value: ")", description: "\")\"" },
          function(expr) { return ""+(parseFloat(expr) || "") },
          "str(",
          { type: "literal", value: "str(", description: "\"str(\"" },
          function(expr) { return ""+expr },
          "sqrt(",
          { type: "literal", value: "sqrt(", description: "\"sqrt(\"" },
          function(expr) { return ""+Math.sqrt(expr) },
          "int(",
          { type: "literal", value: "int(", description: "\"int(\"" },
          function(expr) { return ""+(expr < 0 ? Math.ceil(expr) : Math.floor(expr)) },
          "boolean(",
          { type: "literal", value: "boolean(", description: "\"boolean(\"" },
          function(expr) { return ["false", "no", "0", 0, ""].indexOf(expr) >= 0 ? "false" : "true" },
          "max(",
          { type: "literal", value: "max(", description: "\"max(\"" },
          ",",
          { type: "literal", value: ",", description: "\",\"" },
          function(head, tail) { return ""+tail.reduce(function(acc,val) { return Math.max(+acc,+val[3]); }, +head) },
          "min(",
          { type: "literal", value: "min(", description: "\"min(\"" },
          function(head, tail) { return ""+tail.reduce(function(acc,val) { return Math.min(+acc,+val[3]); }, +head) },
          "concat(",
          { type: "literal", value: "concat(", description: "\"concat(\"" },
          function(head, tail) { return tail.reduce(function(acc,val) { return acc+val[3]; }, ""+head) },
          "cond(",
          { type: "literal", value: "cond(", description: "\"cond(\"" },
          function(exprCond, exprTrue, exprFalse) { return ["false", "no", "0", 0, ""].indexOf(exprCond) < 0 ? exprTrue : exprFalse },
          "any(",
          { type: "literal", value: "any(", description: "\"any(\"" },
          function(head, tail) { return tail.reduce(function(acc,val) { return acc || val[3]; }, head) },
          "tag(",
          { type: "literal", value: "tag(", description: "\"tag(\"" },
          function(expr) { return styleparser.evalparser.tag(expr) },
          "(",
          { type: "literal", value: "(", description: "\"(\"" },
          function(expr) { return expr; },
          { type: "other", description: "string" },
          "none",
          { type: "literal", value: "none", description: "\"none\"" },
          function() { return "" },
          null,
          /^[0-9]/,
          { type: "class", value: "[0-9]", description: "[0-9]" },
          "E",
          { type: "literal", value: "E", description: "\"E\"" },
          function() { return ""+parseFloat(text()); },
          "\"",
          { type: "literal", value: "\"", description: "\"\\\"\"" },
          "'",
          { type: "literal", value: "'", description: "\"'\"" },
          function(parts) { return parts[1]; },
          { type: "other", description: "whitespace" },
          /^[ \t\n\r]/,
          { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
          function(chars) { return chars.join(""); },
          void 0,
          "\\",
          { type: "literal", value: "\\", description: "\"\\\\\"" },
          { type: "any", description: "any character" },
          function(char_) { return char_;     },
          function(sequence) { return sequence;  },
          /^['"\\bfnrtv]/,
          { type: "class", value: "['\"\\\\bfnrtv]", description: "['\"\\\\bfnrtv]" },
          function(char_) {
                return char_
                  .replace("b", "\b")
                  .replace("f", "\f")
                  .replace("n", "\n")
                  .replace("r", "\r")
                  .replace("t", "\t")
                  .replace("v", "\x0B") // IE does not recognize "\v".
              }
        ],

        peg$bytecode = [
          peg$decode("!7!+W$7%+M%.!\"\"2!3\"+=%7%+3%7 +)%4%6#%\"$ %$%#  $$#  $##  $\"#  \"#  *\u029C \"!7!+c$7%+Y%.$\"\"2$3%*) \".&\"\"2&3'+=%7%+3%7 +)%4%6(%\"$ %$%#  $$#  $##  $\"#  \"#  *\u024B \"!7!+W$7%+M%.)\"\"2)3*+=%7%+3%7 +)%4%6+%\"$ %$%#  $$#  $##  $\"#  \"#  *\u0206 \"!7!+W$7%+M%.,\"\"2,3-+=%7%+3%7 +)%4%6.%\"$ %$%#  $$#  $##  $\"#  \"#  *\u01C1 \"!7!+W$7%+M%./\"\"2/30+=%7%+3%7 +)%4%61%\"$ %$%#  $$#  $##  $\"#  \"#  *\u017C \"!7!+W$7%+M%.2\"\"2233+=%7%+3%7 +)%4%64%\"$ %$%#  $$#  $##  $\"#  \"#  *\u0137 \"!7!+W$7%+M%.5\"\"2536+=%7%+3%7 +)%4%67%\"$ %$%#  $$#  $##  $\"#  \"#  *\xF2 \"!7!+W$7%+M%.8\"\"2839+=%7%+3%7 +)%4%6:%\"$ %$%#  $$#  $##  $\"#  \"#  *\xAD \"!7!+W$7%+M%.;\"\"2;3<+=%7%+3%7 +)%4%6=%\"$ %$%#  $$#  $##  $\"#  \"#  *h \"!7!+W$7%+M%.>\"\"2>3?+=%7%+3%7 +)%4%6@%\"$ %$%#  $$#  $##  $\"#  \"#  *# \"7!"),
          peg$decode("!7\"+\xC9$ A!7%+_$.B\"\"2B3C*5 \".D\"\"2D3E*) \".F\"\"2F3G+7%7%+-%7\"+#%'$%$$#  $##  $\"#  \"#  ,j&!7%+_$.B\"\"2B3C*5 \".D\"\"2D3E*) \".F\"\"2F3G+7%7%+-%7\"+#%'$%$$#  $##  $\"#  \"#  \"+)%4\"6H\"\"! %$\"#  \"#  "),
          peg$decode("!7#+\xB1$ A!7%+S$.I\"\"2I3J*) \".K\"\"2K3L+7%7%+-%7#+#%'$%$$#  $##  $\"#  \"#  ,^&!7%+S$.I\"\"2I3J*) \".K\"\"2K3L+7%7%+-%7#+#%'$%$$#  $##  $\"#  \"#  \"+)%4\"6M\"\"! %$\"#  \"#  "),
          peg$decode("!.N\"\"2N3O+<$7%+2%7 +(%4#6P#! %$##  $\"#  \"#  *\u05BD \"!.Q\"\"2Q3R+V$7%+L%7 +B%7%+8%.S\"\"2S3T+(%4%6U%!\"%$%#  $$#  $##  $\"#  \"#  *\u0573 \"!.V\"\"2V3W+V$7%+L%7 +B%7%+8%.S\"\"2S3T+(%4%6X%!\"%$%#  $$#  $##  $\"#  \"#  *\u0529 \"!.Y\"\"2Y3Z+V$7%+L%7 +B%7%+8%.S\"\"2S3T+(%4%6[%!\"%$%#  $$#  $##  $\"#  \"#  *\u04DF \"!.\\\"\"2\\3]+V$7%+L%7 +B%7%+8%.S\"\"2S3T+(%4%6^%!\"%$%#  $$#  $##  $\"#  \"#  *\u0495 \"!._\"\"2_3`+V$7%+L%7 +B%7%+8%.S\"\"2S3T+(%4%6a%!\"%$%#  $$#  $##  $\"#  \"#  *\u044B \"!.b\"\"2b3c+\xC7$7%+\xBD%7 +\xB3% A!7%+G$.d\"\"2d3e+7%7%+-%7 +#%'$%$$#  $##  $\"#  \"#  ,R&!7%+G$.d\"\"2d3e+7%7%+-%7 +#%'$%$$#  $##  $\"#  \"#  \"+C%7%+9%.S\"\"2S3T+)%4&6f&\"#\"%$&#  $%#  $$#  $##  $\"#  \"#  *\u0390 \"!.g\"\"2g3h+\xC7$7%+\xBD%7 +\xB3% A!7%+G$.d\"\"2d3e+7%7%+-%7 +#%'$%$$#  $##  $\"#  \"#  ,R&!7%+G$.d\"\"2d3e+7%7%+-%7 +#%'$%$$#  $##  $\"#  \"#  \"+C%7%+9%.S\"\"2S3T+)%4&6i&\"#\"%$&#  $%#  $$#  $##  $\"#  \"#  *\u02D5 \"!.j\"\"2j3k+\xC7$7%+\xBD%7 +\xB3% A!7%+G$.d\"\"2d3e+7%7%+-%7 +#%'$%$$#  $##  $\"#  \"#  ,R&!7%+G$.d\"\"2d3e+7%7%+-%7 +#%'$%$$#  $##  $\"#  \"#  \"+C%7%+9%.S\"\"2S3T+)%4&6l&\"#\"%$&#  $%#  $$#  $##  $\"#  \"#  *\u021A \"!.m\"\"2m3n+\xB4$7%+\xAA%7 +\xA0%7%+\x96%.d\"\"2d3e+\x86%7%+|%7 +r%7%+h%.d\"\"2d3e+X%7%+N%7 +D%7%+:%.S\"\"2S3T+*%4-6o-#*&\"%$-#  $,#  $+#  $*#  $)#  $(#  $'#  $&#  $%#  $$#  $##  $\"#  \"#  *\u0172 \"!.p\"\"2p3q+\xC7$7%+\xBD%7 +\xB3% A!7%+G$.d\"\"2d3e+7%7%+-%7 +#%'$%$$#  $##  $\"#  \"#  ,R&!7%+G$.d\"\"2d3e+7%7%+-%7 +#%'$%$$#  $##  $\"#  \"#  \"+C%7%+9%.S\"\"2S3T+)%4&6r&\"#\"%$&#  $%#  $$#  $##  $\"#  \"#  *\xB7 \"!.s\"\"2s3t+V$7%+L%7 +B%7%+8%.S\"\"2S3T+(%4%6u%!\"%$%#  $$#  $##  $\"#  \"#  *m \"!.v\"\"2v3w+V$7%+L%7 +B%7%+8%.S\"\"2S3T+(%4%6x%!\"%$%#  $$#  $##  $\"#  \"#  *# \"7$"),
          peg$decode("8!.z\"\"2z3{+& 4!6|! %*\u0173 \"!.F\"\"2F3G*# \" }+\xEE$ A0~\"\"1!3+,$,)&0~\"\"1!3\"\"\"  +\xC9%!.B\"\"2B3C+H$ A0~\"\"1!3+,$,)&0~\"\"1!3\"\"\"  +#%'\"%$\"#  \"#  *# \" }+\x83%!.\x80\"\"2\x803\x81+^$.F\"\"2F3G*# \" }+H% A0~\"\"1!3+,$,)&0~\"\"1!3\"\"\"  +#%'#%$##  $\"#  \"#  *# \" }+'%4$6\x82$ %$$#  $##  $\"#  \"#  *\x8B \"!!.\x83\"\"2\x833\x84+=$7&+3%.\x83\"\"2\x833\x84+#%'#%$##  $\"#  \"#  *N \"!.\x85\"\"2\x853\x86+=$7'+3%.\x85\"\"2\x853\x86+#%'#%$##  $\"#  \"#  +' 4!6\x87!! %9*\" 3y"),
          peg$decode("8 A0\x89\"\"1!3\x8A,)&0\x89\"\"1!3\x8A\"9*\" 3\x88"),
          peg$decode("! A7(,#&7(\"+' 4!6\x8B!! %"),
          peg$decode("! A7),#&7)\"+' 4!6\x8B!! %"),
          peg$decode("!!8.\x83\"\"2\x833\x84*) \".\x8D\"\"2\x8D3\x8E9*$$\"\" \x8C\"#  +7$-\"\"1!3\x8F+(%4\"6\x90\"! %$\"#  \"#  *C \"!.\x8D\"\"2\x8D3\x8E+2$7*+(%4\"6\x91\"! %$\"#  \"#  "),
          peg$decode("!!8.\x85\"\"2\x853\x86*) \".\x8D\"\"2\x8D3\x8E9*$$\"\" \x8C\"#  +7$-\"\"1!3\x8F+(%4\"6\x90\"! %$\"#  \"#  *C \"!.\x8D\"\"2\x8D3\x8E+2$7*+(%4\"6\x91\"! %$\"#  \"#  "),
          peg$decode("!0\x92\"\"1!3\x93+' 4!6\x94!! %")
        ],

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleIndices)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleIndex = peg$startRuleIndices[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$decode(s) {
      var bc = new Array(s.length), i;

      for (i = 0; i < s.length; i++) {
        bc[i] = s.charCodeAt(i) - 32;
      }

      return bc;
    }

    function peg$parseRule(index) {
      var bc    = peg$bytecode[index],
          ip    = 0,
          ips   = [],
          end   = bc.length,
          ends  = [],
          stack = [],
          params, i;

      function protect(object) {
        return Object.prototype.toString.apply(object) === "[object Array]" ? [] : object;
      }

      while (true) {
        while (ip < end) {
          switch (bc[ip]) {
            case 0:
              stack.push(protect(peg$consts[bc[ip + 1]]));
              ip += 2;
              break;

            case 1:
              stack.push(peg$currPos);
              ip++;
              break;

            case 2:
              stack.pop();
              ip++;
              break;

            case 3:
              peg$currPos = stack.pop();
              ip++;
              break;

            case 4:
              stack.length -= bc[ip + 1];
              ip += 2;
              break;

            case 5:
              stack.splice(-2, 1);
              ip++;
              break;

            case 6:
              stack[stack.length - 2].push(stack.pop());
              ip++;
              break;

            case 7:
              stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
              ip += 2;
              break;

            case 8:
              stack.pop();
              stack.push(input.substring(stack[stack.length - 1], peg$currPos));
              ip++;
              break;

            case 9:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1]) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 10:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] === peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 11:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] !== peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 12:
              if (stack[stack.length - 1] !== peg$FAILED) {
                ends.push(end);
                ips.push(ip);

                end = ip + 2 + bc[ip + 1];
                ip += 2;
              } else {
                ip += 2 + bc[ip + 1];
              }

              break;

            case 13:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (input.length > peg$currPos) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 14:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 15:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 16:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 17:
              stack.push(input.substr(peg$currPos, bc[ip + 1]));
              peg$currPos += bc[ip + 1];
              ip += 2;
              break;

            case 18:
              stack.push(peg$consts[bc[ip + 1]]);
              peg$currPos += peg$consts[bc[ip + 1]].length;
              ip += 2;
              break;

            case 19:
              stack.push(peg$FAILED);
              if (peg$silentFails === 0) {
                peg$fail(peg$consts[bc[ip + 1]]);
              }
              ip += 2;
              break;

            case 20:
              peg$reportedPos = stack[stack.length - 1 - bc[ip + 1]];
              ip += 2;
              break;

            case 21:
              peg$reportedPos = peg$currPos;
              ip++;
              break;

            case 22:
              params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
              for (i = 0; i < bc[ip + 3]; i++) {
                params[i] = stack[stack.length - 1 - params[i]];
              }

              stack.splice(
                stack.length - bc[ip + 2],
                bc[ip + 2],
                peg$consts[bc[ip + 1]].apply(null, params)
              );

              ip += 4 + bc[ip + 3];
              break;

            case 23:
              stack.push(peg$parseRule(bc[ip + 1]));
              ip += 2;
              break;

            case 24:
              peg$silentFails++;
              ip++;
              break;

            case 25:
              peg$silentFails--;
              ip++;
              break;

            default:
              throw new Error("Invalid opcode: " + bc[ip] + ".");
          }
        }

        if (ends.length > 0) {
          end = ends.pop();
          ip = ips.pop();
        } else {
          break;
        }
      }

      return stack[0];
    }

    peg$result = peg$parseRule(peg$startRuleIndex);

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();