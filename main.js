/* ----- Type Definitions ----- */
/**
 * @typedef {Object} Movie
 * @property {number} budget
 * @property {number} revenue
 * @property {number} vote
 */
/**
 * @typedef {Object} AvgMovie
 * @property {number} avg_budget
 * @property {number} avg_revenue
 * @property {number} avg_vote
 */
/**
 * @typedef {Object} DataSet
 * @property {number[]} budget
 * @property {number[]} revenue
 * @property {number[]} vote
 *
 */

/* ----- Type Definitions ----- */
/* ----- HTML Computed Styles ----- */
/* ----- HTML Computed Styles ----- */

let mainApp = angular.module("main", []);

mainApp.filter("fromMap", function () {
  return function (input) {
    var out = {};
    input?.forEach((v, k) => (out[k] = v));
    return out;
  };
});
const toFixed = (number, precision) => {
  return parseFloat(number.toFixed(precision));
};
/**
 *
 * @param {Array<any>} data
 * @returns {Map<string, DataSet}
 */
const toDataSet = function (data) {
  return data.reduce((movies, movie) => {
    if (!movies.has(movie.original_language)) {
      if (
        movie.budget === undefined ||
        movie.revenue === undefined ||
        movie.vote_average === undefined
      ) {
        return movies;
      }
      movies.set(movie.original_language, {
        budget: [movie.budget],
        revenue: [movie.revenue],
        vote: [movie.vote_average],
      });
    } else {
      if (
        movie.budget === undefined ||
        movie.revenue === undefined ||
        movie.vote_average === undefined
      ) {
        return movies;
      }
      movies.get(movie.original_language).budget.push(movie.budget);
      movies.get(movie.original_language).revenue.push(movie.revenue);
      movies.get(movie.original_language).vote.push(movie.vote_average);
    }
    return movies;
  }, new Map());
};

/**
 *
 * @param {Array<any>} data
 * @returns {Map<string, Movie[]}
 */

const extractData = function (data) {
  return data.reduce((movies, movie) => {
    if (!movies.has(movie.original_language)) {
      if (
        movie.budget === undefined ||
        movie.revenue === undefined ||
        movie.vote_average === undefined
      ) {
        return movies;
      }
      movies.set(movie.original_language, [
        {
          budget: movie.budget,
          revenue: movie.revenue,
          vote: movie.vote_average,
        },
      ]);
    } else {
      if (
        movie.budget === undefined ||
        movie.revenue === undefined ||
        movie.vote_average === undefined
      ) {
        return movies;
      }
      movies.get(movie.original_language).push({
        budget: movie.budget,
        revenue: movie.revenue,
        vote: movie.vote_average,
      });
    }
    return movies;
  }, new Map());
};
/**
 *
 *  @param {Map<string, Movie[]>} data
 *  @returns {Map<string, number[][]}
 */
const toArrMap = (data) => {
  const m = new Map();
  data.forEach((movies, lang) => {
    m.set(
      lang,
      movies.reduce((acc, movie) => {
        acc.push([movie.budget, movie.revenue, movie.vote]);
        return acc;
      }, [])
    );
  });
  return m;
};
/**
 *
 * @param {Map<string, DataSet>}  data
 * @returns {Map<string, AvgMovie}
 */
const getAvgData = (data) => {
  const avgMap = new Map();
  data.forEach((movie, lang) => {
    if (
      movie.budget.length < 10 ||
      movie.revenue.length < 10 ||
      movie.vote.length < 10
    ) {
      return;
    }
    const avg_budget = jStat(movie.budget).mean();
    const avg_revenue = jStat(movie.revenue).mean();
    const avg_vote = jStat(movie.vote).mean();
    avgMap.set(lang, {
      avg_budget: toFixed(avg_budget, 0),
      avg_revenue: toFixed(avg_revenue, 0),
      avg_vote: toFixed(avg_vote, 1),
    });
  });
  return avgMap;
};
mainApp.controller("moviesController", function ($rootScope, $scope, $http) {
  $rootScope.maxSelection = 3;
  $rootScope.fields = [];
  $rootScope.test = "chisquare";
  $http.get("./data/tmdb_movies.json").then(
    function (jsonData) {
      const { data } = jsonData;
      const dataSet = toDataSet(data);
      $scope.avgMap = getAvgData(dataSet);
      $rootScope.selected = [];
      console.log($scope.avgMap);
    },
    function (err) {
      console.log(err);
    }
  );
  $scope.checkFields = (evt) => {
    const input = $(evt.target);
    if (input.is(":checked")) {
      $rootScope.fields.push(input.val());
    } else {
      $rootScope.fields.splice($rootScope.fields.indexOf(input.val()), 1);
    }
    console.log($rootScope.fields);
  };
  $scope.handleSelect = (evt) => {
    const input = $(evt.target);
    const name = input.val();
    if (
      input.is(":checked") &&
      $rootScope.selected.length < $rootScope.maxSelection
    ) {
      $rootScope.selected.push(name);
    } else if (!input.is(":checked")) {
      const idx = $rootScope.selected.indexOf(name);
      $rootScope.selected.splice(idx, 1);
    } else {
      input.prop("checked", false);
    }
    console.log($rootScope.selected);
  };
});

mainApp.controller(
  "statsController",
  async function ($rootScope, $scope, $http) {
    /**
     * @constant
     * @type {{movieMap: Map<string, DataSet>, avgMap: Map<string, AvgMovie>} | undefined}
     */

    const data = await $http.get("./data/tmdb_movies.json").then(
      function (jsonData) {
        const { data } = jsonData;
        const movieMap = toDataSet(data);
        const avgMap = getAvgData(movieMap);

        return { movieMap, avgMap };
      },
      function (err) {
        console.log(err);
        return;
      }
    );
    $rootScope.onCompare = function (evt) {
      const { selected, test, fields } = $rootScope;
      const testData = { data: {

      } };
      selected.forEach((seln) => {
        testData.data[seln] = data.avgMap.get(seln);
      });
    };
  }
);
