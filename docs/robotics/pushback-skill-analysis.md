---
title: Pushback Skill Run Analysis
---

# Pushback Skill Run Analysis

本页整理 `pushback/OA_0227/OA_0220/src/skill_data.txt` 和 `ToDoList.md` 中的运行分析，用于后续调参和复盘。

## Summary

本次日志覆盖 PART1 ~ PART7 的 step 1 ~ 27。整体表现较好的部分集中在 PART1 ~ PART5 和 PART7，主要风险集中在 PART6 的 longgoal / loader 动作。

## Critical Issues

| Step | Segment | Problem | Observed Error | Priority |
| --- | --- | --- | --- | --- |
| 19 | PART6 longgoal | `chassis_straight(-17~-18)` 后退触发 Velocity Exit | about 5.09 in | P0 |
| 20 | PART6 loader | 前进到 loader 时再次触发 Velocity Exit | about 1.07 in | P0 |

### Step 19

现象：机器人后退时疑似撞到墙或 longgoal 结构，速度降为 0，PID 提前退出，导致实际后退距离不足。

可尝试方案：

- 把后退距离减小到约 `-13 in` ~ `-14 in`，避免硬撞。
- 直接使用 `drive_set(-30, -30) + delay` 做顶墙动作。
- 增大 `pid_odom_drive_exit_condition_set` 的 velocity exit 超时。

### Step 20

现象：前进到 loader 时触发 Velocity Exit，误差约 1 in。后续仍有 `drive_set(35, 35)` 顶墙动作，因此对装球结果可能影响较小，但会浪费 PID 等待时间。

可尝试方案：

- 把目标距离从约 `24 in` / `25 in` 调整到 `22 in` 左右。
- 用 `drive_set` 顶墙替代 `pid_odom_set`。

## Warnings

| Step | Problem | Notes |
| --- | --- | --- |
| 2 | 初始 odom 前进触发 failsafe | 后续有 laser 校准，影响较小 |
| 9 | Loader 区域转向误差约 2.7 deg | 检查物理干扰或微调 turn PID |
| 17 | laser 校准后直线误差约 0.71 in | 当前可接受，继续观察 |
| 26 | PART7 loader 前进误差约 0.64 in | 后续有顶墙补偿 |

## Next Actions

- P0: 修复 PART6 后退撞墙导致的 Velocity Exit。
- P0: 修复 PART6 loader 前进目标过深的问题。
- P1: 调查 PART4 turn to 0 deg 的转向误差来源。
- P2: 确认 PART7 step 27 之后的日志是否完整。
- P2: 继续优化 `log_turn` 的角度显示可读性。

TODO: SHELL 补充下一轮实车测试结果，并记录采用了哪一种修复方案。
