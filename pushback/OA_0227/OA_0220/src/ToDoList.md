# Skill 运行数据分析 (2026-02-25 05:48)

数据来源: `skill_data.txt`，覆盖 PART1 ~ PART7 (步骤1~27)，PART7 在 step27 后日志截断。

---

## 各步骤误差总览

| Step | 标签 | 类型 | 目标 | 实际 | 误差 | 退出方式 | 严重度 |
|------|------|------|------|------|------|----------|--------|
| 1 | swing→90 | 转向 | 90° | 90.5° | 0.5° | Small Exit | OK |
| 2 | odom→(32,-3) | 坐标 | (32,-3) | (31.6,-2.9) | 0.40in | **Wait Until Failsafe** | WARN |
| 3 | straight(laser) | 坐标 | (39.5,-2.1) | (39.1,-2.1) | 0.33in | Small Exit | OK |
| 4 | turn→225 | 转向 | 225° | 226.8° | 1.8° | Small Exit | WARN |
| 5 | straight(eat) | 坐标 | (21.2,-5.4) | (21.8,-5.4) | 0.59in | Small Exit | WARN |
| 6 | turn→45 | 转向 | 45° | 406.6° | 1.6° | Small Exit | OK |
| 7 | odom→MH | 坐标 | (1.0,-25.8) | (0.9,-25.9) | 0.11in | Wait Until Exit | OK |
| 8 | odom→loader | 坐标 | (33.0,9.4) | (33.2,9.8) | 0.44in | Wait Until Exit | OK |
| 9 | turn→0 | 转向 | 0° | 362.7° | **2.7°** | Small Exit | WARN |
| 10 | odom→load | 坐标 | (36.5,10.0) | (36.5,10.1) | 0.07in | Wait Until Exit | OK |
| 11 | swing→300 | 转向 | 300° | 299.8° | 0.2° | Wait Until Exit | OK |
| 12 | swing→0 | 转向 | 0° | 360.0° | 0.0° | Wait Until Exit | OK |
| 13 | turn→0 | 转向 | 0° | 361.7° | 1.7° | Small Exit | OK |
| 14 | odom→south | 坐标 | (47.9,-34) | (47.9,-34.2) | 0.17in | Wait Until Exit | OK |
| 15 | swing→60 | 转向 | 60° | 420.4° | 0.4° | Wait Until Exit | OK |
| 16 | turn→90 | 转向 | 90° | 448.1° | 1.9° | Small Exit | OK |
| 17 | straight(laser) | 坐标 | (29.9,-76) | (30.6,-76.1) | 0.71in | Small Exit | WARN |
| 18 | turn→180 | 转向 | 180° | 542.2° | 2.2° | Small Exit | WARN |
| **19** | **straight P6** | **坐标** | **(30.4,-58.6)** | **(30.4,-63.7)** | **5.09in** | **Velocity Exit** | **CRITICAL** |
| **20** | **odom→P6load** | **坐标** | **(0,24)** | **(0,22.9)** | **1.07in** | **Velocity Exit** | **CRITICAL** |
| 21 | odom→P6back | 坐标 | (0,0) | (-0.1,-0.4) | 0.40in | Wait Until Exit | OK |
| 22 | swing→90P7 | 转向 | 90° | 90.1° | 0.1° | Wait Until Exit | OK |
| 23 | odom→(80,18) | 坐标 | (80,18) | (80.3,18) | 0.27in | Wait Until Exit | OK |
| 24 | straight(laser) | 坐标 | (82.6,18.3) | (82.4,18.2) | 0.19in | Small Exit | OK |
| 25 | turn→0P7 | 转向 | 0° | 1.6° | 1.6° | Small Exit | OK |
| 26 | odom→P7load | 坐标 | (83.5,24) | (83.5,23.4) | 0.64in | Small Exit | WARN |
| 27 | swing→300P7 | 转向 | 300° | -59.8° | 0.2° | Wait Until Exit | OK |

---

## CRITICAL 严重问题

### 问题1: [Step 19] PART6 chassis_straight(-17) Velocity Exit — 误差 5.09in
- **代码位置**: `chassis_straight(-17.0, 90.0, 2000)` (PART6 longgoal)
- **现象**: 机器人后退时触发 **Velocity Exit**（速度降为0但未到达目标），实际只后退了约12in而非17in
- **根因推测**: 机器人撞到墙壁/longgoal结构导致电机堵转，PID检测到速度为0提前退出
- **影响**: 后退不够深，longgoal投球位置不正确
- **修复方案**:
  - [ ] 方案A: 减小后退距离到 -13in ~ -14in，避免硬撞
  - [ ] 方案B: 去掉 chassis_straight，直接用 `drive_set(-30,-30) + delay` 顶墙（当前代码紧接着就有这段）
  - [ ] 方案C: 增大 `pid_odom_drive_exit_condition_set` 的 velocity exit 超时（当前500ms太短）

### 问题2: [Step 20] PART6 odom→P6load Velocity Exit — 误差 1.07in
- **代码位置**: `pid_odom_set({{0_in, 24_in}, fwd, 80})` (PART6 loader前进)
- **现象**: 前进到loader时再次触发 **Velocity Exit**，差1.07in
- **根因推测**: 撞到loader墙壁，速度降为0
- **影响**: 后面有 `drive_set(40,40)` 继续顶墙1.8s，实际装球不受影响，但浪费PID等待时间
- **修复方案**:
  - [ ] 减小目标距离到约 22in，避免硬撞触发 velocity exit
  - [ ] 或直接用 `drive_set` 顶墙代替 `pid_odom_set`

---

## WARN 中等问题

### 问题3: [Step 2] odom→(32,-3) Wait Until Exit Failsafe — 0.40in
- PART2 初始前进到蓝球位置时触发 failsafe，差 0.40in
- 后面有 laser_examination 校准补偿，实际影响不大
- **建议**: 可暂时忽略

### 问题4: [Step 9] turn→0 误差 2.7° — PART4 最大转向误差
- Loader区域转向0°时误差全场最大
- **建议**: 检查该处是否有物理干扰（loader盖子碰到底盘），或微调 pid_turn_constants

### 问题5: [Step 17] PART5→6 laser校准直线误差 0.71in
- laser_examination(true, 400, 2000) 校准后直线偏差较大
- 激光实际读数 378mm vs 目标 400mm，差 22mm
- **建议**: 可接受范围，暂不处理

### 问题6: [Step 26] odom→P7load 误差 0.64in
- PART7 loader前进略偏，差 0.64in
- 后面有 `drive_set(30,30)` 顶墙补偿
- **建议**: 暂可接受

---

## OK 运行良好的部分
- **PART1~3 (Step 1~7)**: 整体精度很好，中桥到达误差仅 0.11in
- **PART4 Loader (Step 8~10)**: 精度优秀 (0.07in)
- **PART5 出弯 (Step 11~16)**: 所有 swing/turn 误差 <2°，odom 误差 <0.2in
- **PART7 转移 (Step 22~27)**: 整体表现良好

---

## 待办事项优先级

- [ ] **P0**: 修复 Step19 — PART6 chassis_straight(-17) 后退撞墙 velocity exit
- [ ] **P0**: 修复 Step20 — PART6 odom→P6load 前进撞墙 velocity exit
- [ ] **P1**: 调查 Step9 — PART4 turn→0 的 2.7° 偏差原因
- [ ] **P2**: 日志截断 — PART7 step27之后数据丢失，下次运行需确认 PART7~PART8 完整日志
- [ ] **P2**: log_turn 显示优化 — actual角度显示累积值（如542.2°）而非归一化值，可读性差
