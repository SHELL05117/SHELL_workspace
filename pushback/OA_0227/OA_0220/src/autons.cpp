#include "main.h"

/////
// For installation, upgrading, documentations, and tutorials, check out our website!
// https://ez-robotics.github.io/EZ-Template/
/////

// These are out of 127
const int DRIVE_SPEED = 110;
const int TURN_SPEED = 90;
const int SWING_SPEED = 110;

///
// Constants
///
void default_constants() {
  // P, I, D, and Start I
  chassis.pid_drive_constants_set(13.5, 0.0, 100.0);         // Fwd/rev constants, used for odom and non odom motions
  chassis.pid_heading_constants_set(10.0, 0.0, 18.0);        // Holds the robot straight while going forward without odom
  chassis.pid_turn_constants_set(3.0, 0.03, 22.5, 15.0);     // Turn in place constants
  chassis.pid_swing_constants_set(11, 0, 88.75);           // Swing constants
  chassis.pid_odom_angular_constants_set(6.5, 0.0, 52.5);    // Angular control for odom motions
  chassis.pid_odom_boomerang_constants_set(5.8, 0.0, 32.5);  // Angular control for boomerang motions

  // Exit conditions
  chassis.pid_turn_exit_condition_set(90_ms, 3_deg, 250_ms, 7_deg, 500_ms, 1500_ms);
  chassis.pid_swing_exit_condition_set(90_ms, 3_deg, 250_ms, 7_deg, 500_ms, 1500_ms);
  chassis.pid_drive_exit_condition_set(90_ms, 1_in, 250_ms, 3_in, 1500_ms, 2500_ms);
  chassis.pid_odom_turn_exit_condition_set(90_ms, 3_deg, 250_ms, 7_deg, 500_ms, 1250_ms);
  chassis.pid_odom_drive_exit_condition_set(90_ms, 1_in, 250_ms, 3_in, 500_ms, 2500_ms);
  chassis.pid_turn_chain_constant_set(3_deg);
  chassis.pid_swing_chain_constant_set(5_deg);
  chassis.pid_drive_chain_constant_set(3_in);

  // Slew constants
  chassis.slew_turn_constants_set(3_deg, 70);
  chassis.slew_drive_constants_set(3_in, 70);
  chassis.slew_swing_constants_set(3_in, 80);

  // The amount that turns are prioritized over driving in odom motions
  // - if you have tracking wheels, you can run this higher.  1.0 is the max
  chassis.odom_turn_bias_set(0.2);

  chassis.odom_look_ahead_set(13_in);           // This is how far ahead in the path the robot looks at
  chassis.odom_boomerang_distance_set(16_in);  // This sets the maximum distance away from target that the carrot point can be
  chassis.odom_boomerang_dlead_set(0.625);     // This handles how aggressive the end of boomerang motions are

  chassis.pid_angle_behavior_set(ez::shortest);  // Changes the default behavior for turning, this defaults it to the shortest path there
}

///
// Drive Example
///

///
// 激光测距校准函数
// 参数 is_front: true=前距离传感器(fdis), false=后距离传感器(bdis)
// 参数 target_distance: 目标距离 (单位: mm，与传感器返回值一致)
// 参数 timeout: 超时时间 (单位: ms)
// 参数 speed: 运动速度 (0~127), 默认35
///
void laser_examination(bool is_front, double target_distance, double timeout, double speed) {
  // 容差: 25mm，误差在此范围内不移动
  const double tolerance = 25.0;

  // 读取当前激光传感器值 (mm)
  double current = is_front ? fdis.get() : bdis.get();
  double error_mm = current - target_distance;

  // 误差在容差内，无需移动
  if (fabs(error_mm) <= tolerance) {
    printf("MovingCompletion: %sLaser: %.0f mm (within tolerance)\n", is_front ? "Front" : "Back", current);
    return;
  }

  // 将误差从 mm 转换为 inches
  double error_in = error_mm / 25.4;

  // 前传感器: error>0 表示距离偏大，需要前进(正距离)靠近目标
  //           error<0 表示距离偏小，需要后退(负距离)远离目标
  // 后传感器: 方向相反
  double move_distance = is_front ? error_in : -error_in;

  // 使用 chassis_straight 前进/后退到目标位置
  chassis_straight(move_distance, speed, timeout);

  // 打印到达位置后的激光传感器反馈值
  double final_val = is_front ? fdis.get() : bdis.get();
  printf("MovingCompletion: %sLaser: %.0f mm\n", is_front ? "Front" : "Back", final_val);
}

