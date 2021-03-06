// vim: set ts=2 sts=2 sw=2 et si:

// Copyright (c) 2014 Kaname Kizu
// Released under the MIT License.

var klass = require("./../base/klass");
var devel = require("./../base/devel");

var Token = klass({
  _static: {
    make: function (t, v, l, c, nt) { return new Token(t, v, l, c, nt) },
    makeIdent: function (v, l, c) { return new Token("IDENTIFIER", v, l, c) },
    makeNum: function (v, l, c) { return new Token("NUM", v, l, c) },
    makeStr: function (v, l, c) { return new Token("STR", v, l, c) },
    makeIndent: function (v, l, c) { return new Token("INDENT", v, l, c) },
    makeError: function (l, c) { return new Token("ERROR", undefined, l, c) },
    makeEof: function (l, c) { return new Token("EOF", undefined, l, c) },
    makeUnquote: function (l, c) { return new Token("UNQUOTE", undefined, l, c) },
    makeUnquoteSplicing: function (l, c) { return new Token("UNQUOTE_S", undefined, l, c) },
    makePreservedComment: function (v, l, c) { return new Token("PCOMMENT", v, l, c); },

    makeInterpolatedStrHead: function (v, l, c) { return new Token("ISTR_HEAD", v, l, c) },
    makeInterpolatedStrPart: function (v, l, c) { return new Token("ISTR_PART", v, l, c) },
    makeInterpolatedStrTail: function (v, l, c) { return new Token("ISTR_TAIL", v, l, c) },

    makeRegExp: function (body, flags, l, c) { return new Token("REGEXP", { body: body, flags: flags }, l, c) },
    makeInterpolatedRegexpHead: function (v, l, c) { return new Token("REGEXP_HEAD", v, l, c) },
    makeInterpolatedRegexpPart: function (v, l, c) { return new Token("REGEXP_PART", v, l, c) },
    makeInterpolatedRegexpTail: function (body, flags, l, c) {
      return new Token("REGEXP_TAIL", { body: body, flags: flags }, l, c)
    },
  },

  initialize: function (t, v, l, c, nt) {
    this.toktype = t;
    this.val = v;
    this.line = l;
    this.col = c;

    // We also use a token as a node.
    // See the comment in Node.js for detail.
    this.nodetype = nt;
  },

  setNodeType: function (nt) {
    this.nodetype = nt;
    return this;
  },

  isEnd: function () {
    return this.toktype == "EOF" || this.toktype == "ERROR";
  },

  toString: function () {
    switch (this.toktype) {
    case "IDENTIFIER":
      return "identifier '" + this.val + "'";
    case "STR":
      return "string literal (" + this.val + ")";
    case "NUM":
      return "number literal (" + this.val + ")";
    case "REGEXP":
      return "regexp literal (/" + this.val.source + "/" + this.val.flags + ")";
    default:
      return this.toktype;
    }
  },

});

module.exports = Token;

