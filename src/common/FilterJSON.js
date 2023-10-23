import React from "react";

const FilterJSON = (inputval) => {
  var output = [];
  if (inputval != undefined && Array.isArray(inputval)) {
    inputval.forEach(function (item) {
      var existing = output.filter(function (v, i) {
        return v.name == item.name;
      });
      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].data = output[existingIndex]?.data?.concat(
          item.data
        );
      } else {
        if (typeof item.data == "string") item.data = [item.data];
        output.push(item);
      }
    });
  }
  return output;
};

export default FilterJSON;
