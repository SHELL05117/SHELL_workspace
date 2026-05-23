# VEX Pushback 机器人控制系统开发

## 项目概述

该项目是基于 **VEX V5** 平台的 Pushback 机器人控制系统开发项目，主要面向竞赛场景中的自动程序执行、手动驾驶控制、传感器校准和现场调试。项目使用 **PROS V5** 作为底层机器人开发框架，结合 **EZ-Template 3.2.2**、**OkapiLib 5.0.0** 与 **LVGL 8.3.8** 搭建控制系统与调试界面。根据项目工程记录，核心依赖版本写入 `project.pros`，其中包括 PROS kernel 4.1.1、EZ-Template 3.2.2、OkapiLib 5.0.0 和 LVGL 8.3.8。

在该项目中，我主要负责机器人软件侧的控制逻辑迁移、底盘参数适配、自动程序开发、传感器辅助校准和调试工具建设。项目并不是从零编写完整底层控制库，而是在 EZ-Template 提供的竞赛机器人控制框架上，针对具体机器人结构进行二次开发和工程集成。

EZ-Template 本身是一个面向 VEX V5 与 PROS 的开源开发模板，官方文档明确支持 drive PID、turn PID、swing turn、arc、odometry、Pure Pursuit、Boomerang、异步 PID、tracking wheel、autonomous selector、joystick curve、live PID tuning 等功能。这个项目的技术路线正是围绕这些能力展开：底层运动控制交给成熟框架，项目开发重点放在机器人硬件适配、自动路线设计、传感器校准和现场可调试性上。([ez-robotics.github.io][1])

---

## 项目角色

我在该项目中的角色更接近 **机器人控制系统集成开发者（Robot Control System Integrator）**，而不是单纯的自动程序编写者。我的工作覆盖了从工程结构理解、硬件接口适配到底盘控制和自动程序调参的多个环节。

主要负责内容包括：

1. **工程结构理解与代码迁移**
   阅读原有 PROS 工程和 EZ-Template 模板结构，识别第三方库代码与团队自写代码的边界。项目中的主要修改集中在 `src/main.cpp`、`src/autons.cpp`、`include/subsystems.hpp` 和 `include/autons.hpp`，其中 `src/main.cpp` 负责比赛生命周期、自动程序选择器和手柄交互，`src/autons.cpp` 负责自动程序、机构控制、激光校准、直线封装和日志函数。

2. **硬件端口与传感器适配**
   根据机器人实际接线重新适配底盘电机、intake 电机、气动阀、IMU、距离传感器、颜色传感器和 tracking wheel。原始日志中记录了早期发现 tracking wheel 未启用、需要补充定位轮几何参数的问题，也记录了通过测试机排查端口映射错误的过程。

3. **底盘控制与自动程序开发**
   使用 EZ-Template 的 `pid_drive_set()`、`pid_turn_set()`、`pid_swing_set()`、`pid_odom_set()` 等接口开发自动程序，并根据不同动作段调节 PID、slew acceleration 和 odometry 参数。

4. **传感器辅助校准与现场调试**
   封装基于距离传感器的 `laser_examination()` 函数，用于机器人靠近场地边界后的低速位置校准；同时通过 `laser_value()`、`log_odom()`、`log_turn()` 和手柄屏幕输出辅助现场判断误差来源。

---

## 技术栈

本项目涉及的主要技术栈如下：

| 类别    | 技术 / 工具                                            | 用途                                              |
| ----- | -------------------------------------------------- | ----------------------------------------------- |
| 机器人平台 | VEX V5                                             | 电机、传感器、主控、遥控器与竞赛系统                              |
| 开发框架  | PROS V5                                            | C++ 机器人程序框架、任务调度、设备 API                         |
| 控制模板  | EZ-Template 3.2.2                                  | 底盘 PID、odometry、auton selector、joystick control |
| 数学控制  | PID Control                                        | 距离控制、角度控制、swing turn、坐标运动                       |
| 定位系统  | Odometry + Tracking Wheels                         | 估计机器人在场地中的 x、y、theta                            |
| 传感器   | IMU、Distance Sensor、Optical Sensor、Rotation Sensor | 姿态、距离、颜色/接近、编码器反馈                               |
| 工程语言  | C++ / GNU++20                                      | 项目主语言                                           |
| 调试工具  | PROS Terminal、V5 Brain Screen、Controller Print     | 现场日志、传感器监控、自动程序选择                               |

