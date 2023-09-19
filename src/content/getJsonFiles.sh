#!/bin/bash
# Script used by GitHub Actions to generate the Next Level Learning pages based on the source json files

# Directory to scan
dir="src/content/json"
# Output file
output="nllDataFiles.json"

# Start of json
echo "[" > $output

# Get list of files
files=$(ls -p "$dir" | grep -v /)

# Convert to json
for file in $files
do
# Read data from file
    # data=$(cat "$dir/$file" |  awk '{printf "%s\\n", $0}')
    data=$(cat "$dir/$file"  )

    # Remove .json extension from file name
    filename=${file%.json}
    # echo " { \"file\": \"$filename\", \"path\": \"$dir/$file\", \"data\": $data},"
    echo " { \"file\": \"$filename\", \"path\": \"$dir/$file\", \"data\": $data}," >> $output
done



# Remove trailing comma
sed -i '$ s/,$//' $output

# End of json
echo "]" >> $output