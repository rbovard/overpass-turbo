import {beforeEach, describe, expect, it} from "vitest";
import ffs from "../js/ffs";
import {setPresets} from "../js/ffs/free";

describe("ide.ffs", function () {
  function construct_query(search) {
    return new Promise((resolve, reject) => {
      ffs.construct_query(search, undefined, function (err, result) {
        if (err) {
          reject(err);
        } else if (typeof result === "string") {
          resolve(compact(result));
        } else {
          resolve(result);
        }
      });
    });
  }

  function compact(q) {
    q = q.replace(/\/\*[\s\S]*?\*\//g, "");
    q = q.replace(/\/\/.*/g, "");
    q = q.replace(/\[out:json\]\[timeout:.*?\];/, "");
    q = q.replace(/\(\{\{bbox\}\}\)/g, "(bbox)");
    q = q.replace(/\{\{geocodeArea:([^\}]*)\}\}/g, "area($1)");
    q = q.replace(/\{\{geocodeCoords:([^\}]*)\}\}/g, "coords:$1");
    q = q.replace(/\{\{date:([^\}]*)\}\}/g, "date:$1");
    q = q.replace(/\{\{[\s\S]*?\}\}/g, "");
    q = q.replace(/ *\n */g, "");
    return q;
  }
  var out_str = "out body;>;out skel qt;";

  // basic conditions
  describe("basic conditions", function () {
    // key
    it("key=*", async function () {
      var search = "foo=*";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"](bbox);' + ");" + out_str
      );
    });
    // not key
    it("key!=*", async function () {
      var search = "foo!=*";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"!~".*"](bbox);' + ");" + out_str
      );
    });
    // key-value
    it("key=value", async function () {
      var search = "foo=bar";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"="bar"](bbox);' + ");" + out_str
      );
    });
    // not key-value
    it("key!=value", async function () {
      var search = "foo!=bar";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"!="bar"](bbox);' + ");" + out_str
      );
    });
    // regex key-value
    it("key~value", async function () {
      var search = "foo~bar";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"~"bar"](bbox);' + ");" + out_str
      );
    });
    // regex key
    it("~key~value", async function () {
      var search = "~foo~bar";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr[~"foo"~"bar"](bbox);' + ");" + out_str
      );
    });
    // not regex key-value
    it("key!~value", async function () {
      var search = "foo!~bar";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"!~"bar"](bbox);' + ");" + out_str
      );
    });
    // susbtring key-value
    it("key:value", async function () {
      // normal case: just do a regex search
      var search = "foo:bar";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"~"bar"](bbox);' + ");" + out_str
      );
      // but also escape special characters
      search = "foo:'*'";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"~"\\\\*"](bbox);' + ");" + out_str
      );
    });
  });

  // data types
  describe("data types", function () {
    describe("strings", function () {
      // strings
      it("double quoted strings", async function () {
        var search, result;
        // double-quoted string
        search = '"a key"="a value"';
        await expect(construct_query(search)).resolves.to.equal(
          "(" + 'nwr["a key"="a value"](bbox);' + ");" + out_str
        );
      });
      it("single-quoted string", async function () {
        var search, result;
        // single-quoted string
        search = "'foo bar'='asd fasd'";
        await expect(construct_query(search)).resolves.to.equal(
          "(" + 'nwr["foo bar"="asd fasd"](bbox);' + ");" + out_str
        );
      });
      it("quoted unicode string", async function () {
        var search = "name='بیجنگ'";
        await expect(construct_query(search)).resolves.to.equal(
          "(" + 'nwr["name"="بیجنگ"](bbox);' + ");" + out_str
        );
      });
      it("unicode string", async function () {
        var search = "name=Béziers";
        await expect(construct_query(search)).resolves.to.equal(
          "(" + 'nwr["name"="Béziers"](bbox);' + ");" + out_str
        );
      });
    });
    // regexes
    it("regex", async function () {
      var search, result;
      // simple regex
      search = "foo~/bar/";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"~"bar"](bbox);' + ");" + out_str
      );
      // simple regex with modifier
      search = "foo~/bar/i";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"~"bar",i](bbox);' + ");" + out_str
      );
    });
  });

  // boolean logic
  describe("boolean logic", function () {
    // logical and
    it("logical and", async function () {
      var search = "foo=bar and asd=fasd";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"="bar"]["asd"="fasd"](bbox);' + ");" + out_str
      );
    });
    it("logical and (& operator)", async function () {
      var search = "foo=bar & asd=fasd";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"="bar"]["asd"="fasd"](bbox);' + ");" + out_str
      );
    });
    it("logical and (&& operator)", async function () {
      var search = "foo=bar && asd=fasd";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["foo"="bar"]["asd"="fasd"](bbox);' + ");" + out_str
      );
    });
    // logical or
    it("logical or", async function () {
      var search = "foo=bar or asd=fasd";
      await expect(construct_query(search)).resolves.to.equal(
        "(" +
          'nwr["foo"="bar"](bbox);' +
          'nwr["asd"="fasd"](bbox);' +
          ");" +
          out_str
      );
    });
    it("logical or (| operator)", async function () {
      var search = "foo=bar | asd=fasd";
      await expect(construct_query(search)).resolves.to.equal(
        "(" +
          'nwr["foo"="bar"](bbox);' +
          'nwr["asd"="fasd"](bbox);' +
          ");" +
          out_str
      );
    });
    it("logical or (|| operator)", async function () {
      var search = "foo=bar || asd=fasd";
      await expect(construct_query(search)).resolves.to.equal(
        "(" +
          'nwr["foo"="bar"](bbox);' +
          'nwr["asd"="fasd"](bbox);' +
          ");" +
          out_str
      );
    });
    // boolean expression
    it("boolean expression", async function () {
      var search = "(foo=* or bar=*) and (asd=* or fasd=*)";
      await expect(construct_query(search)).resolves.to.equal(
        "(" +
          'nwr["foo"]["asd"](bbox);' +
          'nwr["foo"]["fasd"](bbox);' +
          'nwr["bar"]["asd"](bbox);' +
          'nwr["bar"]["fasd"](bbox);' +
          ");" +
          out_str
      );
    });
  });

  // meta conditions
  describe("meta conditions", function () {
    // type
    it("type", async function () {
      // simple
      var search = "foo=bar and type:node";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'node["foo"="bar"](bbox);' + ");" + out_str
      );
      // multiple types
      search = "foo=bar and (type:node or type:way)";
      await expect(construct_query(search)).resolves.to.equal(
        "(" +
          'node["foo"="bar"](bbox);' +
          'way["foo"="bar"](bbox);' +
          ");" +
          out_str
      );
      // excluding types
      search = "foo=bar and type:node and type:way";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + ");" + out_str
      );
    });
    // newer
    it("newer", async function () {
      // regular
      var search = 'newer:"2000-01-01T01:01:01Z" and type:node';
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'node(newer:"2000-01-01T01:01:01Z")(bbox);' + ");" + out_str
      );
      // relative
      search = "newer:1day and type:node";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'node(newer:"date:1day")(bbox);' + ");" + out_str
      );
    });
    // user
    it("user", async function () {
      // user name
      var search = "user:foo and type:node";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'node(user:"foo")(bbox);' + ");" + out_str
      );
      // uid
      search = "uid:123 and type:node";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + "node(uid:123)(bbox);" + ");" + out_str
      );
    });
    // id
    it("id", async function () {
      // with type
      var search = "id:123 and type:node";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + "node(123)(bbox);" + ");" + out_str
      );
      // without type
      search = "id:123";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + "nwr(123)(bbox);" + ");" + out_str
      );
    });
  });

  // search-regions
  describe("regions", function () {
    // global
    it("global", async function () {
      var search = "foo=bar and type:node global";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'node["foo"="bar"];' + ");" + out_str
      );
    });
    // bbox
    it("in bbox", async function () {
      // implicit
      var search = "type:node";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + "node(bbox);" + ");" + out_str
      );
      // explicit
      search = "type:node in bbox";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + "node(bbox);" + ");" + out_str
      );
    });
    // area
    it("in area", async function () {
      var search = "type:node in foobar";
      await expect(construct_query(search)).resolves.to.equal(
        "area(foobar)->.searchArea;" +
          "(" +
          "node(area.searchArea);" +
          ");" +
          out_str
      );
    });
    // around
    it("around", async function () {
      var search = "type:node around foobar";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + "node(around:,coords:foobar);" + ");" + out_str
      );
    });
  });

  // free form
  describe("free form", function () {
    beforeEach(function () {
      setPresets({
        "amenity/hospital": {
          name: "Hospital",
          terms: [],
          geometry: ["point", "area"],
          tags: {amenity: "hospital"}
        },
        "amenity/shelter": {
          name: "Shelter",
          terms: [],
          geometry: ["point"],
          tags: {amenity: "shelter"}
        },
        highway: {
          name: "Highway",
          terms: [],
          geometry: ["line"],
          tags: {highway: "*"}
        }
      });
    });

    it("preset not found", async function () {
      var search = "foo";
      await expect(construct_query(search)).rejects.to.throw(
        "unknown ffs string"
      );
    });
    it("preset (points, key-value)", async function () {
      var search = "Shelter";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'node["amenity"="shelter"](bbox);' + ");" + out_str
      );
    });
    it("preset (points, areas, key-value)", async function () {
      var search = "Hospital";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'nwr["amenity"="hospital"](bbox);' + ");" + out_str
      );
    });
    it("preset (lines, key=*)", async function () {
      var search = "Highway";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'way["highway"](bbox);' + ");" + out_str
      );
    });
  });

  // sanity conversions for special conditions
  describe("special cases", function () {
    // empty value
    it("empty value", async function () {
      var search = "foo='' and type:way";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'way["foo"~"^$"](bbox);' + ");" + out_str
      );
    });
    // empty key
    it("empty key", async function () {
      var search = "''=bar and type:way";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'way[~"^$"~"^bar$"](bbox);' + ");" + out_str
      );
      // make sure stuff in the value section gets escaped properly
      search = "''='*' and type:way";
      await expect(construct_query(search)).resolves.to.equal(
        "(" + 'way[~"^$"~"^\\\\*$"](bbox);' + ");" + out_str
      );
      // does also work for =*, ~ and : searches
      search = "(''=* or ''~/.../) and type:way";
      await expect(construct_query(search)).resolves.to.equal(
        "(" +
          'way[~"^$"~".*"](bbox);' +
          'way[~"^$"~"..."](bbox);' +
          ");" +
          out_str
      );
    });
    // newlines, tabs
    it("newlines, tabs", async function () {
      var search = "(foo='\t' or foo='\n' or asd='\\t') and type:way";
      await expect(construct_query(search)).resolves.to.equal(
        "(" +
          'way["foo"="\\t"](bbox);' +
          'way["foo"="\\n"](bbox);' +
          'way["asd"="\\t"](bbox);' +
          ");" +
          out_str
      );
    });
  });
});