---

## 系统架构

该项目的软件结构可以分为五层。

### 1. 硬件抽象层

硬件抽象层主要定义机器人电机、传感器和气动元件。项目中使用 `include/subsystems.hpp` 集中声明 intake、电磁阀、颜色传感器、距离传感器和 rotation sensor 等对象。这样做的意义是把硬件端口集中管理，避免自动程序和手动控制代码中到处散落端口号。

在 VEX 项目里，这一层的正确性很关键。端口错、反向错、传感器方向错，都会导致后续 PID 和 odometry 结果失真。EZ-Template 的安装文档也强调，Drive Constructor 需要输入底盘电机端口、IMU 端口、轮径和轮速 RPM，负号端口表示该电机需要反向，这些参数会影响机器人距离换算和运动方向。([ez-robotics.github.io][2])

### 2. 底盘控制层

底盘控制层由 `ez::Drive chassis(...)` 负责。它把底盘电机、IMU、轮径、RPM 和 tracking wheel 接入 EZ-Template 的控制系统。项目中底盘不仅用于手动驾驶，也用于自动阶段的闭环运动。

根据项目问答文档，底盘构造中包括左右底盘电机端口、IMU 端口、轮径和 RPM；负号端口用于处理电机物理安装方向与程序正方向不一致的问题。tracking wheel 则用于 odometry，项目中使用水平和竖直两个 tracking wheel，并在初始化阶段将其绑定为 back tracker 和 right tracker。

EZ-Template 官方文档中，tracking wheel 构造函数需要端口、轮径、到机器人中心的距离以及齿比参数；其中 `distance_to_center` 会参与定位计算。这个参数如果测错，机器人旋转时会产生虚假的 x/y 位移；轮径如果测错，则会带来距离比例误差。([ez-robotics.github.io][3])

### 3. 比赛生命周期层

比赛生命周期层由 PROS 标准函数构成：

```cpp
initialize()
competition_initialize()
autonomous()
opcontrol()
```

在项目中，`initialize()` 用于底盘、IMU、odometry、自动程序选择器和手柄输出任务的初始化；`competition_initialize()` 用于比赛系统连接后、自动程序开始前的状态预置；`autonomous()` 用于自动阶段入口；`opcontrol()` 用于手动控制循环。项目问答文档中已经整理了这一控制流。

自动阶段开始前，项目会执行一系列 reset，包括清除 PID target、重置 IMU、清除编码器、设置 odometry 原点和切换刹车模式。这些 reset 的目的不是“形式化初始化”，而是避免上一轮测试或上一段动作的状态污染自动程序。对于竞赛机器人来说，这一点很重要：自动程序的最大敌人不是代码语法错误，而是状态残留造成的不可复现行为。

### 4. 自动程序层

自动程序层主要集中在 `src/autons.cpp`。项目的重点自动程序是 `skill()`，其中混合使用了开环控制和闭环控制。

开环控制主要是：

```cpp
chassis.drive_set(...)
pros::delay(...)
```

这种方式执行快，逻辑直接，但不抗干扰，不适合高精度定位段。闭环控制则使用：

```cpp
chassis.pid_drive_set(...)
chassis.pid_turn_set(...)
chassis.pid_swing_set(...)
chassis.pid_odom_set(...)
```

闭环动作可以根据传感器反馈修正误差，更适合角度、坐标和关键位置控制。项目问答中明确记录了 `skill()` 中部分段落使用 `drive_set + delay`，关键定位段则使用 `pid_swing_set`、`pid_turn_set`、`pid_odom_set` 和 `laser_examination`。

### 5. 调试与验证层

调试层包括：

```cpp
laser_value()
log_odom()
log_turn()
controller_print_task
ez_screen_task
```

这些函数的作用是把机器人内部状态暴露出来，包括距离传感器读数、当前 odometry 坐标、目标点、角度误差和当前自动程序名称。对于现场调试来说，这类工具比单纯“看机器人跑没跑到”更可靠，因为它能把问题拆成：传感器问题、定位问题、PID 参数问题、路径设计问题或机械干涉问题。

---

## EZ-Template 接入设计

### Drive Constructor：底盘构造器

EZ-Template 的 Drive Constructor 是整个底盘系统的入口。它需要知道：

```cpp
ez::Drive chassis(
  left_motors,
  right_motors,
  imu_port,
  wheel_diameter,
  wheel_rpm
);
```

