// /**
//  * @typedef jStat
//  * @property {function(): jStat} fn
//  * @property {function(): jStat} _init
//  * @property {function(): jStat} utils
//  * @property {function(): jStat} _random_fn
//  * @property {function(): jStat} setRandom
//  * @property {function(): jStat} extend
//  * @property {function(): jStat} rows
//  * @property {function(): jStat} cols
//  * @property {function(): jStat} dimensions
//  * @property {function(): jStat} row
//  * @property {function(): jStat} rowa
//  * @property {function(): jStat} col
//  * @property {function(): jStat} cola
//  * @property {function(): jStat} diag
//  * @property {function(): jStat} antidiag
//  * @property {function(): jStat} transpose
//  * @property {function(): jStat} map
//  * @property {function(): jStat} cumreduce
//  * @property {function(): jStat} alter
//  * @property {function(): jStat} create
//  * @property {function(): jStat} zeros
//  * @property {function(): jStat} ones
//  * @property {function(): jStat} rand
//  * @property {function(): jStat} identity
//  * @property {function(): jStat} symmetric
//  * @property {function(): jStat} clear
//  * @property {function(): jStat} seq
//  * @property {function(): jStat} arange
//  * @property {function(): jStat} slice
//  * @property {function(): jStat} sliceAssign
//  * @property {function(): jStat} diagonal
//  * @property {function(): jStat} copy
//  * @property {function(): jStat} sum
//  * @property {function(): jStat} sumsqrd
//  * @property {function(): jStat} sumsqerr
//  * @property {function(): jStat} sumrow
//  * @property {function(): jStat} product
//  * @property {function(): jStat} min
//  * @property {function(): jStat} max
//  * @property {function(): jStat} unique
//  * @property {function(): jStat} mean
//  * @property {function(): jStat} meansqerr
//  * @property {function(): jStat} geomean
//  * @property {function(): jStat} median
//  * @property {function(): jStat} cumsum
//  * @property {function(): jStat} cumprod
//  * @property {function(): jStat} diff
//  * @property {function(): jStat} rank
//  * @property {function(): jStat} mode
//  * @property {function(): jStat} range
//  * @property {function(): jStat} variance
//  * @property {function(): jStat} pooledvariance
//  * @property {function(): jStat} deviation
//  * @property {function(): jStat} stdev
//  * @property {function(): jStat} pooledstdev
//  * @property {function(): jStat} meandev
//  * @property {function(): jStat} meddev
//  * @property {function(): jStat} coeffvar
//  * @property {function(): jStat} quartiles
//  * @property {function(): jStat} quantiles
//  * @property {function(): jStat} percentile
//  * @property {function(): jStat} percentileOfScore
//  * @property {function(): jStat} histogram
//  * @property {function(): jStat} covariance
//  * @property {function(): jStat} corrcoeff
//  * @property {function(): jStat} spearmancoeff
//  * @property {function(): jStat} stanMoment
//  * @property {function(): jStat} skewness
//  * @property {function(): jStat} kurtosis
//  * @property {function(): jStat} gammaln
//  * @property {function(): jStat} loggam
//  * @property {function(): jStat} gammafn
//  * @property {function(): jStat} gammap
//  * @property {function(): jStat} lowRegGamma
//  * @property {function(): jStat} factorialln
//  * @property {function(): jStat} factorial
//  * @property {function(): jStat} combination
//  * @property {function(): jStat} combinationln
//  * @property {function(): jStat} permutation
//  * @property {function(): jStat} betafn
//  * @property {function(): jStat} betaln
//  * @property {function(): jStat} betacf
//  * @property {function(): jStat} gammapinv
//  * @property {function(): jStat} erf
//  * @property {function(): jStat} erfc
//  * @property {function(): jStat} erfcinv
//  * @property {function(): jStat} ibetainv
//  * @property {function(): jStat} ibeta
//  * @property {function(): jStat} randn
//  * @property {function(): jStat} randg
//  * @property {function(): jStat} beta
//  * @property {function(): jStat} centralF
//  * @property {function(): jStat} cauchy
//  * @property {function(): jStat} chisquare
//  * @property {function(): jStat} exponential
//  * @property {function(): jStat} gamma
//  * @property {function(): jStat} invgamma
//  * @property {function(): jStat} kumaraswamy
//  * @property {function(): jStat} laplace
//  * @property {function(): jStat} lognormal
//  * @property {function(): jStat} noncentralt
//  * @property {function(): jStat} normal
//  * @property {function(): jStat} pareto
//  * @property {function(): jStat} studentt
//  * @property {function(): jStat} weibull
//  * @property {function(): jStat} uniform
//  * @property {function(): jStat} binomial
//  * @property {function(): jStat} negbin
//  * @property {function(): jStat} hypgeom
//  * @property {function(): jStat} poisson
//  * @property {function(): jStat} triangular
//  * @property {function(): jStat} tukey
//  * @property {function(): jStat} arcsine
//  * @property {function(): jStat} add
//  * @property {function(): jStat} subtract
//  * @property {function(): jStat} divide
//  * @property {function(): jStat} multiply
//  * @property {function(): jStat} outer
//  * @property {function(): jStat} dot
//  * @property {function(): jStat} pow
//  * @property {function(): jStat} exp
//  * @property {function(): jStat} log
//  * @property {function(): jStat} abs
//  * @property {function(): jStat} norm
//  * @property {function(): jStat} angle
//  * @property {function(): jStat} aug
//  * @property {function(): jStat} inv
//  * @property {function(): jStat} det
//  * @property {function(): jStat} gauss_elimination
//  * @property {function(): jStat} gauss_jordan
//  * @property {function(): jStat} triaUpSolve
//  * @property {function(): jStat} triaLowSolve
//  * @property {function(): jStat} lu
//  * @property {function(): jStat} cholesky
//  * @property {function(): jStat} gauss_jacobi
//  * @property {function(): jStat} gauss_seidel
//  * @property {function(): jStat} SOR
//  * @property {function(): jStat} householder
//  * @property {function(): jStat} QR
//  * @property {function(): jStat} lstsq
//  * @property {function(): jStat} jacobi
//  * @property {function(): jStat} rungekutta
//  * @property {function(): jStat} romberg
//  * @property {function(): jStat} richardson
//  * @property {function(): jStat} simpson
//  * @property {function(): jStat} hermite
//  * @property {function(): jStat} lagrange
//  * @property {function(): jStat} cubic_spline
//  * @property {function(): jStat} gauss_quadrature
//  * @property {function(): jStat} PCA
//  * @property {function(): jStat} zscore
//  * @property {function(): jStat} ztest
//  * @property {function(): jStat} tscore
//  * @property {function(): jStat} ttest
//  * @property {function(): jStat} anovafscore
//  * @property {function(): jStat} anovaftest
//  * @property {function(): jStat} ftest
//  * @property {function(): jStat} qscore
//  * @property {function(): jStat} qtest
//  * @property {function(): jStat} tukeyhsd
//  * @property {function(): jStat} normalci
//  * @property {function(): jStat} tci
//  * @property {function(): jStat} significant
//  * @property {function(): jStat} models
//  * @property {function(): jStat} buildxmatrix
//  * @property {function(): jStat} builddxmatrix
//  * @property {function(): jStat} buildjxmatrix
//  * @property {function(): jStat} buildymatrix
//  * @property {function(): jStat} buildjymatrix
//  * @property {function(): jStat} matrixmult
//  * @property {function(): jStat} regress
//  * @property {function(): jStat} regresst
//  * @property {function(): jStat} xtranspx
//  * @property {function(): jStat} xtranspxinv
//  * @property {function(): jStat} jMatYBar
//  * @property {function(): jStat} residuals
//  * @property {function(): jStat} ssr
//  * @property {function(): jStat} sse
//  * @property {function(): jStat} sst
//  * @property {function(): jStat} matrixsubtract
//  * @property {function(): jStat} jStat
//  */

