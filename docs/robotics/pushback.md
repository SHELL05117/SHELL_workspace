---
title: Pushback Project
---

# Pushback Project

Pushback 是当前 Workspace 中第一批纳入归档的机器人项目资料。

本页先作为项目索引使用，后续可以继续拆成硬件、自动路径、调试日志、比赛复盘几个页面。

## Source Snapshot

源码资料保存在仓库的 `pushback/` 目录：

```text
pushback/
└── OA_0227/
    └── OA_0220/
        └── src/
            ├── main.cpp
            ├── autons.cpp
            ├── skill_data.txt
            └── ToDoList.md
```

## 当前可整理内容

- EZ-Template / PROS 风格机器人项目代码。
- Chassis、IMU、tracking wheel、intake、pneumatic valve 等配置。
- Skill 自动路径分段。
- Distance sensor / laser examination 校准逻辑。
- Auton selector 与 controller debug 输出。
- 运行日志分析和 P0/P1/P2 问题清单。

## 后续整理建议

- 把 `main.cpp` 中的硬件端口配置整理为表格。
- 把 `autons.cpp` 的 `skill()` 拆为 PART0 ~ PART9 流程图。
- 把运行日志分析中的 critical issue 形成调参记录。
- 为每一次实车测试保留日期、场地、代码版本和结果。

TODO: SHELL 补充 Pushback 项目的真实背景、赛季、机器人照片和最终复盘。
