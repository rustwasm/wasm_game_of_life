# Conway's Game of Life in Rust and WebAssembly

This repository contains the complete code for the Rust and WebAssembly
tutorial. The tutorial builds increasingly featureful implementations of
[Conway's Game of Life][game-of-life].

**[Read the tutorial here.][tutorial]**

[game-of-life]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
[tutorial]: TODO

## Repository Structure

This repository has an unusual structure. Each chapter of the tutorial builds
upon the last chapter's Game of Life implementation, and extends it. Each
chapter's implementation is available in a branch of this repository. This
enables us to commit fixes and updates to early chapters, and then cascade them
through each later chapter via `git merge`, rather than manually applying the
same change to every branch.

These branches are *also* available as `git` submodules within this `master`
branch. The submodules enable browsing all versions at once, and running tests
for the latest commits on every branch in Travis CI all at once.

Chapter branches/submodules:

* `chapter-zero`: An initial template for this project that contains a Rust and
  WebAssembly "hello world" ready to go.

* `chapter-one`: A working, if minimal, implementation of Conway's Game of Life.

  * `chapter-one-with-bug`: The same as `chapter-one`, but with a Real World bug I
    wrote. Debugging this is intended as an exercise for readers.

* `chapter-two`: Added ability to pause and resume the game, as well as toggle
  individual cells by clicking on them.

* `chapter-three`: Speed ups to rendering and computing the next generation of
  cells.

## Sending Pull Requests

1. Checkout the branch for the first chapter that needs to be updated. Apply
   your changes and commit them.

2. Checkout the branch for the next chapter. Do a `git merge $PREVIOUS_CHAPTER`.

3. Repeat step 2 until there is no next chapter.

4. Checkout the `master` branch. Run `git submodule foreach git pull --ff` to
   point the submodules to the latest commit on each branch. Commit this update.

5. Send a pull request for each chapter branch that was modified, and for
   `master`.

Thanks!
