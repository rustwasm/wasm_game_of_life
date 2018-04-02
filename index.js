const wasm = import("./wasm_game_of_life");

wasm.then(wasm => {
  wasm.greet("Rust and WebAssembly!");
});
