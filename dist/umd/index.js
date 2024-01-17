(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@weizx/react-tree"] = {}));
})(this, (function (exports) { 'use strict';

    var index = (function () {
      return '123213';
    });

    var useTree = function useTree() {
      return {};
    };

    exports.Tree = index;
    exports.useTree = useTree;

}));