这些参数共同决定机器人如何理解“前进 24 英寸”“转向 90 度”这类指令。官方安装文档明确指出，Drive Constructor 会接收底盘电机端口、IMU 端口、轮径和轮速 RPM，EZ-Template 依赖这些信息保证机器人移动正确距离。([ez-robotics.github.io][2])

这个项目里，我的工作不是只把端口填进去，而是要验证三个层面的正确性：

第一，**端口对应关系正确**。左侧电机必须属于左侧组，右侧电机必须属于右侧组。第二，**电机反向正确**。物理安装导致同一侧电机可能需要不同方向，负号端口用于反转方向。第三，**底盘参数正确**。轮径和 RPM 会影响距离换算，错误的轮径会让所有距离指令产生比例误差。

### Tracking Wheel：定位轮

Tracking wheel 是 odometry 的基础。EZ-Template 支持用 rotation sensor 或 ADI encoder 创建 tracking wheel，构造参数包括端口、轮径、到机器人中心的距离和齿比。([ez-robotics.github.io][3])

项目中使用两个 tracking wheel：

```cpp
horiz_tracker(...)
vert_tracker(...)
```

并分别绑定到机器人 back/right 方向。这样做的目标是让机器人不仅知道自己转了多少角度，还能估计自身在场地坐标系中的 x、y 位移。

这里的关键点是：**tracking wheel 不是“装上就能定位”，它必须经过几何参数校准**。轮径影响位移换算，`distance_to_center` 影响旋转补偿，端口正负影响读数方向。如果这三个参数有一个错，odometry 就会出现系统性漂移。

### Autonomous Selector：自动程序选择器

EZ-Template 提供 autonomous selector，用于在 V5 Brain 屏幕或其他输入方式上切换自动程序。官方文档说明，`ez::as::initialize()` 用于初始化选择器，如果插入 SD 卡，可以从 SD 卡读取当前页面；`autons_add()` 用于向 selector 添加自动程序，传入的是名称和函数对象。([ez-robotics.github.io][4])

项目中的自动程序注册逻辑大致为：

```cpp
ez::as::auton_selector.autons_add({
  Auton("skill", skill),
  Auton("laser_test", laser_test),
  ...
});
```

最终在 `autonomous()` 中通过：

```cpp
ez::as::auton_selector.selected_auton_call();
```

调用当前选择的自动程序。项目问答文档也明确记录了这一流程。

这个设计的好处是：比赛现场可以不重新编译代码，只通过 selector 选择不同自动路线、测试程序或校准程序。缺点是：如果调试 auton 和比赛 auton 混在一起，存在选错程序的风险。因此网站展示时可以写“实现了自动程序选择与调试入口”，但不需要暴露具体每个 auton 名称。

---

## 运动控制设计

### 1. 直线运动：Drive PID

EZ-Template 的 `pid_drive_set()` 用于相对直线运动。官方文档说明，它让机器人相对于当前位置前进或后退；同时，为了减少误差积累，EZ-Template 会在 drive PID 和 turn PID 之间配合，使机器人在直线运动时维持目标 heading。([ez-robotics.github.io][5])

项目中使用的典型形式是：

```cpp
chassis.pid_drive_set(24_in, 110);
chassis.pid_wait();
```

其中 `24_in` 是目标距离，`110` 是速度上限。这个接口适合短距离、直线且不需要复杂路径规划的运动段。

但 `pid_drive_set()` 的本质仍然是相对运动。也就是说，如果机器人第一段原本要走 24 英寸，实际只走了 23 英寸，那么后续路线会继承这个误差。因此在关键位置，项目并没有完全依赖相对直线运动，而是结合 odometry 和距离传感器进行修正。

### 2. Slew Acceleration：平滑加速度

Slew acceleration 的作用是限制速度上升斜率，让机器人不是瞬间从 0 提到目标速度，而是在一段距离或角度内逐渐加速。EZ-Template 文档中也说明，slew 会 ramp up speed limit，使加速度更平滑。([ez-robotics.github.io][5])

项目中这类写法用于减少打滑、翘头和机构晃动：

```cpp
chassis.slew_drive_set(false);
chassis.slew_drive_constants_set(5_in, 50);
chassis.pid_drive_set(24_in, 110, true);
chassis.pid_wait();
```

