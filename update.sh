#/!bin/sh
cd vFeed
python vfeedcli.py -u
echo "data feed updated at" $(date) >> update.log
