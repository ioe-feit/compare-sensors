#!/bin/bash

# npm run build
(cd .. && git subtree push --prefix frontend/build origin gh-pages)