///
// 距离传感器实时监控线程函数
// 创建线程，持续输出前后距离传感器的值到pros终端，仅在值变化时输出
///
void laser_value() {
  // 创建监控线程
  pros::Task sensor_task([]() {
    // 输出分割线
    printf("\n========== Distance Sensor Monitor ==========\n");

    // 记录上一次的传感器值，用于检测变化
    int last_front = -1;
    int last_back = -1;

    // 循环实时读取并输出
    while (true) {
      int front_val = fdis.get();
      int back_val = bdis.get();

      // 变化幅度超过5mm时才输出
      if (abs(front_val - last_front) >= 20 || abs(back_val - last_back) >= 20) {
        printf("Front: %d mm | Back: %d mm\n", front_val, back_val);
        last_front = front_val;
        last_back = back_val;
      }

      // 延时避免刷屏
      pros::delay(50);
    }
  });
}

void buttonDebug() {
  while (!master.get_digital(DIGITAL_L1)) pros::delay(10);
  while (master.get_digital(DIGITAL_L1)) pros::delay(10);
}

static double kIntakeMaxV = 100;

void robotics_mode(std::string rmode) {
  if (rmode == "eat") { //吸球
    intake_D.move(kIntakeMaxV);
    intake_M.move(kIntakeMaxV);
    intake_U.move(kIntakeMaxV);
  } else if (rmode == "lowthrow") {//中低桥
    intake_D.move((int)(-0.45 * kIntakeMaxV));
    intake_M.move((int)(-0.45 * kIntakeMaxV));
    intake_U.move((int)(-0.45 * kIntakeMaxV));
  } else if (rmode == "longgoal") {//longgoal
    pneumatic_valve_3.set_value(true);
    intake_D.move((int)(0.8 * kIntakeMaxV));
    intake_M.move((int)(0.8 * kIntakeMaxV));
    intake_U.move((int)(0.8 * kIntakeMaxV));
  } else if (rmode == "highthrow") {//中桥中的高桥
    pneumatic_valve_3.set_value(false);
    intake_D.move(-kIntakeMaxV);
    intake_M.move(-kIntakeMaxV);
    intake_U.move(-kIntakeMaxV);
    pros::delay(250);
    intake_D.move(kIntakeMaxV);
    intake_M.move(kIntakeMaxV);
    intake_U.move((int)(-0.6 * kIntakeMaxV));
  } else if (rmode == "stop") {//停止
    intake_D.move(0);
    intake_M.move(0);
    intake_U.move(0);
  } else if (rmode == "anti_intake") {//反吐
    intake_D.move(-kIntakeMaxV);
    intake_M.move(-kIntakeMaxV);
    intake_U.move(-kIntakeMaxV);
  } 
  else if(rmode == "81988")
  {
    kIntakeMaxV = 85;
    robotics_mode("highthrow");
    for(int iI=1;iI<=4;iI++){
      pros::delay(1000);
      kIntakeMaxV-=15;
      robotics_mode("highthrow");
    }
    optical_2.set_led_pwm(100);
    int32_t t0 = pros::millis();
    while (optical_2.get_proximity() > 200 && (pros::millis() - t0) < 5000) {
      double hue = optical_2.get_hue();
      if (hue < 20 || hue > 340) break; // detect red → break
      robotics_mode("highthrow");
      pros::delay(1000);
    }
    intake_D.move(0);
    intake_M.move(0);
    intake_U.move(0);
  }
  else {
    // error: unknown mode, do nothing
  }
}

// 运动日志: 坐标运动完成后输出目标坐标、实际坐标、误差
static int log_step = 0;
void log_odom(const char* label, double tgt_x, double tgt_y) {
  double cur_x = chassis.odom_x_get();
  double cur_y = chassis.odom_y_get();
  double cur_a = chassis.odom_theta_get();
  double err_x = tgt_x - cur_x;
  double err_y = tgt_y - cur_y;
  double err_dist = sqrt(err_x * err_x + err_y * err_y);
  printf("[%d] %s | tgt:(%.1f, %.1f) actual:(%.1f, %.1f) err:(%.1f, %.1f) dist:%.2f a:%.1f\n",
         ++log_step, label, tgt_x, tgt_y, cur_x, cur_y, err_x, err_y, err_dist, cur_a);
}

