#!/bin/bash
cd frontend/russian-word-profiler/
npm run build
cp build/index.html ../../api/templates/
cp -R build/static/ ../../api/