// /**
//  * @constant
//  * @type {function(): jStat }
//  */
// const jStat = window.jStat;
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
  $rootScope.maxSelection = 3;
  $rootScope.fields = [];
  $rootScope.test = "chisquare";
  $http.get("./data/tmdb_movies.json").then(
    function (jsonData) {
      const { data } = jsonData;
      const movieMap = extractData(data);
      $scope.avgMap = getAvgData(toArrMap(movieMap));
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
     * @type {{movieMap: Map<string, number[][]>, avgMap: Map<string, number[][]>} | undefined}
     */
    const data = await $http.get("./data/tmdb_movies.json").then(
      function (jsonData) {
        const { data } = jsonData;
        const movieMap = extractData(data);
        const avgMap = getAvgData(toArrMap(movieMap));

        return { movieMap: toArrMap(movieMap), avgMap };
      },
      function (err) {
        console.log(err);
        return;
      }
    );
    const a = {
      hello: function () {},
    };
    // console.log(data?.movieMap);
    $rootScope.onCompare = function (evt) {
      const { selected, test, fields } = $rootScope;
      selected.forEach((sel) => {
        const movie = data?.movieMap.get(sel);
        console.log(jStat(movie).variance());
        console.log(jStat(movie).mean());
      });
    };
  }
);