// 运动日志: 转向运动完成后输出目标角度、实际角度、误差
void log_turn(const char* label, double tgt_deg) {
  double cur_a = chassis.odom_theta_get();
  // 归一化到 0~360° 方便阅读
  double disp_a = fmod(fmod(cur_a, 360.0) + 360.0, 360.0);
  double err = tgt_deg - disp_a;
  while (err > 180.0) err -= 360.0;
  while (err < -180.0) err += 360.0;
  printf("[%d] %s | tgt:%.1f° actual:%.1f° err:%.1f°\n",
         ++log_step, label, tgt_deg, disp_a, err);
}

///
// 底盘直线运动函数
// aim_distance: 目标距离(英寸), 正=前进, 负=后退
// set_speed: 运动速度 (0~127)
// timeout: 超时时间 (ms), 默认1000ms
///
void chassis_straight(double aim_distance, double set_speed, double timeout) {
  // 获取当前位置和朝向
  pose cur = chassis.odom_pose_get();
  double cur_x = cur.x;
  double cur_y = cur.y;
  double cur_theta = cur.theta;

  // 将角度转换为弧度
  // EZ-Template 朝向: 0°=+Y方向, 90°=+X方向 (顺时针罗盘式)
  double heading_rad = cur_theta * M_PI / 180.0;

  // 三角函数计算目标坐标
  // sin/cos 自动处理所有角度范围, 无需特殊处理 >180° 或 >360°
  double aim_x = cur_x + aim_distance * sin(heading_rad);
  double aim_y = cur_y + aim_distance * cos(heading_rad);

  // 根据距离正负决定前进/后退
  auto dir = aim_distance >= 0 ? fwd : rev;

  // 设置odom目标点 (乘以1_in转换为okapi单位)
  chassis.pid_odom_set({{aim_x * 1_in, aim_y * 1_in}, dir, (int)set_speed});

  // TODO :超时等待: 到达目标或超时则退出 目前还没想到怎么做
  
  chassis.pid_wait();
  // 停止底盘马达
  chassis.drive_set(0, 0);
  log_odom("straight", aim_x, aim_y);
}

