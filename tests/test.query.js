import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import ide from "../js/ide";

describe("ide.query", function () {
  var orig_codeEditor, orig_map;
  beforeEach(function () {
    orig_codeEditor = ide.codeEditor;
    ide.codeEditor = {};
    orig_map = ide.map;
    ide.map = {
      bboxfilter: {
        isEnabled: function () {
          return false;
        }
      },
      getBounds: function () {
        return L.latLngBounds([1, 2], [3, 4]);
      },
      getCenter: function () {
        return L.latLng([5, 6]);
      }
    };
  });
  afterEach(function () {
    ide.map = orig_map;
    ide.codeEditor = orig_codeEditor;
    vi.restoreAllMocks();
  });

  // expand {{parameters}} in ql query
  it("expand {{parameters}} in ql query", function () {
    vi.spyOn(ide, "setQuery").mockImplementation(() => {});
    var examples = [
      {
        // simple expansion
        inp: "{{parameter=foo}};{{parameter}}",
        outp: ";foo"
      },
      {
        // simple non-expansion
        inp: "{{parameter1=foo}};{{parameter2}}",
        outp: ";"
      },
      {
        // multiple expansion
        inp: "{{parameter=foo}};{{parameter}}{{parameter}}",
        outp: ";foofoo"
      }
    ];
    var callback = vi.fn(() => 0);
    for (var i = 0; i < examples.length; i++) {
      ide.codeEditor.getValue = function () {
        return examples[i].inp;
      };
      ide.getQuery(callback);
      expect(callback).toHaveBeenCalledWith(examples[i].outp);
    }
    ide.setQuery.restore();
  });
  // expand {{parameters}} in xml query
  it("expand {{parameters}} in xml", function () {
    vi.spyOn(ide, "setQuery").mockImplementation(() => {});
    var examples = [
      {
        // simple expansion
        inp: "{{parameter=foo}}<xml>{{parameter}}</xml>",
        outp: "<xml>foo</xml>"
      },
      {
        // simple non-expansion
        inp: "{{parameter1=foo}}<xml>{{parameter2}}</xml>",
        outp: "<xml></xml>"
      },
      {
        // multiple expansion
        inp: "{{parameter=foo}}<xml>{{parameter}}{{parameter}}</xml>",
        outp: "<xml>foofoo</xml>"
      }
    ];
    var callback = vi.fn(() => 0);
    for (var i = 0; i < examples.length; i++) {
      ide.codeEditor.getValue = function () {
        return examples[i].inp;
      };
      ide.getQuery(callback);
      expect(callback).toHaveBeenCalledWith(examples[i].outp);
    }
    ide.setQuery.restore();
  });
  // expand {{bbox}}
  it("expand {{bbox}}", function () {
    vi.spyOn(ide, "setQuery").mockImplementation(() => {});
    var examples = [
      {
        // ql query
        inp: "({{bbox}})",
        outp: "(1,2,3,4)"
      },
      {
        // xml query
        inp: "<bbox-query {{bbox}}/>",
        outp: '<bbox-query s="1" w="2" n="3" e="4"/>'
      },
      {
        // xml query global bbox
        inp: '<osm-script bbox="{{bbox}}"/>',
        outp: '<osm-script bbox="1,2,3,4"/>'
      }
    ];
    var callback = vi.fn(() => 0);
    for (var i = 0; i < examples.length; i++) {
      ide.codeEditor.getValue = function () {
        return examples[i].inp;
      };
      ide.getQuery(callback);
      expect(callback).toHaveBeenCalledWith(examples[i].outp);
    }
    ide.setQuery.restore();
  });
  // expand {{center}}
  it("expand {{center}}", function () {
    vi.spyOn(ide, "setQuery").mockImplementation(() => {});
    var examples = [
      {
        // ql query
        inp: "({{center}})",
        outp: "(5,6)"
      },
      {
        // xml query
        inp: "<around {{center}}/>",
        outp: '<around lat="5" lon="6"/>'
      }
    ];
    var callback = vi.fn(() => 0);
    for (var i = 0; i < examples.length; i++) {
      ide.codeEditor.getValue = function () {
        return examples[i].inp;
      };
      ide.getQuery(callback);
      expect(callback).toHaveBeenCalledWith(examples[i].outp);
    }
    ide.setQuery.restore();
  });
});
