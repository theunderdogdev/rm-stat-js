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
 * @param {Array<any>} _arr
 * @returns {Array<any>}
 */
const shuffle = function (_arr) {
  const arr = [..._arr].sort(() => 0.5 - Math.random());
  return arr;
};

console.log("Hello");
let mainApp = angular.module("moviesApp", ['ngResource']);
mainApp.filter("fromMap", function () {
  return function (input) {
    var out = {};
    input?.forEach((v, k) => (out[k] = v));
    return out;
  };
});
mainApp.filter("trust", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

let MOVIE;

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
    $rootScope.constants = { ZCOUNT: 2, ANOVA: 3 };
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
    console.log(movieCounts);
    $scope.selection = [];
    $scope.test_data = null;
    $scope.avg_data = null;
    $scope.isEnabled = false;
    $rootScope.$watch("test.name", function () {
      $rootScope.test.what = "";
      $scope.test_data = null;
      $scope.avg_data = null;
      $scope.selection = [];
      $scope.isEnabled = false;
      console.log("Reset");
    });
    $rootScope.$watch("test.what", function () {
      const { name, what } = $rootScope.test;
      console.log(name, what);
      $scope.selection = [];
      $scope.isEnabled = false;
      if (name === "z_test" && what === "revenue") {
        const langs = Object.keys(movieCounts).filter(
          (k) => movieCounts[k] / 2 >= 35
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
      } else if (name === "z_test" && what === "genre") {
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
          .filter(([k, v]) => v.length / 2 >= 35)
          .reduce((acc, [k, v]) => {
            acc[k] = v;
            return acc;
          }, new Object());
        $scope.test_data = genPop;
        $scope.avg_data = Object.entries(genPop).reduce((avgAcc, [k, v]) => {
          avgAcc[k] = jStat(v).mean();
          return avgAcc;
        }, new Object());
      } else if (name === "anova" && what === "genre") {
        let genreRev = {};

        allGenres.forEach((genre) => {
          genreRev[genre] = { revenue: [], votes: [], popularity: [] };
          movies.forEach(
            ({
              original_language,
              genres,
              revenue,
              vote_average,
              popularity,
            }) => {
              if (
                original_language === "English" &&
                genres[0] === genre &&
                revenue !== undefined &&
                vote_average !== undefined &&
                popularity !== undefined
              ) {
                genreRev[genre].revenue.push(revenue);
                genreRev[genre].votes.push(vote_average);
                genreRev[genre].popularity.push(popularity);
              }
            }
          );
        });
        genreRev = Object.keys(genreRev)
          .filter((g) => genreRev[g].revenue.length > 60)
          .reduce((_acc, gen) => {
            _acc[gen] = genreRev[gen];
            return _acc;
          }, new Object());
        console.log(genreRev);
        $scope.test_data = genreRev;
        $scope.avg_data = Object.entries(genreRev).reduce((_acc, [k, v]) => {
          _acc[k] = { revenue: 0, votes: 0, popularity: 0 };
          _acc[k].revenue = jStat.mean(v.revenue);
          _acc[k].votes = jStat.mean(v.votes);
          _acc[k].popularity = jStat.mean(v.popularity);
          return _acc;
        }, new Object());
        console.log($rootScope.test, $scope.test_data, $scope.avg_data);
      }
    });

    $(document).on(
      "click",
      ".lang-card, .genre-card, .field-card",
      function (evt) {
        const el = $(evt.currentTarget);
        const attr =
          el.data("st-lang") || el.data("st-genre") || el.data("st-field");
        const MAX_SEL =
          el.hasClass("lang-card") || el.hasClass("genre-card")
            ? $rootScope.constants.ZCOUNT
            : $rootScope.constants.ANOVA;
        console.log(attr);
        if (
          !$scope.selection.includes(attr) &&
          $scope.selection.length < MAX_SEL
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
          if ($rootScope.test.name !== "anova") {
            console.log("nanova");
            $scope.isEnabled = $scope.selection.length === MAX_SEL;
          } else {
            console.log("anova");
            $scope.isEnabled =
              $scope.selection.length > 0 && $scope.selection.length <= MAX_SEL;
          }
        });
      }
    );

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
  console.log(test_data);
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
    anova(selection, test_data) {
      const samples = Object.keys(test_data).reduce((_acc, genre) => {
        _acc[genre] = {};
        selection.forEach((sel) => {
          const shuffled = shuffle(test_data[genre][sel]);
          _acc[genre][sel] = shuffled.slice(0, 70);
        });
        return _acc;
      }, new Object());
      const means = Object.keys(samples).reduce((_acc, genre) => {
        _acc[genre] = {};
        selection.forEach((sel) => {
          _acc[genre][sel] = jStat.mean(samples[genre][sel]);
        });
        return _acc;
      }, new Object());
      const variances = Object.keys(samples).reduce((_acc, genre) => {
        _acc[genre] = {};
        selection.forEach((sel) => {
          _acc[genre][sel] = jStat.variance(samples[genre][sel]);
        });
        return _acc;
      }, new Object());
      return [samples, means, variances];
    },
  };
  $scope._testFns = {
    z_test(sampMeans, popStDev, selection, n1, n2) {
      const meanDiff = sampMeans[selection[0]] - sampMeans[selection[1]];
      const popVariance =
        Math.pow(popStDev[selection[0]], 2) / n1 +
        Math.pow(popStDev[selection[1]], 2) / n2;
      const z_score = meanDiff / Math.sqrt(popVariance);
      return jStat.ztest(z_score, 2);
    },
    anova(selection, samples) {
      if (selection.length === 1) {
        const k = Object.keys(samples).length;
        const { n, arr } = Object.keys(samples).reduce(
          (_acc, genre) => {
            _acc.arr.push(samples[genre][selection[0]]);
            _acc.n = _acc.n + samples[genre][selection[0]].length;
            return _acc;
          },
          { n: 0, arr: [] }
        );
        const fscore = jStat.anovafscore(arr);
        return jStat.ftest(fscore, k - 1, n - k);
      } else {
        const { n, T, SS } = Object.keys(samples).reduce(
          (_acc, genre) => {
            selection.forEach((sel) => {
              _acc.n = _acc.n + samples[genre][sel].length;
              _acc.T = _acc.T + jStat.sum(samples[genre][sel]);
              _acc.SS += jStat.sumsqrd(samples[genre][sel]);
            });
            return _acc;
          },
          { n: 0, T: 0, SS: 0 }
        );
        const cf = Math.pow(T, 2) / n;
        const TotalSS = SS - cf;
        const SScol =
          Object.entries(
            selection.reduce(
              (_acc, sel) => {
                Object.keys(samples).forEach((genre) => {
                  _acc[sel].total += jStat.sum(samples[genre][sel]);
                  _acc[sel].n += samples[genre][sel].length;
                });
                return _acc;
              },
              {
                votes: { total: 0, n: 0 },
                popularity: { total: 0, n: 0 },
                revenue: { total: 0, n: 0 },
              }
            )
          ).reduce((_acc, [k, v]) => {
            if (v.n !== 0) {
              console.log("summing", k, n);
              _acc += Math.pow(v.total, 2) / v.n;
            }
            return _acc;
          }, 0) - cf;
        const SSrow =
          Object.entries(
            Object.keys(samples).reduce((_acc, genre) => {
              _acc[genre] = { total: 0, n: 0 };
              selection.forEach((sel) => {
                _acc[genre].total += jStat.sum(samples[genre][sel]);
                _acc[genre].n += samples[genre][sel].length;
              });
              return _acc;
            }, new Object())
          ).reduce((_acc, [k, v]) => {
            console.log("Row sum", k);
            _acc += Math.pow(v.total, 2) / v.n;
            return _acc;
          }, 0) - cf;
        const c = selection.length;
        const r = Object.keys(samples).length;
        const nsamp = samples[Object.keys(samples)[0]][selection[0]].length;
        const SSres = TotalSS - (SScol + SSrow);
        const MScol = SScol / (c - 1);
        const MSrow = SSrow / (r - 1);
        const MSres = SSres / ((nsamp - 1) * c * r);

        const colP = jStat.ftest(MScol / MSres, c - 1, (nsamp - 1) * c * r);

        const rowP = jStat.ftest(MSrow / MSres, r - 1, (nsamp - 1) * c * r);

        return [colP, rowP];
      }
    },
  };
  $scope.hypothesis = function () {

    if (name === "z_test") {
      const [sampMeans, popStDev] = $scope.tables[name](selection, test_data);
      $scope.means = sampMeans;
      $scope.stdevs = popStDev;
    } else if (name === "anova") {
      const [samples, means, anv_vars] = $scope.tables[name](
        selection,
        test_data
      );
      console.log(anv_vars);
      console.log(samples, means);
      $scope.genre_str = Object.keys(samples).join(", ");
      $scope.field_str = selection.join(", ");
      $scope.samples = samples;
      $scope.means = means;
      $scope.anv_vars = anv_vars;
    }
    $scope.what = what;
    $scope.name = name;
  };
  $scope.test = function () {
    if (name === "z_test") {
      $scope.pval = $scope._testFns[name](
        $scope.means,
        $scope.stdevs,
        selection,
        test_data[selection[0]].length,
        test_data[selection[1]].length
      );
    } else if (name === "anova") {
      if(selection.length > 1){
        const [col, row] = $scope._testFns[name](
          selection,
          $scope.samples,
        );
        $scope.pval = {col: col, row: row};
      }else{
        $scope.pval = $scope._testFns[name](
          selection,
          $scope.samples,
        );
      }
      console.log($scope.pval);
    }
    console.log($scope.pval);
    $scope.tested = true;
  };
});
// "genres":\s?"(\w+)"
