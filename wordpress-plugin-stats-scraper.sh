#!/bin/bash

slug=$1

if [[ -z "$slug" ]]; then
	echo "USAGE: $0 <plugin_slug>";
	exit -1;
fi

url="https://wordpress.org/plugins/${slug}/advanced/";

html=$(wget $url -q -O - | hxnormalize -x);


date=$(date +%G-%m-%d);
version=$(echo $html | hxselect -c ".widget.plugin-meta li:nth-child(1) strong");
installs_active=$(echo $html | hxselect -c ".widget.plugin-meta li:nth-child(3) strong");
downloads_yesterday='';
downloads_total='';
issues_month=$(echo $html | hxselect -c ".widget.plugin-support .counter-count");
issues_month_total=$(echo $issues_month | cut -f1 -d" ");
issues_month_resolved=$(echo $issues_month | cut -f4 -d" ");

echo "\"${date}\",\"${version}\",\"${installs_active}\",${downloads_yesterday},${downloads_total},${issues_month_total},${issues_month_resolved}";