这不是“让机器人变慢”，而是用可控的加速度换取更稳定的起步和更可复现的路径。对于 VEX 这类轻量、高加速度、轮胎容易打滑的机器人来说，slew 是很有价值的工程参数。

### 3. 角度转向：Turn PID

EZ-Template 的 `pid_turn_set()` 用于 point turn，也就是一侧底盘正转、一侧底盘反转，使机器人围绕自身中心转向。官方文档说明，默认情况下顺时针为正，逆时针为负；普通 turn 函数使用 absolute heading，也就是转到 0 度永远表示回到初始方向。([ez-robotics.github.io][6])

项目中使用了绝对角度控制：

```cpp
chassis.pid_turn_set(45_deg, 90);
chassis.pid_wait();
```

相比相对转向，绝对转向更适合复杂自动程序。原因是后续角度不依赖上一段“理论转了多少”，而是指向场地中的固定 heading。例如 90°、180°、270° 可以对应场地方向，这让自动程序更容易调试。

### 4. Swing Turn：单边摆动转向

Swing turn 是这个项目中比较值得展示的技术点。EZ-Template 官方文档解释，`pid_swing_set()` 会让底盘一侧通过 PID 运动，另一侧保持固定或以固定速度运动，使机器人围绕某个点 swing。它不是原地旋转，而是带有弧线半径的转向。([ez-robotics.github.io][7])

项目中使用了类似：

```cpp
chassis.pid_swing_set(ez::LEFT_SWING, 310_deg, 90, 30, ez::ccw);
chassis.pid_wait_quick_chain();
```

swing turn 的工程意义在于：它可以减少一些场景下的动作时间，使机器人以更自然的弧线进入下一个路径段，而不是每次都停下、原地旋转、再启动。原地转向稳定但慢，swing turn 更快但更依赖 PID 参数和机械稳定性。

项目日志中提到，单边 swing 和双边 swing 对 PID 的需求不同：单边 swing 可以给更激进的 kD 保证连贯性，而双边 swing 有时需要更保守的 PID 防止翘头。这个判断是有工程含义的：不同动作虽然调用同一个控制函数，但底盘动力学并不相同，因此不能迷信一组全局 PID 参数解决所有动作。

### 5. Odometry 坐标运动

Odometry 是项目中最能体现控制系统复杂度的部分。EZ-Template 默认坐标系中，机器人从 `(0, 0)` 开始，朝向 `0°`；右侧为正 X，前方为正 Y，顺时针为正 theta。官方文档也说明，可以通过 `chassis.odom_xyt_set(0_in, 0_in, 0_deg)` 修改起点。([ez-robotics.github.io][8])

EZ-Template 的点到点 odometry motion 本质上同时运行两个 PID：一个用于前后距离，也就是 xyPID；另一个用于角度，也就是 angularPID。官方文档说明，角度 PID 会根据目标点和当前点之间的角度计算目标朝向，距离 PID 则根据当前点与目标点之间的距离计算误差。([ez-robotics.github.io][8])

项目中使用 odometry 的目的不是炫技，而是解决相对运动累积误差的问题。例如当机器人需要从当前位置前往某个场地坐标点时，`pid_odom_set()` 比简单的 “drive 多少英寸 + turn 多少度” 更接近真实路径规划。

---

## 自定义封装：`chassis_straight()`

项目中一个关键自定义封装是 `chassis_straight()`。它的目标是：让机器人沿当前朝向前进指定距离，但底层不是简单调用 `pid_drive_set()`，而是把“沿当前方向前进 d”转换成 odometry 目标点。

核心数学关系是：

```cpp
aim_x = cur_x + aim_distance * sin(theta)
aim_y = cur_y + aim_distance * cos(theta)
```

这里使用的是 EZ-Template 的坐标约定：`0° = +Y`，`90° = +X`。因此当前进方向为 `theta` 时，x 方向增量是 `d * sin(theta)`，y 方向增量是 `d * cos(theta)`。项目问答文档中也明确整理了这一解释。

这个封装的意义在于：它把“直线前进”从简单编码器距离控制，变成了一个坐标目标。这样理论上可以利用 odometry 的反馈让机器人更接近直线目标，而不是在运动过程中因为微小角度误差持续偏离。

但这里也有一个需要注意的点：这种封装依赖 odometry 的可靠性。如果 tracking wheel 参数、IMU、轮胎打滑或场地摩擦导致定位误差过大，那么 odometry 目标点也会被错误状态污染。因此项目中又加入了距离传感器校准，用来在关键位置重置或修正位置。

