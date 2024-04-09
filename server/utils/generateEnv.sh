#!/bin/bash

if [ ! -f "./utils/env.ts" ]; then
    echo "export default \"\";" > "./utils/env.ts"
fi
