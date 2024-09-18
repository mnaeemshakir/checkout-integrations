#!/bin/bash
#chmod +x ./deployment-prod.sh 
yarn build
aws s3 sync ./build-1.0.0 s3://checkout.mindshine.app --profile mindshine
aws cloudfront create-invalidation --distribution-id E365W02U08VG7G --paths "/*" --profile mindshine