void skill() {
  log_step = 0;
  //* PART0:停泊区6球
  robotics_mode("eat");
  chassis.drive_set(30,30);
  pros::delay(500);
  chassis.drive_set(15,15);
  pros::delay(500);
  chassis.drive_set(30,30);
  pros::delay(400);
  chassis.drive_set(25,25);
  pros::delay(400);
  chassis.drive_set(-25,-25);
  pros::delay(900);
  chassis.drive_set(0,0);
  pros::delay(500);
  chassis.drive_set(-100,-100);
  pros::delay(500);
  
  //* PART1:出停泊区
  chassis.drive_set(25, 25);
  pros::delay(1000);
  robotics_mode("stop");
  chassis.odom_xyt_set(0,0,0);
  chassis.drive_set(-20, -20);
  pros::delay(300);

  //* PART2:吸入唯一的蓝球
  chassis.pid_swing_set(ez::RIGHT_SWING, 90_deg, 90);
  chassis.pid_wait();
  pros::delay(200);
  log_turn("swing→90", 90.0);
  chassis.pid_odom_set({{32_in, chassis.odom_y_get() * 1_in}, fwd, 110});
  chassis.pid_wait_quick();
  log_odom("odom→(32,chassis.odom_y_get()", 32.0, chassis.odom_y_get());
  laser_examination(true, 590, 500);//单位：mm 激光传感器只接受mm单位

  chassis.pid_turn_behavior_set(ez::shortest);
  chassis.odom_xyt_set(31_in, -5_in, 90_deg);
  chassis.pid_turn_set(225_deg, 90, ez::cw);
  chassis.pid_wait();
  log_turn("turn→225", 225.0);
  robotics_mode("eat");
  // chassis.pid_odom_set({{23_in, -2_in}, fwd, 70}); //旧代码需要注释
  // chassis.pid_wait();
  chassis_straight(10.0,100.0,1000);
  pros::delay(400);

  //* PART3:中高桥吐球
  chassis.pid_turn_set(45_deg, 90, ez::cw);
  robotics_mode("stop");
  chassis.pid_wait();
  log_turn("turn→45", 45.0);
  chassis.odom_turn_bias_set(0.9); //局部pid调整 
  chassis.odom_look_ahead_set(7_in);           // This is how far ahead in the path the robot looks at
  chassis.pid_odom_set({{0.98_in, -25.84_in}, rev, 85});
  chassis.pid_wait_quick_chain();
  log_odom("odom→MH", 0.98, -25.84);
  if (fabs(fmod(fmod(chassis.odom_pose_get().theta, 360.0) + 360.0, 360.0) - 45.0) > 3.0) 
  {
    chassis.pid_turn_set(45_deg, 50);
    chassis.pid_wait_quick_chain();
    log_turn("turn→45fix", 45.0);
  }
  chassis.drive_set(35, 35);//小功率前进防止卡进去
  pros::delay(300);
   chassis.drive_set(-15,-15);
   kIntakeMaxV = 100;
   robotics_mode("highthrow");
   chassis.odom_xyt_set(0.41_in, -26.22_in, 45_deg);
   robotics_mode("81988");
   
  chassis.odom_turn_bias_set(0.2);
  chassis.odom_look_ahead_set(13_in);
  
  //* PART4: Loader
  chassis.pid_odom_set({{28_in, 6.6_in}, fwd, 100});
  chassis.pid_wait_quick_chain();
  log_odom("odom→loader", 30.0, 9.4);
  chassis.pid_turn_set(0_deg, 70, ez::ccw);
  chassis.pid_wait();
  log_turn("turn→0", 0.0);
  chassis.pid_drive_set(-4_in, 100, true);//后退开盖防止无法打开
  pneumatic_valve_2.set_value(true);
  pros::delay(400);
  kIntakeMaxV = 127;//重置 intake 速度
  robotics_mode("eat");
  chassis.pid_odom_set({{chassis.odom_x_get() * 1_in, 13.0_in}, fwd, 60});
  chassis.pid_wait_quick_chain();
  log_odom("odom→load", chassis.odom_x_get(), 12.0);
  chassis.drive_set(35, 35);
  pros::delay(1800);
  chassis.drive_set(-30,-30);
  pros::delay(500);
  robotics_mode("stop");
  chassis.drive_set(0,0);
  // chassis.pid_wait_quick_chain();
  pneumatic_valve_2.set_value(false); 
  
  //* PART5: 出弯准备前行
  chassis.pid_swing_constants_set(8.0, 0, 105.5); // 分段pid：因为swing双速转弯比较急 加大kD 减小kP
  chassis.pid_swing_set(ez::LEFT_SWING, 285_deg, 95, 30, ez::ccw);//转65度 转角越大过弯越深

  chassis.pid_wait_quick_chain();
  log_turn("swing→300", 300.0);
  chassis.pid_swing_set(ez::RIGHT_SWING, 0_deg, 95, 30, ez::cw);
  chassis.pid_wait_quick_chain();
  log_turn("swing→0", 0.0);
  chassis.pid_turn_set(0_deg,50);
  chassis.pid_wait();
  log_turn("turn→0", 0.0);
  chassis.pid_odom_set({{chassis.odom_x_get() * 1_in, -36_in}, rev, 120});
  // chassis_straight(-60,120,20000)
  chassis.pid_wait_quick_chain();
  if (bdis.get() > 1500) laser_examination(false, 1500, 1000);
  log_odom("odom→south", chassis.odom_x_get(), -34.0);
  /*---------------------------------------------------------------------------------*/
  //                                                                                  |
  // chassis.pid_odom_set({{33_in, -17_in}, rev, 100});                               |
  // chassis.pid_wait();                                                              |
  // robotics_mode("longgoal");                                                       |
  // chassis.drive_set(-25, -25);                                                     |
  // pros::delay(1500);                                                               |
  // robotics_mode("stop");                                                           |
  // chassis.pid_odom_set({{33_in, 3_in}, fwd, 100});                                 |
  // chassis.pid_wait_quick();                                                        |
  // chassis.pid_odom_set({{33_in, 3_in}, fwd, 100});                                 |
  // chassis.pid_wait_quick();                                                        |
  //  如果需要直接Longgoal请打开这段代码                                                                                |
  /*---------------------------------------------------------------------------------*/
  
  
  chassis.pid_swing_set(ez::RIGHT_SWING, 60_deg, 90,60, ez::cw);//出弯
  chassis.pid_wait_quick_chain();
  log_turn("swing→60", 60.0);
  chassis.pid_turn_set(90_deg, 90, ez::cw);
  chassis.pid_wait();
  log_turn("turn→90", 90.0);
  laser_examination(true, 440, 2000);//激光校准位置 380mm~400mm 按需调整
  chassis.pid_turn_set(180_deg, 90, ez::cw);
  chassis.pid_wait();

  log_turn("turn→180", 180.0);
  
  //* PART6:longgoal and Loader
  // chassis.pid_odom_set({{27_in, -60_in}, rev, 100});
  // chassis.pid_wait_quick_chain();
  chassis_straight(-18.0,90.0,2000);//with pid , no timeout ATTENTION!!!
  pneumatic_valve_2.set_value(true); //开盖
  robotics_mode("longgoal");
  chassis.drive_set(-30, -30);
  pros::delay(1500);
  chassis.odom_xyt_set(0_in, 0_in, 0_deg);
  pros::delay(200);
  robotics_mode("eat");
  chassis.pid_odom_set({{0_in, 25_in}, fwd, 80});
  pneumatic_valve_3.set_value(false);
  chassis.pid_wait();
  log_odom("odom→P6load", 0.0, 25.0);
  chassis.drive_set(35, 35);

  pros::delay(1800);
  robotics_mode("stop");
  pneumatic_valve_2.set_value(false); 
  chassis.pid_odom_set({{0_in, 0_in}, rev, 100});
  chassis.pid_wait_quick_chain();
  log_odom("odom→P6back", 0.0, 0.0);
  robotics_mode("longgoal");
  chassis.drive_set(-30, -30);
  pros::delay(1500);
  
  //* PART7:转移到第二半场
  chassis.pid_swing_set(ez::LEFT_SWING, 90_deg, 100,10, ez::cw);
  pneumatic_valve_3.set_value(false);
  robotics_mode("stop");
  chassis.pid_wait_quick_chain();
  log_turn("swing→90P7", 90.0);
  chassis.pid_odom_set({{80_in, 18_in}, fwd, 120});
  chassis.pid_wait_quick_chain();
  log_odom("odom→(80,18)", 80.0, 18.0);
  laser_examination(true, 540, 1800);
  chassis.pid_turn_set(0_deg, 90, ez::ccw);
  chassis.pid_wait();
  log_turn("turn→0P7", 0.0);
  chassis.drive_set(-30,-30);
  pneumatic_valve_2.set_value(true); //开盖
  pros::delay(400);
  chassis.pid_odom_set({{chassis.odom_x_get() * 1_in, 24_in}, fwd, 70});
  robotics_mode("eat");
  chassis.pid_wait();
  log_odom("odom→P7load", chassis.odom_x_get(), 24.0);
  chassis.drive_set(30, 30);
  pros::delay(1800);
  robotics_mode("stop");
  pneumatic_valve_2.set_value(false);
  chassis.pid_swing_constants_set(8.0, 0, 100); // 分段pid：因为swing双速转弯比较急 加大kD 减小kP
  chassis.pid_swing_set(ez::LEFT_SWING, 285_deg, 95, 30, ez::ccw);//转75度 转角越大过弯越深
  chassis.pid_wait_quick_chain();
  log_turn("swing→300P7", 300.0);
  chassis.pid_swing_set(ez::RIGHT_SWING, 0_deg, 95, 30, ez::cw);
  chassis.pid_wait_quick_chain();
  log_turn("swing→0P7", 0.0);
  chassis.pid_odom_set({{chassis.odom_x_get() * 1_in, -35_in}, rev, 100});
  chassis.pid_wait_quick_chain();
  log_odom("odom→southP7", chassis.odom_x_get(), -35.0);
  chassis.pid_swing_set(ez::RIGHT_SWING, 60_deg, 90,60, ez::cw);//出弯
  chassis.pid_wait_quick_chain();
  log_turn("swing→60P7", 60.0);
  chassis.pid_turn_set(90_deg, 90, ez::cw);
  chassis.pid_wait();
  log_turn("turn→90P7", 90.0);
  laser_examination(true, 420, 2000);//激光校准位置 380mm~400mm 按需调整
  chassis.pid_turn_set(180_deg, 90, ez::cw);
  chassis.pid_wait();
  log_turn("turn→180P7", 180.0);
  
  //* PART8:longgoal and Loader
  // chassis.pid_odom_set({{27_in, -60_in}, rev, 100});
  // chassis.pid_wait_quick_chain();
  chassis_straight(-19.0,90.0,2000);//with pid , no timeout ATTENTION!!!
  if (bdis.get() > 900) laser_examination(false, 900, 1000);
  pneumatic_valve_2.set_value(true); //开盖
  robotics_mode("longgoal");
  chassis.drive_set(-30, -30);
  pros::delay(1500);
  chassis.odom_xyt_set(0_in, 0_in, 0_deg);
  pros::delay(200);
  chassis.pid_odom_set({{0_in, 22_in}, fwd, 80});
  robotics_mode("eat");
  pneumatic_valve_3.set_value(false);
  chassis.pid_wait();
  log_odom("odom→P8load", 0.0, 22.0);
  chassis.drive_set(30, 30);

  pros::delay(1800);
  pneumatic_valve_2.set_value(false); 
  chassis.pid_odom_set({{0_in, 0_in}, rev, 100});
  chassis.pid_wait_quick_chain();
  log_odom("odom→P8back", 0.0, 0.0);
  robotics_mode("longgoal");
  chassis.drive_set(-30, -30);
  pros::delay(1500);
  robotics_mode("stop");

  //* PART9:BACK TO PARKING AREA
  pneumatic_valve_3.set_value(false);
  chassis.odom_xyt_set(0,0,0);
  
  chassis.pid_swing_constants_set(9.0, 0, 95); 
  chassis.pid_swing_set(ez::LEFT_SWING, 90_deg, 95, 18, ez::cw);
  chassis.pid_wait_quick_chain();
  chassis.pid_drive_set(30_in,100);
  chassis.pid_wait_quick_chain();
  chassis.pid_swing_set(ez::RIGHT_SWING, 0_deg, 95, ez::ccw);
  chassis.pid_wait_quick_chain();
  chassis.drive_set(100,100);
  pros::delay(800);
  chassis.drive_set(0,0);

}

