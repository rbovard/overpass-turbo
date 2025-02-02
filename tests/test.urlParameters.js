import {describe, expect, it} from "vitest";
import settings from "../js/settings";
import urlParameters from "../js/urlParameters";

describe("urlParameters", function () {
  // no parameters
  it("defaults", function () {
    var args = urlParameters("");
    expect(args).toMatchObject({
      has_query: false,
      has_coords: false,
      has_zoom: false,
      run_query: false
    });
    var args = urlParameters("?");
    expect(args).toMatchObject({
      has_query: false,
      has_coords: false,
      has_zoom: false,
      run_query: false
    });
  });
  // query (uncompressed)
  it("query", function () {
    var args = urlParameters("?Q=foo");
    expect(args).toMatchObject({
      has_query: true,
      query: "foo",
      has_coords: false,
      has_zoom: false
    });
  });
  // query (compressed)
  it("query (compressed)", function () {
    var args = urlParameters("?q=Zm9v");
    expect(args).toMatchObject({
      has_query: true,
      query: "foo",
      has_coords: false,
      has_zoom: false
    });
  });
  // coords (uncompressed)
  it("coords", function () {
    var args = urlParameters("?C=0;180;1");
    expect(args).toMatchObject({
      has_query: false,
      has_coords: true,
      coords: {lat: 0.0, lng: 180.0},
      has_zoom: true,
      zoom: 1
    });
  });
  // coords (uncompressed, lat/lon/zoom)
  it("coords (lat/lon/zoom)", function () {
    var args = urlParameters("?lat=0&lon=180.0&zoom=1");
    expect(args).toMatchObject({
      has_query: false,
      has_coords: true,
      coords: {lat: 0.0, lng: 180.0},
      has_zoom: true,
      zoom: 1
    });
    var args = urlParameters("?lat=0&lon=180.0");
    expect(args).toMatchObject({
      has_query: false,
      has_coords: true,
      coords: {lat: 0.0, lng: 180.0},
      has_zoom: false
    });
    var args = urlParameters("?zoom=1");
    expect(args).toMatchObject({
      has_query: false,
      has_coords: false,
      has_zoom: true,
      zoom: 1
    });
  });
  // coords (compressed)
  it("coords (compressed)", function () {
    var args = urlParameters("?c=CTVpCWdRAB");
    expect(args).toMatchObject({
      has_coords: true,
      coords: {lat: 0.0, lng: 180.0},
      has_zoom: true,
      zoom: 1
    });
  });
  // RUN flag
  it("RUN flag", function () {
    var args = urlParameters("?Q=foo&R");
    expect(args).toMatchObject({run_query: true});
    var args = urlParameters("?Q=foo&R=true");
    expect(args).toMatchObject({run_query: true});
  });
  // template
  it("template", async function () {
    var orig_ss = settings.saves;
    settings.saves = {
      T: {type: "template", parameters: ["p"], wizard: "name={{p}}"}
    };
    var args = new Promise((resolve, reject) =>
      urlParameters(
        "?template=T&p=foo",
        (err, result) => (err && reject(err)) || resolve(result)
      )
    );
    await expect(args).resolves.toMatchObject({
      has_query: true,
      query: `/*
This has been generated by the overpass-turbo wizard.
The original search was:
“name=foo”
*/
[out:json][timeout:25];
// gather results
(
  // query part for: “name=foo”
  // nwr is short for node/way/relation
  nwr[\"name\"=\"foo\"]({{bbox}});
);
// print results
out body;
>;
out skel qt;`
    });
    settings.saves = orig_ss;
  });
});
