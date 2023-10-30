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
/**
 *
 * @typedef {Object} MovieData
 * @property {(number | undefined)} budget
 * @property {string[]} genres
 * @property {(string | undefined)} homepage
 * @property {number} id
 * @property {string} original_language
 * @property {string} overview
 * @property {number} popularity
 * @property {string} poster_path
 * @property {string} release_date
 * @property {(number | undefined)} revenue
 * @property {(number | undefined)} runtime
 * @property {string} tagline
 * @property {string} title
 * @property {number} vote_average
 * @property {number} vote_count
 * @property {Object} external_ids
 * @property {Object} similar
 * @property {(string | undefined)} certification
 * @property {Object} directors
 * @property {Object} writers
 * @property {Object} cast
 * @property {(string | undefined)} trailer_yt
 */
/* ----- Type Definitions ----- */

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
 * @param {Array<any>} _arr
 * @returns {Array<any>}
 */
const shuffle = function (_arr) {
  const arr = [..._arr].sort(() => 0.5 - Math.random());
  return arr;
};

console.log("Hello");
let mainApp = angular.module("moviesApp", []);
mainApp.filter("fromMap", function () {
  return function (input) {
    var out = {};
    input?.forEach((v, k) => (out[k] = v));
    return out;
  };
});

let MOVIE;
const dont = [
  "Animation",
  "Western",
  "Music",
  "Thriller",
  "TV Movie",
  "War",
  "Fantasy",
  "Science Fiction",
  "History",
];

mainApp.controller(
  "moviesController",
  async function ($rootScope, $scope, $http) {
    const formModal = new bootstrap.Modal("#data-test");
    console.log(formModal);
    formModal.show();
    $rootScope.mode = "selection";

    $rootScope.test = {
      name: "",
      what: "",
      test_data: null,
      avg_data: null,
      selection: [],
    };
    $rootScope.constants = { ZCOUNT: 2 };
    const allMovies = await $http.get("/data/tmdb_movies.json");
    /**
     * @constant
     * @type {{data: MovieData}}
     */
    const { data: movies } = allMovies;
    MOVIE = movies;
    const fields = new Set();
    const allGenres = new Set();
    console.log(movies);
    const movieCounts = {};
    movies.forEach((movie) => {
      const { original_language, genres } = movie;
      if (movieCounts[original_language] === undefined) {
        movieCounts[original_language] = 1;
      } else {
        movieCounts[original_language] += 1;
      }
      if (typeof genres === "string") {
        allGenres.add(genres);
      } else {
        genres.forEach((genre) => {
          allGenres.add(genre);
        });
      }
      Object.keys(movie).forEach((field) => {
        fields.add(field);
      });
    });

    $scope.selection = [];
    $scope.test_data = null;
    $scope.avg_data = null;
    $scope.isEnabled = false;
    $rootScope.$watch("test.what", function () {
      const { name, what } = $rootScope.test;
      $scope.selection = [];
      $scope.isEnabled = false;
      if (name === "z_test" && what === "revenue") {
        const langs = Object.keys(movieCounts).filter(
          (k) => movieCounts[k] >= 100
        );
        const revenues = langs.reduce((acc, lang) => {
          acc[lang] = [];
          movies.forEach(({ original_language, revenue }) => {
            if (original_language === lang && revenue !== undefined) {
              acc[lang].push(revenue);
            }
          });
          return acc;
        }, new Object());
        $scope.test_data = revenues;
        $scope.avg_data = Object.entries(revenues).reduce(
          (avgAcc, [lang, revenue]) => {
            avgAcc[lang] = jStat(revenue).mean();
            return avgAcc;
          },
          new Object()
        );
      }
      if (name === "z_test" && what === "genre") {
        let genPop = {};
        allGenres.forEach((genre) => {
          genPop[genre] = [];
          movies.forEach(({ genres, popularity }) => {
            if (genres && genres[0] === genre && popularity !== undefined) {
              genPop[genre].push(popularity);
            }
          });
        });
        console.log(genPop);
        genPop = Object.entries(genPop)
          .filter(([k, v]) => v.length >= 100)
          .reduce((acc, [k, v]) => {
            acc[k] = v;
            return acc;
          }, new Object());
        $scope.test_data = genPop;
        $scope.avg_data = Object.entries(genPop).reduce((avgAcc, [k, v]) => {
          avgAcc[k] = jStat(v).mean();
          return avgAcc;
        }, new Object());
      }
    });

    $(document).on("click", ".lang-card, .genre-card", function (evt) {
      const el = $(evt.currentTarget);
      const attr = el.data("st-lang") || el.data("st-genre");
      console.log(attr);
      if (
        !$scope.selection.includes(attr) &&
        $scope.selection.length < $rootScope.constants.ZCOUNT
      ) {
        el.addClass("selected");
        $scope.$apply(function () {
          $scope.selection.push(attr);
        });
      } else {
        el.removeClass("selected");
        const idx = $scope.selection.indexOf(attr);
        if (idx !== -1) {
          $scope.$apply(function () {
            $scope.selection.splice(idx, 1);
          });
        }
      }
      $scope.$apply(function () {
        $scope.isEnabled = $scope.selection.length === 2;
      });
    });

    $scope.moveToRoot = function () {
      $rootScope.test.test_data = $scope.test_data;
      $rootScope.test.avg_data = $scope.avg_data;
      $rootScope.test.selection = $scope.selection;
      $rootScope.mode = "test";
      formModal.hide();
    };
  }
);
mainApp.controller("testController", function ($rootScope, $scope) {
  /**
   * @constant
   * @type {{ test_data: Object, avg_data: Object, what: string, name: string, selection: string[] }}
   */
  const { test_data, avg_data, what, name, selection } = $rootScope.test;

  $scope.selection = selection;
  $scope.tested = false;
  $scope.tables = {
    z_test(selection, test_data) {
      const samples = selection.reduce((_acc, sel) => {
        const _newArr = shuffle(test_data[sel]);
        _acc[sel] = _newArr.slice(0, Math.round(_newArr.length / 2));
        return _acc;
      }, {});
      const sampMeans = selection.reduce((_acc, sel) => {
        _acc[sel] = jStat(samples[sel]).mean();
        return _acc;
      }, new Object());
      $scope.means = [sampMeans[selection[0]], sampMeans[selection[1]]];

      const stdDevs = selection.reduce((_acc, sel) => {
        _acc[sel] = jStat(test_data[sel]).stdev();
        return _acc;
      }, new Object());
      return [sampMeans, stdDevs];
    },
  };
  $scope._testFns = {
    z_test(sampMeans, popStDev, selection) {
      const meanDiff = sampMeans[selection[0]] - sampMeans[selection[1]];
      const popVariance =
        Math.pow(popStDev[selection[0]], 2) / test_data[selection[0]].length +
        Math.pow(popStDev[selection[1]], 2) / test_data[selection[1]].length;
      const z_score = meanDiff / Math.sqrt(popVariance);
      return jStat.ztest(z_score, 2);
    },
  };
  $scope.hypothesis = function () {
    if($scope.tested){
      return;
    }
    const [sampMeans, popStDev] = $scope.tables[name](selection, test_data);
    $scope.means = sampMeans;
    $scope.stdevs = popStDev;
    $scope.what = what;
    $scope.name = name;
  };
  $scope.test = function () {
    $scope.pval = $scope._testFns[name]($scope.means, $scope.stdevs, selection);
    console.log($scope.pval)
    $scope.tested = true
  };
});
// "genres":\s?"(\w+)"
