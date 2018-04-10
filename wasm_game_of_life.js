
            /* tslint:disable */
            import * as wasm from './wasm_game_of_life_bg';
            

            
                const TextDecoder = typeof window === 'object' && window.TextDecoder
                    ? window.TextDecoder
                    : require('util').TextDecoder;
            
            let cachedDecoder = null;
            function textDecoder() {
                if (cachedDecoder)
                    return cachedDecoder;
                cachedDecoder = new TextDecoder('utf-8');
                return cachedDecoder;
            }
        
            let cachedUint8Memory = null;
            function getUint8Memory() {
                if (cachedUint8Memory === null ||
                    cachedUint8Memory.buffer !== wasm.memory.buffer)
                    cachedUint8Memory = new Uint8Array(wasm.memory.buffer);
                return cachedUint8Memory;
            }
        
            function getStringFromWasm(ptr, len) {
                const mem = getUint8Memory();
                const slice = mem.slice(ptr, ptr + len);
                const ret = textDecoder().decode(slice);
                return ret;
            }
        
            let cachedUint32Memory = null;
            function getUint32Memory() {
                if (cachedUint32Memory === null ||
                    cachedUint32Memory.buffer !== wasm.memory.buffer)
                    cachedUint32Memory = new Uint32Array(wasm.memory.buffer);
                return cachedUint32Memory;
            }
        
            let cachedGlobalArgumentPtr = null;
            let GLOBAL_ARGUMENT_CNT = 0;
            function globalArgumentPtr() {
                if (cachedGlobalArgumentPtr === null)
                    cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
                return cachedGlobalArgumentPtr;
            }
        
            function getGlobalArgument(arg) {{
                const idx = globalArgumentPtr() / 4 + arg;
                return getUint32Memory()[idx];
            }}
        
                        const __wbg_f_time_time_n_target = console.time;
                    export function __wbg_f_time_time_n(arg0) {
let next_global = 0;

                                let len0 = getGlobalArgument(next_global++);
                                let v0 = getStringFromWasm(arg0, len0);
                            __wbg_f_time_time_n_target(v0)
}

                        const __wbg_f_timeEnd_timeEnd_n_target = console.timeEnd;
                    export function __wbg_f_timeEnd_timeEnd_n(arg0) {
let next_global = 0;

                                let len0 = getGlobalArgument(next_global++);
                                let v0 = getStringFromWasm(arg0, len0);
                            __wbg_f_timeEnd_timeEnd_n_target(v0)
}
export class Universe {
                    constructor(ptr) {
                        this.ptr = ptr;
                    }
                
                free() {
                    const ptr = this.ptr;
                    this.ptr = 0;
                    wasm.__wbg_universe_free(ptr);
                }
            static new() {
        const ret = wasm.universe_new();
                return new Universe(ret);
                            
            }
 width() {
        const ret = wasm.universe_width(this.ptr);
                return ret;
            }
 height() {
        const ret = wasm.universe_height(this.ptr);
                return ret;
            }
 cells() {
        const ret = wasm.universe_cells(this.ptr);
                return ret;
            }
 tick() {
        const ret = wasm.universe_tick(this.ptr);
                return ret;
            }
 toggle_cell(arg0, arg1) {
        const ret = wasm.universe_toggle_cell(this.ptr, arg0, arg1);
                return ret;
            }
}
let slab = [];
            let slab_next = 0;
        
            function addHeapObject(obj) {
                if (slab_next === slab.length)
                    slab.push(slab.length + 1);
                const idx = slab_next;
                const next = slab[idx];
                
                slab_next = next;
            
                slab[idx] = { obj, cnt: 1 };
                return idx << 1;
            }
        
            let stack = [];
        
            function getObject(idx) {
                if ((idx & 1) === 1) {
                    return stack[idx >> 1];
                } else {
                    const val = slab[idx >> 1];
                    
                return val.obj;
            
                }
            }
        export function __wbindgen_object_clone_ref (idx) {
                        // If this object is on the stack promote it to the heap.
                        if ((idx & 1) === 1)
                            return addHeapObject(getObject(idx));

                        // Otherwise if the object is on the heap just bump the
                        // refcount and move on
                        const val = slab[idx >> 1];
                        val.cnt += 1;
                        return idx;
                    }

            function dropRef(idx) {
                

                let obj = slab[idx >> 1];
                
                obj.cnt -= 1;
                if (obj.cnt > 0)
                    return;
            

                // If we hit 0 then free up our space in the slab
                slab[idx >> 1] = slab_next;
                slab_next = idx >> 1;
            }
        export function __wbindgen_object_drop_ref (i) { dropRef(i); }
export function __wbindgen_string_new (p, l) {
                    return addHeapObject(getStringFromWasm(p, l));
                }
export function __wbindgen_number_new (i) { return addHeapObject(i); }
export function __wbindgen_number_get (n, invalid) {
                        let obj = getObject(n);
                        if (typeof(obj) === 'number')
                            return obj;
                        getUint8Memory()[invalid] = 1;
                        return 0;
                    }
export function __wbindgen_undefined_new () { return addHeapObject(undefined); }
export function __wbindgen_null_new () {
                    return addHeapObject(null);
                }
export function __wbindgen_is_null (idx) {
                    return getObject(idx) === null ? 1 : 0;
                }
export function __wbindgen_is_undefined (idx) {
                    return getObject(idx) === undefined ? 1 : 0;
                }
export function __wbindgen_boolean_new (v) {
                    return addHeapObject(v === 1);
                }
export function __wbindgen_boolean_get (i) {
                    let v = getObject(i);
                    if (typeof(v) === 'boolean') {
                        return v ? 1 : 0;
                    } else {
                        return 2;
                    }
                }
export function __wbindgen_symbol_new (ptr, len) {
                    let a;
                    console.log(ptr, len);
                    if (ptr === 0) {
                        a = Symbol();
                    } else {
                        a = Symbol(getStringFromWasm(ptr, len));
                    }
                    return addHeapObject(a);
                }
export function __wbindgen_is_symbol (i) {
                    return typeof(getObject(i)) === 'symbol' ? 1 : 0;
                }
export function __wbindgen_throw (ptr, len) {
                        throw new Error(getStringFromWasm(ptr, len));
                    }

                const TextEncoder = typeof window === 'object' && window.TextEncoder
                    ? window.TextEncoder
                    : require('util').TextEncoder;
            
            let cachedEncoder = null;
            function textEncoder() {
                if (cachedEncoder)
                    return cachedEncoder;
                cachedEncoder = new TextEncoder('utf-8');
                return cachedEncoder;
            }
        
            function pushGlobalArgument(arg) {{
                const idx = globalArgumentPtr() / 4 + GLOBAL_ARGUMENT_CNT;
                getUint32Memory()[idx] = arg;
                GLOBAL_ARGUMENT_CNT += 1;
            }}
        
            function passStringToWasm(arg) {
                if (typeof(arg) !== 'string')
                    throw new Error('expected a string argument');
                const buf = textEncoder().encode(arg);
                const len = buf.length;
                const ptr = wasm.__wbindgen_malloc(len);
                getUint8Memory().set(buf, ptr);
                return [ptr, len];
            }
        export function __wbindgen_string_get (i, len_ptr) {
                    let obj = getObject(i);
                    if (typeof(obj) !== 'string')
                        return 0;
                    const [ptr, len] = passStringToWasm(obj);
                    getUint32Memory()[len_ptr / 4] = len;
                    return ptr;
                }

            
        