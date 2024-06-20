#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Navigate to the frontend directory and install dependencies
cd frontend/
npm install

# run frontend tests here if and when made

# Build the frontend
npm run build

# Navigate to the API directory and activate the virtual environment
cd ../api

# Check if .venv directory exists, if not, create a new virtual environment
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi

# Activate the virtual environment
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run the backend tests
python -m unittest discover -s tests

# Now try to package the build
cd ..
SOURCE_DIR="api"
ZIP_FILE="russian-word-profiler.zip"

zip -r "$ZIP_FILE" "$SOURCE_DIR" -x "*$SOURCE_DIR/.venv/*" -x "*$SOURCE_DIR/sphinx-docs/*" -x "*$SOURCE_DIR/tests/*" -x "*$SOURCE_DIR/README.md" -x "*$SOURCE_DIR/word_data_cache.pickle*" -x "*$SOURCE_DIR/__pycache__/*"