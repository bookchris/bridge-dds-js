# SOURCE=dds/src/dds.cpp dds/src/ABsearch.cpp dds/src/ABstats.cpp dds/src/CalcTables.cpp dds/src/DealerPar.cpp dds/src/Init.cpp dds/src/LaterTricks.cpp dds/src/Moves.cpp dds/src/Par.cpp dds/src/PlayAnalyser.cpp dds/src/PBN.cpp dds/src/QuickTricks.cpp dds/src/Scheduler.cpp dds/src/SolveBoard.cpp dds/src/SolverIF.cpp dds/src/Timer.cpp

INCL_SOURCE=dds/src/Makefiles/sources.txt
include $(INCL_SOURCE)

CC_FLAGS= -D__WASM__
SRC= $(SOURCE_FILES:%=dds/src/%)

build:
	emcc $(CC_FLAGS) $(SRC) -o out.js -s EXPORTED_FUNCTIONS=_malloc,_free,_SetMaxThreads,_SolveBoardPBN -s "EXTRA_EXPORTED_RUNTIME_METHODS=['cwrap','ccall','getValue','setValue', 'stringToUTF8']" -s MODULARIZE -s NO_EXIT_RUNTIME=1