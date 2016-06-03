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

##关于SCAP
如果你只是想要一个方便进行漏洞信息检索的工具，那你直接下载运行就好了，反正代码也很简单，数据也不是我在整理，谁都可以继续做下去。

SCAP是安全内容自动化协议的简称。
大家熟知的CVE其实只是SCAP的一个部分，SCAP一共由7个自协议组成，分别是：
|名称|全称|中文名|
|----|----|------|
|CVE|Common Vulnerabilities and Exposures|通用漏洞枚举|
|CCE|Common Configuration Enumeration|通用配置枚举|
|CPE|Common Platform Enumeration|通用平台枚举|
|CWE|Common Weakness Enumeration|通用脆弱性枚举|
|CVSS|Common Vulnerability Scoring System|通用漏洞评分系统|
|ECCDF|Extensible Configuration Checklist Description Format|可扩展配置清单描述格式|
|OVAL|Open Vulnerability and Assessment Language|开放式漏洞评估语言|

一个漏洞，关联的平台，以及对应的配置，都可以自动完成检索
或者，一个平台，关联的所有安全配置，以及所有的脆弱性和漏洞，都可以进行检索。

但是呢，这个数据量不是一般的大。
到目前为止，也只是各个平台完成了自己的SCAP，比如，RedHat有自己的scap评估系统。

一般的漏洞扫描器，其实也是基于这个协议，不过，真正做好的并没有。

我也想尝试来着，眼看CVE都要被取代了，就放弃吧