///
// Turn Example
///
void turn_example() {
  chassis.odom_xyt_set(0,0,0);
  chassis.pid_swing_constants_set(9.0, 0, 95); 
  chassis.pid_swing_set(ez::LEFT_SWING, 90_deg, 95, 18, ez::cw);
  chassis.pid_wait_quick_chain();
  chassis.pid_drive_set(30_in,100);
  chassis.pid_wait_quick_chain();
  chassis.pid_swing_set(ez::RIGHT_SWING, 0_deg, 95, ez::ccw);
  chassis.pid_wait_quick_chain();
  chassis.drive_set(100,100);
  pros::delay(800);
  chassis.drive_set(0,0);
  
  
}

///
// Combining Turn + Drive
///
void laser_test() {
  laser_value(); //激光传感器实时监控线程 需要时请打开pros terminal
  
  //-----------------------------------------------------------------
  //这是中桥代码：
  // chassis.drive_set(-20, -20);
  // kIntakeMaxV = 100;
  // robotics_mode("highthrow");
  // for(int iI=0;iI<4;iI++){
  //   pros::delay(1000);
  //   kIntakeMaxV-=15 ; //降速
  //   if(iI==1) robotics_mode("highthrow");
  //   else robotics_mode("highthrow_withoutanti");
  // }
  //-----------------------------------------------------------------
}