---

## 传感器辅助校准：`laser_examination()`

为了提高自动程序的重复性，项目封装了基于前后距离传感器的 `laser_examination()`。这个函数的逻辑是：

1. 读取前/后距离传感器；
2. 计算当前距离与目标距离之间的误差；
3. 如果误差超过容许范围，就用小功率驱动机器人前进或后退；
4. 持续修正直到误差进入 tolerance，或触发 timeout；
5. 停止底盘电机。

项目日志中记录，该函数的设计目标是在机器人运动到边缘后，通过激光/距离传感器对场地边界进行小功率校准，使机器人在边界附近获得更高的一致性。

这套逻辑的价值在于：odometry 是相对估计，会随时间漂移；场地边界是绝对参考。如果机器人已经靠近墙体或固定结构，就可以用距离传感器把“相对定位”重新拉回现实世界。

这里可以在网站中这样描述：

> 在自动程序中，我引入了基于距离传感器的边界校准逻辑。机器人在靠近场地边界后，通过前后距离传感器读取与墙体的距离误差，并以低功率进行短距离修正，从而减少 odometry 累积误差对后续路径的影响。

这段足够公开，不暴露具体比赛路线，也能体现工程判断。

---

## 机构控制封装：`robotics_mode()`

项目中还将 intake 和部分机构动作封装为 `robotics_mode()`，通过字符串模式控制不同动作，例如 intake、low throw、long goal、high throw、stop、anti intake 等。

这种封装的工程意义是：自动程序不需要反复直接写多个电机的底层控制，而是调用语义化模式。

例如自动程序中可以写：

```cpp
robotics_mode("eat");
robotics_mode("highthrow");
robotics_mode("stop");
```

而不是每次都写：

```cpp
intake_D.move(...)
intake_M.move(...)
intake_U.move(...)
pneumatic_valve_3.set_value(...)
```

这样可以降低自动程序主逻辑的复杂度，让 `skill()` 更接近“路线脚本”，而把机构细节隐藏在函数内部。对于竞赛项目来说，这会显著提升后期调参效率。

---

## PID 调参与控制思想

项目中使用的 PID 可以拆成三个层次。

### P：比例项

比例项根据当前误差直接输出控制量：

```text
error = setpoint - sensor_value
speed = error * kP
```

它的直觉是：离目标越远，速度越大；越接近目标，速度越小。项目日志中也记录了这一理解。

### I：积分项

积分项累计过去一段时间的误差：

```text
integral = integral + error * dT
speed = error * kP + integral * kI
```

积分项可以帮助机器人克服持续性小误差，例如摩擦、负载或低电压导致的“差一点到不了”。但积分项也容易造成过冲，所以在 EZ-Template 中通常会结合 `start_i` 限制积分开始作用的范围。

### D：微分项

微分项关注误差变化率。机器人速度过快、误差快速变化时，D 项可以提供阻尼，减少过冲、震荡和翘头。项目日志中也记录了“翘头、震荡、车轮打滑时 kP 减小、kD 增大”的调参方向。

EZ-Template 还提供 PID Tuner，可在 opcontrol 中运行 `pid_tuner_iterate()` 来通过手柄调整 PID 常量；官方文档提醒，找到满意参数后需要把参数写回 auton 代码，并且主循环应保留 `pros::delay(ez::util::DELAY_TIME)` 用于计时计算。([ez-robotics.github.io][9])

---

## 自动程序设计策略

该项目的自动程序不是单一策略，而是混合了多种控制方法。

### 快速段：开环控制

在不需要高精度、只需要快速完成动作的地方，可以用：

```cpp
chassis.drive_set(...)
pros::delay(...)
```

优点是快、简单、动作直接。缺点是不抗干扰，电池电压、摩擦、碰撞、负载变化都会影响实际结果。

### 定位段：闭环 PID

在需要角度和距离准确的位置，使用：

```cpp
pid_drive_set()
pid_turn_set()
pid_swing_set()
```

这些动作依赖传感器反馈，更稳定，但通常比开环慢。

### 路径段：Odometry

在需要坐标意义的路径中，使用：

```cpp
pid_odom_set()
```

这类运动适合把机器人导向场地中的特定点，而不是只依赖“前进多少 + 转多少”。

### 纠偏段：距离传感器校准

在靠近墙体、边界或固定场地结构时，使用：

