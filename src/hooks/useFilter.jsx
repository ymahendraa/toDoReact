/**
 * /* eslint-disable eqeqeq
 *
 * @format
 */

/* eslint-disable array-callback-return */
import React from "react";

const useFilter = (dataTable, filter) => {
  const [filteredData, setFilteredData] = React.useState([]);
  const [onSearch, setOnSearch] = React.useState(false);

  // Function Filter Data
  const compare = (a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };
  const ReverseCompare = (a, b) => {
    if (a.title > b.title) {
      return -1;
    }
    if (a.title < b.title) {
      return 1;
    }
    return 0;
  };
  const CompareIsActive = (a, b) => {
    if (a.is_active > b.is_active) {
      return -1;
    }
    if (a.is_active < b.is_active) {
      return 1;
    }
    return 0;
  };

  React.useEffect(() => {
    const filteredSearch = () => {
      let updatedData = {};

      if (filter === "Z-A") {
        setOnSearch(true);
        let filtered = dataTable;
        filtered.todo_items = filtered.todo_items.sort(ReverseCompare);
        updatedData = filtered;
      }

      if (filter === "A-Z") {
        setOnSearch(true);
        let filtered = dataTable;
        filtered.todo_items = filtered.todo_items.sort(compare);
        updatedData = filtered;
      }

      if (filter === "Terlama") {
        setOnSearch(true);
        let filtered = dataTable;
        filtered.todo_items.reverse();
        if (filtered.todo_items === dataTable.todo_items) {
          updatedData = filtered;
        }
      }

      if (filter === "Belum Selesai") {
        setOnSearch(true);
        let filtered = dataTable;
        filtered.todo_items = filtered.todo_items.sort(CompareIsActive);
        updatedData = filtered;
      }

      if (filter === "" || filter === "Terbaru") {
        setOnSearch(false);
      }

      setFilteredData(updatedData);
    };

    filteredSearch();
  }, [dataTable, filter]);

  return { filteredData, onSearch };
};

export default useFilter;