///
// Wait Until and Changing Max Speed
///
void wait_until_change_speed() {
  // pid_wait_until will wait until the robot gets to a desired position

  // When the robot gets to 6 inches slowly, the robot will travel the remaining distance at full speed
  chassis.pid_drive_set(24_in, 30, true);
  chassis.pid_wait_until(6_in);
  chassis.pid_speed_max_set(DRIVE_SPEED);  // After driving 6 inches at 30 speed, the robot will go the remaining distance at DRIVE_SPEED
  chassis.pid_wait();

  chassis.pid_turn_set(45_deg, TURN_SPEED);
  chassis.pid_wait();

  chassis.pid_turn_set(-45_deg, TURN_SPEED);
  chassis.pid_wait();

  chassis.pid_turn_set(0_deg, TURN_SPEED);
  chassis.pid_wait();

  // When the robot gets to -6 inches slowly, the robot will travel the remaining distance at full speed
  chassis.pid_drive_set(-24_in, 30, true);
  chassis.pid_wait_until(-6_in);
  chassis.pid_speed_max_set(DRIVE_SPEED);  // After driving 6 inches at 30 speed, the robot will go the remaining distance at DRIVE_SPEED
  chassis.pid_wait();
}

///
// Swing Example
///
void swing_example() {
  // The first parameter is ez::LEFT_SWING or ez::RIGHT_SWING
  // The second parameter is the target in degrees
  // The third parameter is the speed of the moving side of the drive
  // The fourth parameter is the speed of the still side of the drive, this allows for wider arcs

  chassis.pid_swing_set(ez::LEFT_SWING, 45_deg, SWING_SPEED, 45);
  chassis.pid_wait();

  chassis.pid_swing_set(ez::RIGHT_SWING, 0_deg, SWING_SPEED, 45);
  chassis.pid_wait();

  chassis.pid_swing_set(ez::RIGHT_SWING, 45_deg, SWING_SPEED, 45);
  chassis.pid_wait();

  chassis.pid_swing_set(ez::LEFT_SWING, 0_deg, SWING_SPEED, 45);
  chassis.pid_wait();
}

