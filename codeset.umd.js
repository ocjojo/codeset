!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).codeset={})}(this,function(e){"use strict";function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}for(var n=r("abcdefghijklmnopqrstuvwxyz"),o=[],i=0;i<1024;i++)o.push(String.fromCodePoint(918e3+i));var a,c,f=r("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");function u(e){if("string"==typeof e)return Array.from((a||(a=new TextEncoder),a).encode(e)).reduce(function(e,t){var r=t.toString(2);return e+"00000000".slice(r.length)+r},"")}function l(e){return(c||(c=new TextDecoder),c).decode(new Uint8Array(e))}var s=function(){function e(t){var r,n=t.alphabet;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n.length<1)throw new Error("Provide an alphabet with at least two characters.");this.chunkSize=(r=n.length,31-Math.clz32(r)),this.alphabet=n}var r,n,o;return r=e,(n=[{key:"encode",value:function(e){for(var t=this.chunkSize,r=this.alphabet,n=u(e);n.length%t>0;)n+="00000000";for(var o="",i=0;i<n.length;i+=t){o+=r[parseInt(n.slice(i,i+t),2)]}return o}},{key:"decode",value:function(e){for(var t=this.alphabet,r=(1<<this.chunkSize-1).toString(2).replace("1","0"),n=Array.from(e).reduce(function(e,n){var o=t.indexOf(n);if(o<0)return e;var i=o.toString(2);return e+r.slice(i.length)+i},""),o=[],i=0;i<n.length;i+=8){var a=parseInt(n.slice(i,i+8),2);o.push(a)}return l(o)}}])&&t(r.prototype,n),o&&t(r,o),e}();e.alphabet=n,e.base64=f,e.codeset=s,e.invisible=o,Object.defineProperty(e,"__esModule",{value:!0})});
