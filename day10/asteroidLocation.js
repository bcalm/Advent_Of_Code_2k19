const fs = require('fs');
const {Grid} = require('./grid');

const getBestMonitoringLocation = function (grid, asteroids) {
  const location = {
    asteroidsCounts: -1,
    asteroidsLocation: null,
  };
  for (let i = 0; i < asteroids.length; i++) {
    const asteroidsCounts = grid.getAsteroidCount(asteroids[i].position);

    if (asteroidsCounts > location.asteroidsCounts) {
      location.asteroidsCounts = asteroidsCounts;
      location.asteroidsLocation = asteroids[i].position;
    }
  }
  return location;
};
const main = function () {
  const input = fs.readFileSync('./asteroidPosition.json', 'utf8');
  // //   const input = `#.#.##..#.###...##.#....##....###
  // // ...#..#.#.##.....#..##.#...###..#
  // // ####...#..#.##...#.##..####..#.#.
  // // ..#.#..#...#..####.##....#..####.
  // // ....##...#.##...#.#.#...#.#..##..
  // // .#....#.##.#.##......#..#..#..#..
  // // .#.......#.....#.....#...###.....
  // // #.#.#.##..#.#...###.#.###....#..#
  // // #.#..........##..###.......#...##
  // // #.#.........##...##.#.##..####..#
  // // ###.#..#####...#..#.#...#..#.#...
  // // .##.#.##.........####.#.#...##...
  // // ..##...#..###.....#.#...#.#..#.##
  // // .#...#.....#....##...##...###...#
  // // ###...#..#....#............#.....
  // // .#####.#......#.......#.#.##..#.#
  // // #.#......#.#.#.#.......##..##..##
  // // .#.##...##..#..##...##...##.....#
  // // #.#...#.#.#.#.#..#...#...##...#.#
  // // ##.#..#....#..##.#.#....#.##...##
  // // ...###.#.#.......#.#..#..#...#.##
  // // .....##......#.....#..###.....##.
  // // ........##..#.#........##.......#
  // // #.##.##...##..###.#....#....###.#
  // // ..##.##....##.#..#.##..#.....#...
  // // .#.#....##..###.#...##.#.#.#..#..
  // // ..#..##.##.#.##....#...#.........
  // // #...#.#.#....#.......#.#...#..#.#
  // // ...###.##.#...#..#...##...##....#
  // // ...#..#.#.#..#####...#.#...####.#
  // // ##.#...#..##..#..###.#..........#
  // // ..........#..##..#..###...#..#...
  // // .#.##...#....##.....#.#...##...##`;

  const grid = new Grid(input);

  const asteroids = grid.getAllAsteroid();
  const bestMonitoringLocation = getBestMonitoringLocation(grid, asteroids);
  console.log(bestMonitoringLocation);
};

main();
