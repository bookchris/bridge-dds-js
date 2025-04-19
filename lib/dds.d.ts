/// <reference types="emscripten" />
export interface DdsModule extends EmscriptenModule {
  ccall: typeof ccall;
  cwrap: typeof cwrap;
  getValue: typeof getValue;
  setValue: typeof setValue;
  stringToUTF8: typeof stringToUTF8;
}

declare const createModule: EmscriptenModuleFactory<DdsModule>;
export default createModule;
