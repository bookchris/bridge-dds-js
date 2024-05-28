INCL_SOURCE=dds/src/Makefiles/sources.txt
include $(INCL_SOURCE)

CC_FLAGS= -D__WASM__ -O3
SRC= $(SOURCE_FILES:%=dds/src/%)

build:
	emcc $(CC_FLAGS) $(SRC) -o lib/out.js -s EXPORTED_FUNCTIONS=_malloc,_free,_SetMaxThreads,_SolveBoardPBN -s "EXTRA_EXPORTED_RUNTIME_METHODS=['cwrap','ccall','getValue','setValue', 'stringToUTF8']" -s MODULARIZE -s EXPORT_ES6=1 -s SINGLE_FILE=1 -s NO_EXIT_RUNTIME=1