```cpp
laser_examination()
```

它的作用是把 odometry 的相对坐标误差，通过物理边界重新校准。

这种混合策略比“全程 odom”或“全程 drive PID”更现实。因为真实比赛里没有任何一种控制方法绝对可靠：开环快但不准，PID 稳但可能慢，odom 依赖定位轮，距离传感器依赖场地结构。成熟做法是根据每一段动作的风险选择不同工具。

---

## 调试体系

项目中搭建了多种调试手段。

### 1. 距离传感器实时监控

`laser_value()` 会持续读取前后距离传感器，并在数值变化时输出到 PROS 终端。它可以用于判断传感器是否正常、方向是否正确、读数是否稳定。

### 2. Odometry 坐标显示

项目使用 controller print 和 brain screen 输出当前 odometry 状态，包括 x、y 和 theta。这样在推车或跑自动程序时，可以检查：

* 直走时 y 是否增加；
* 横移或旋转时 x 是否异常变化；
* 原地旋转时 theta 是否正确；
* tracking wheel 是否有方向反转问题。

项目问答文档中记录了通过 `controller_print_task` 打印 odom x、odom y、odom theta 和 auton 名称来辅助定位端口或传感器问题。

### 3. 自动程序日志

`log_odom()` 和 `log_turn()` 用于记录目标与实际状态的误差。这种日志可以支持复盘，例如判断某一段偏差来自轮滑、转向超调、定位不准还是碰撞干扰。

### 4. Auton Selector 显示

自动程序选择器让调试路线、测试路线和比赛路线可以共存。项目中还通过手柄显示当前 auton 名称，降低现场选错自动程序的风险。

---

## 项目难点

### 1. 原有代码复杂，调用关系不直观

原始日志中可以看出，项目早期最大困难是“不知道函数从哪里来、接口在哪里定义、模板代码和自写代码边界不清楚”。这其实是接手机器人项目时非常典型的问题：不是不会写某一段 C++，而是不知道系统结构。

解决方式是先识别工程分层：PROS 是底层框架，EZ-Template 是底盘控制模板，`main.cpp` 是生命周期入口，`autons.cpp` 是自动程序逻辑，`subsystems.hpp` 是硬件声明。

### 2. 端口与方向错误会放大成控制问题

端口错、反向错、tracking wheel 方向错，表面看起来像 PID 不稳定，实际上是硬件抽象层错误。项目日志中记录了端口汇报问题和重新测试底盘接口的过程，这说明调试不能直接从 PID 开始，必须先验证硬件映射。

### 3. 单一 PID 参数无法适配所有动作

不同动作的动力学特性不同。直线、原地转向、swing turn、贴墙校准、机构同时运行时的底盘运动，对 PID 的要求都不同。因此项目中尝试分段修改 PID 参数，而不是指望一套常量覆盖所有场景。

### 4. Odometry 会累积误差

Odometry 是估计，不是真相。tracking wheel 打滑、轮径误差、安装偏差、碰撞和地面摩擦都会造成漂移。因此项目中引入了距离传感器校准，用场地边界作为绝对参考，减少后续路径偏移。

---

## 开发总结

1. **完成 VEX V5 控制工程迁移与硬件接口适配**
   对底盘电机、IMU、tracking wheel、intake、气动阀和传感器进行端口适配与方向验证。

2. **搭建基于 PROS + EZ-Template 的机器人控制架构**
   使用 EZ-Template 的 drive PID、turn PID、swing turn、odometry、auton selector 和 joystick control 建立完整竞赛控制系统。

3. **实现手动驾驶与自动程序生命周期控制**
   完成 `initialize()`、`competition_initialize()`、`autonomous()`、`opcontrol()` 的结构化接入。

4. **开发 Pushback 自动程序逻辑**
   在 `skill()` 中组合开环驱动、PID 直线、PID 转向、swing turn、odometry 坐标运动和距离传感器校准。

5. **封装机器人机构控制接口**
   将 intake、throw、stop 等机构动作封装为语义化模式，降低自动程序主逻辑复杂度。

6. **实现距离传感器边界校准**
   编写 `laser_examination()`，通过前后距离传感器辅助机器人在场地边界处进行低功率位置修正。

7. **建立现场调试与日志系统**
   使用距离传感器监控、odometry 输出、手柄显示、PROS terminal 日志和自动程序选择器辅助现场调试。

---





