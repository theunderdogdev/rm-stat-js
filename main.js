let mainApp = angular.module("main", []);
mainApp.filter("fromMap", function () {
  return function (input) {
    var out = {};
    input?.forEach((v, k) => (out[k] = v));
    return out;
  };
});
/**
 * @typedef {Object} Movie
 * @property {number} budget
 * @property {number} revenue
 * @property {number} vote
 */
const toFixed = (number, precision) => {
  return parseFloat(number.toFixed(precision));
};
/**
 *
 * @param {Array<any>} data
 * @returns {Map<string, Movie}
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
 * @param {Map<string, number[][]>}  data
 * @returns {Map<string, number[][]}
 */
const getAvgData = (data) => {
  const avgMap = new Map();
  data.forEach((movie, lang) => {
    if (movie.length < 10) {
      return;
    }
    const [meanBudge, meanRev, meanVote] = jStat(movie).mean();
    avgMap.set(lang, [
      toFixed(meanBudge, 0),
      toFixed(meanRev, 0),
      toFixed(meanVote, 1),
    ]);
  });
  return avgMap;
};
mainApp.controller("moviesController", function ($rootScope, $scope, $http) {
  $rootScope.maxSelection = 3
  $http.get("./data/tmdb_movies.json").then(
    function (jsonData) {
      const { data } = jsonData;
      const movieMap = extractData(data);
      $scope.avgMap = getAvgData(toArrMap(movieMap));
      $scope.selected = [];

      console.log($scope.avgMap);
    },
    function (err) {
      console.log(err);
    }
  );
  $scope.handleSelect = (evt)=>{
    const input = $(evt.target);
      const name = input.val();
      if (input.is(":checked") && $scope.selected.length < $rootScope.maxSelection) {
        $scope.selected.push(name);
      }
      else if (!input.is(":checked")) {
        const idx = $scope.selected.indexOf(name);
        $scope.selected.splice(idx, 1);
      }else{
        input.prop("checked", false)
      }
      console.log($scope.selected);
  }
  
});
