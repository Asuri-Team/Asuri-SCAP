# Asuri-SCAP
Search expolit with SCAP

Asuri-SCAP只是一个简单的查询见面，用来检索SCAP库中的CVE漏洞信息
数据来源于已经公开的漏洞数据整理
来源如下：
vFeed:https://github.com/toolswatch/vFeed

	git clone https://github.com/Asuri-Team/Asuri-SCAP.git
	cd Asuri-SCAP
	git clone https://github.com/toolswatch/vFeed.git

SCAP使用的是vFeed整理好的数据源，没有进行单独的开发，使用vFeed的功能来进行数据更新。

更新数据:

	cd /path/to/Asuri-SCAP/
	./update.sh

Linux上可以使用conntab来制定任务的定时执行。但是我没有配置成功，求指导。
vFeed中包含的内容很丰富，整理的工作量是非常大的，所以，如果长时间不更新，或者里面找不到最新的CVE漏洞，也不要觉得奇怪。

##注意
config.py,update.sh中的路径需要自行配置