///
// Motion Chaining
///
void motion_chaining() {
  // Motion chaining is where motions all try to blend together instead of individual movements.
  // This works by exiting while the robot is still moving a little bit.
  // To use this, replace pid_wait with pid_wait_quick_chain.
  chassis.pid_drive_set(24_in, DRIVE_SPEED, true);
  chassis.pid_wait();

  chassis.pid_turn_set(45_deg, TURN_SPEED);
  chassis.pid_wait_quick_chain();

  chassis.pid_turn_set(-45_deg, TURN_SPEED);
  chassis.pid_wait_quick_chain();

  chassis.pid_turn_set(0_deg, TURN_SPEED);
  chassis.pid_wait();

  // Your final motion should still be a normal pid_wait
  chassis.pid_drive_set(-24_in, DRIVE_SPEED, true);
  chassis.pid_wait();
}

///
// Auto that tests everything
///
void combining_movements() {
  chassis.pid_drive_set(24_in, DRIVE_SPEED, true);
  chassis.pid_wait();

  chassis.pid_turn_set(45_deg, TURN_SPEED);
  chassis.pid_wait();

  chassis.pid_swing_set(ez::RIGHT_SWING, -45_deg, SWING_SPEED, 45);
  chassis.pid_wait();

  chassis.pid_turn_set(0_deg, TURN_SPEED);
  chassis.pid_wait();

  chassis.pid_drive_set(-24_in, DRIVE_SPEED, true);
  chassis.pid_wait();
}

///
// Interference example
///
void tug(int attempts) {
  for (int i = 0; i < attempts - 1; i++) {
    // Attempt to drive backward
    printf("i - %i", i);
    chassis.pid_drive_set(-12_in, 127);
    chassis.pid_wait();

    // If failsafed...
    if (chassis.interfered) {
      chassis.drive_sensor_reset();
      chassis.pid_drive_set(-2_in, 20);
      pros::delay(1000);
    }
    // If the robot successfully drove back, return
    else {
      return;
    }
  }
}

// If there is no interference, the robot will drive forward and turn 90 degrees.
// If interfered, the robot will drive forward and then attempt to drive backward.
void interfered_example() {
  chassis.pid_drive_set(24_in, DRIVE_SPEED, true);
  chassis.pid_wait();

  if (chassis.interfered) {
    tug(3);
    return;
  }

  chassis.pid_turn_set(90_deg, TURN_SPEED);
  chassis.pid_wait();
}

///
// Odom Drive PID
///
void odom_drive_example() {
  // This works the same as pid_drive_set, but it uses odom instead!
  // You can replace pid_drive_set with pid_odom_set and your robot will
  // have better error correction.

  chassis.pid_odom_set(24_in, DRIVE_SPEED, true);
  chassis.pid_wait();

  chassis.pid_odom_set(-12_in, DRIVE_SPEED);
  chassis.pid_wait();

  chassis.pid_odom_set(-12_in, DRIVE_SPEED);
  chassis.pid_wait();
}

///
// Odom Pure Pursuit
///
void odom_pure_pursuit_example() {
  // Drive to 0, 30 and pass through 6, 10 and 0, 20 on the way, with slew
  chassis.pid_odom_set({{{6_in, 10_in}, fwd, DRIVE_SPEED},
                        {{0_in, 20_in}, fwd, DRIVE_SPEED},
                        {{0_in, 30_in}, fwd, DRIVE_SPEED}},
                       true);
  chassis.pid_wait();

  // Drive to 0, 0 backwards
  chassis.pid_odom_set({{0_in, 0_in}, rev, DRIVE_SPEED},
                       true);
  chassis.pid_wait();
}

