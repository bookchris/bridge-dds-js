# bridge-dds-js

Duplicate bridge double dummy APIs in Javascript

This library provides a Javascript/Typescript wrapper around the C++ [double dummy solver](https://github.com/dds-bridge/dds) library.

The underlying library is compiled to webassembly, and a thin API layer is added to provide a Javascript-friendly interface. The intention is for the wrapping APIs to be very thin, and as close to the C++ APIs as possible.

## Installation

Install the library using npm:
`npm install @bridge-dds`

## Usage

The basic use involes initialzing the library and invoking APIs.

The following APIs are currently supported, but ping me if you are looking for others and I can add them:

- AnalysePlayPBN
- CalcDDTablePBN
- DealerPar
- SolveBoardPBN

```
import DdsLoader, { Dds, DealPbn, FutureTricks, loadDds } from "bridge-dds";

const module = await loadDds();
const dds = new Dds(module);
const result = dds.SolveBoardPBN({ ... });
```

## Webworker + React Example

Because the library provides a blocking API, it will usually be desired to run the calls on a background webworker. The [react example](/examples/react) shows how the API can be invoked in the background using a webworker.

## Development

To build this module, the underlying dds library is included as a git submodule. A [PR has been opened](https://github.com/dds-bridge/dds/pull/118) against the dds library to add a web assembly build. It has not been accepted, but this is the branch we are pulling into this repository.

Once the submodules are cloned, you can run `make` to build the webassembly and javascript wrapper.
