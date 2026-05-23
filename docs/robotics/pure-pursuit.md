---
title: Pure Pursuit 路径跟踪
---

# Pure Pursuit 路径跟踪

Pure Pursuit 是移动机器人路径跟踪中的常见算法。本页用于整理算法概念、参数选择和在 VEX 项目中的调试经验。

## 核心问题

- 如何选择 lookahead distance。
- 如何把路径点转换为机器人可执行的转向和速度命令。
- 如何处理终点收敛、急弯和定位噪声。

## 待补充

- TODO: 补充 Pushback 项目中的路径样例。
- TODO: 补充参数调试记录和失败案例。
- TODO: 补充代码结构说明。