///
// Odom Pure Pursuit Wait Until
///
void odom_pure_pursuit_wait_until_example() {
  chassis.pid_odom_set({{{0_in, 24_in}, fwd, DRIVE_SPEED},
                        {{12_in, 24_in}, fwd, DRIVE_SPEED},
                        {{24_in, 24_in}, fwd, DRIVE_SPEED}},
                       true);
  chassis.pid_wait_until_index(1);  // Waits until the robot passes 12, 24
  // Intake.move(127);  // Set your intake to start moving once it passes through the second point in the index
  chassis.pid_wait();
  // Intake.move(0);  // Turn the intake off
}

///
// Odom Boomerang
///
void odom_boomerang_example() {
  chassis.pid_odom_set({{0_in, 24_in, 45_deg}, fwd, DRIVE_SPEED},
                       true);
  chassis.pid_wait();

  chassis.pid_odom_set({{0_in, 0_in, 0_deg}, rev, DRIVE_SPEED},
                       true);
  chassis.pid_wait();
}

///
// Odom Boomerang Injected Pure Pursuit
///
void odom_boomerang_injected_pure_pursuit_example() {
  chassis.pid_odom_set({{{0_in, 24_in, 45_deg}, fwd, DRIVE_SPEED},
                        {{12_in, 24_in}, fwd, DRIVE_SPEED},
                        {{24_in, 24_in}, fwd, DRIVE_SPEED}},
                       true);
  chassis.pid_wait();

  chassis.pid_odom_set({{0_in, 0_in, 0_deg}, rev, DRIVE_SPEED},
                       true);
  chassis.pid_wait();
}

///
// Calculate the offsets of your tracking wheels
///
void measure_offsets() {
  // Number of times to test
  int iterations = 10;

  // Our final offsets
  double l_offset = 0.0, r_offset = 0.0, b_offset = 0.0, f_offset = 0.0;

  // Reset all trackers if they exist
  if (chassis.odom_tracker_left != nullptr) chassis.odom_tracker_left->reset();
  if (chassis.odom_tracker_right != nullptr) chassis.odom_tracker_right->reset();
  if (chassis.odom_tracker_back != nullptr) chassis.odom_tracker_back->reset();
  if (chassis.odom_tracker_front != nullptr) chassis.odom_tracker_front->reset();
  
  for (int i = 0; i < iterations; i++) {
    // Reset pid targets and get ready for running an auton
    chassis.pid_targets_reset();
    chassis.drive_imu_reset();
    chassis.drive_sensor_reset();
    chassis.drive_brake_set(MOTOR_BRAKE_HOLD);
    chassis.odom_xyt_set(0_in, 0_in, 0_deg);
    double imu_start = chassis.odom_theta_get();
    double target = i % 2 == 0 ? 90 : 270;  // Switch the turn target every run from 270 to 90

    // Turn to target at half power
    chassis.pid_turn_set(target, 63, ez::raw);
    chassis.pid_wait();
    pros::delay(250);

    // Calculate delta in angle
    double t_delta = util::to_rad(fabs(util::wrap_angle(chassis.odom_theta_get() - imu_start)));

    // Calculate delta in sensor values that exist
    double l_delta = chassis.odom_tracker_left != nullptr ? chassis.odom_tracker_left->get() : 0.0;
    double r_delta = chassis.odom_tracker_right != nullptr ? chassis.odom_tracker_right->get() : 0.0;
    double b_delta = chassis.odom_tracker_back != nullptr ? chassis.odom_tracker_back->get() : 0.0;
    double f_delta = chassis.odom_tracker_front != nullptr ? chassis.odom_tracker_front->get() : 0.0;

    // Calculate the radius that the robot traveled
    l_offset += l_delta / t_delta;
    r_offset += r_delta / t_delta;
    b_offset += b_delta / t_delta;
    f_offset += f_delta / t_delta;
  }

  // Average all offsets
  l_offset /= iterations;
  r_offset /= iterations;
  b_offset /= iterations;
  f_offset /= iterations;

  // Set new offsets to trackers that exist
  if (chassis.odom_tracker_left != nullptr) chassis.odom_tracker_left->distance_to_center_set(l_offset);
  if (chassis.odom_tracker_right != nullptr) chassis.odom_tracker_right->distance_to_center_set(r_offset);
  if (chassis.odom_tracker_back != nullptr) chassis.odom_tracker_back->distance_to_center_set(b_offset);
  if (chassis.odom_tracker_front != nullptr) chassis.odom_tracker_front->distance_to_center_set(f_offset);
}


// . . .
// Make your own autonomous functions here!
// . . .