#include "main.h"



/////

// For installation, upgrading, documentations, and tutorials, check out our website!

// https://ez-robotics.github.io/EZ-Template/

/////



// Chassis constructor

ez::Drive chassis(

    {13, -14, -15},  // Left Chassis Ports 

    {-18, 19, 20},   // Right Chassis Ports 



    16,     // IMU Port

    3.25,  // Wheel Diameter 

    450);   // Wheel RPM



ez::tracking_wheel horiz_tracker(4, 1.957, 0.4);  // This tracking wheel is perpendicular to the drive wheels

ez::tracking_wheel vert_tracker(-5, 1.957, 2.9);   // This tracking wheel is parallel to the drive wheels





void initialize() {

  // Print our branding over your terminal :D

  ez::ez_template_print();



  pros::delay(500);  // Stop the user from doing anything while legacy ports configure



  // Look at your horizontal tracking wheel and decide if it's in front of the midline of your robot or behind it

  //  - change `back` to `front` if the tracking wheel is in front of the midline

  //  - ignore this if you aren't using a horizontal tracker

  chassis.odom_tracker_back_set(&horiz_tracker);

  // Look at your vertical tracking wheel and decide if it's to the left or right of the center of the robot

  //  - change `left` to `right` if the tracking wheel is to the right of the centerline

  //  - ignore this if you aren't using a vertical tracker

  chassis.odom_tracker_right_set(&vert_tracker);



  // Configure your chassis controls

  chassis.opcontrol_curve_buttons_toggle(false);   // Disables modifying the controller curve with buttons on the joysticks

  chassis.opcontrol_drive_activebrake_set(0.0);   // Sets the active brake kP. We recommend ~2.  0 will disable.

  chassis.opcontrol_curve_default_set(0.0, 0.0);  // Defaults for curve. If using tank, only the first parameter is used. (Comment this line out if you have an SD card!)



  // Set the drive to your own constants from autons.cpp!

  default_constants();



  // These are already defaulted to these buttons, but you can change the left/right curve buttons here!

  // chassis.opcontrol_curve_buttons_left_set(pros::E_CONTROLLER_DIGITAL_LEFT, pros::E_CONTROLLER_DIGITAL_RIGHT);  // If using tank, only the left side is used.

  // chassis.opcontrol_curve_buttons_right_set(pros::E_CONTROLLER_DIGITAL_Y, pros::E_CONTROLLER_DIGITAL_A);



  // Autonomous Selector using LLEMU

  ez::as::auton_selector.autons_add({

      {"skill auto\nWriter: SHELL", skill},

      {"hzc nb", turn_example},

      {"giving the laser value\nwriter: SHELL", laser_test},

      {"Drive and Turn\n\nSlow down during drive", wait_until_change_speed},

      {"Swing Turn\n\nSwing in an 'S' curve", swing_example},

      {"Motion Chaining\n\nDrive forward, turn, and come back, but blend everything together :D", motion_chaining},

      {"Combine all 3 movements", combining_movements},

      {"Interference\n\nAfter driving forward, robot performs differently if interfered or not", interfered_example},

      {"Simple Odom\n\nThis is the same as the drive example, but it uses odom instead!", odom_drive_example},

      {"Pure Pursuit\n\nGo to (0, 30) and pass through (6, 10) on the way.  Come back to (0, 0)", odom_pure_pursuit_example},

      {"Pure Pursuit Wait Until\n\nGo to (24, 24) but start running an intake once the robot passes (12, 24)", odom_pure_pursuit_wait_until_example},

      {"Boomerang\n\nGo to (0, 24, 45) then come back to (0, 0, 0)", odom_boomerang_example},

      {"Boomerang Pure Pursuit\n\nGo to (0, 24, 45) on the way to (24, 24) then come back to (0, 0, 0)", odom_boomerang_injected_pure_pursuit_example},

      {"Measure Offsets\n\nThis will turn the robot a bunch of times and calculate your offsets for your tracking wheels.", measure_offsets},

  });



  // Initialize chassis and auton selector

  chassis.initialize();

  ez::as::initialize();

  master.rumble(chassis.drive_imu_calibrated() ? "." : "---");

  pros::delay(1000);
  master.rumble("-");

  // Start controller print task after init completes
  pros::Task controller_print_task([]() {
    pros::delay(200);  // Wait for rumble to finish
    master.clear();
    while (true) {
      master.print(0, 0, "x:%.2f y:%.2f", chassis.odom_x_get(), chassis.odom_y_get());
      pros::delay(50);
      master.print(1, 0, "a:%.1f", chassis.odom_theta_get());
      pros::delay(50);
      int page = ez::as::auton_selector.auton_page_current;
      int count = ez::as::auton_selector.Autons.size();
      if (page < 0) page = count - 1;
      else if (page >= count) page = 0;
      ez::as::auton_selector.auton_page_current = page;
      std::string auton_name = count > 0 ? ez::as::auton_selector.Autons[page].Name : "None";
      auton_name = auton_name.substr(0, auton_name.find('\n'));
      master.print(2, 0, "%s", auton_name.substr(0, 19).c_str());
      pros::delay(100);
    }
  });
}



/**

 * Runs while the robot is in the disabled state of Field Management System or

 * the VEX Competition Switch, following either autonomous or opcontrol. When

 * the robot is enabled, this task will exit.

 */

void disabled() {

  // . . .

}



/**

 * Runs after initialize(), and before autonomous when connected to the Field

 * Management System or the VEX Competition Switch. This is intended for

 * competition-specific initialization routines, such as an autonomous selector

 * on the LCD.

 *

 * This task will exit when the robot is enabled and autonomous or opcontrol

 * starts.

 */

void competition_initialize() {

  pneumatic_valve_1.set_value(true);

}



/**

 * Runs the user autonomous code. This function will be started in its own task

 * with the default priority and stack size whenever the robot is enabled via

 * the Field Management System or the VEX Competition Switch in the autonomous

 * mode. Alternatively, this function may be called in initialize or opcontrol

 * for non-competition testing purposes.

 *

 * If the robot is disabled or communications is lost, the autonomous task

 * will be stopped. Re-enabling the robot will restart the task, not re-start it

 * from where it left off.

 */

void autonomous() {

  chassis.pid_targets_reset();                // Resets PID targets to 0

  chassis.drive_imu_reset();                  // Reset gyro position to 0

  chassis.drive_sensor_reset();               // Reset drive sensors to 0

  chassis.odom_xyt_set(0_in, 0_in, 0_deg);    // Set the current position, you can start at a specific position with this

  chassis.drive_brake_set(MOTOR_BRAKE_HOLD);  // Set motors to hold.  This helps autonomous consistency



  /*

  Odometry and Pure Pursuit are not magic



  It is possible to get perfectly consistent results without tracking wheels,

  but it is also possible to have extremely inconsistent results without tracking wheels.

  When you don't use tracking wheels, you need to:

   - avoid wheel slip

   - avoid wheelies

   - avoid throwing momentum around (super harsh turns, like in the example below)

  You can do cool curved motions, but you have to give your robot the best chance

  to be consistent

  */



  ez::as::auton_selector.selected_auton_call();  // Calls selected auton from autonomous selector

}



/**

 * Simplifies printing tracker values to the brain screen

 */

void screen_print_tracker(ez::tracking_wheel *tracker, std::string name, int line) {

  std::string tracker_value = "", tracker_width = "";

  // Check if the tracker exists

  if (tracker != nullptr) {

    tracker_value = name + " tracker: " + util::to_string_with_precision(tracker->get());             // Make text for the tracker value

    tracker_width = "  width: " + util::to_string_with_precision(tracker->distance_to_center_get());  // Make text for the distance to center

  }

  ez::screen_print(tracker_value + tracker_width, line);  // Print final tracker text

}



/**

 * Ez screen task

 * Adding new pages here will let you view them during user control or autonomous

 * and will help you debug problems you're having

 */

void ez_screen_task() {

  while (true) {

    // Only run this when not connected to a competition switch

    if (!pros::competition::is_connected()) {

      // Blank page for odom debugging

      if (chassis.odom_enabled() && !chassis.pid_tuner_enabled()) {

        // If we're on the first blank page...

        if (ez::as::page_blank_is_on(0)) {

          // Display X, Y, and Theta

          ez::screen_print("x: " + util::to_string_with_precision(chassis.odom_x_get()) +

                               "\ny: " + util::to_string_with_precision(chassis.odom_y_get()) +

                               "\na: " + util::to_string_with_precision(chassis.odom_theta_get()),

                           1);  // Don't override the top Page line



          // Display all trackers that are being used

          screen_print_tracker(chassis.odom_tracker_left, "l", 4);

          screen_print_tracker(chassis.odom_tracker_right, "r", 5);

          screen_print_tracker(chassis.odom_tracker_back, "b", 6);

          screen_print_tracker(chassis.odom_tracker_front, "f", 7);

        }

      }

    }



    // Remove all blank pages when connected to a comp switch

    else {

      if (ez::as::page_blank_amount() > 0)

        ez::as::page_blank_remove_all();

    }



    pros::delay(ez::util::DELAY_TIME);

  }

}

pros::Task ezScreenTask(ez_screen_task);



/**

 * Gives you some extras to run in your opcontrol:

 * - run your autonomous routine in opcontrol by pressing DOWN and B

 *   - to prevent this from accidentally happening at a competition, this

 *     is only enabled when you're not connected to competition control.

 * - gives you a GUI to change your PID values live by pressing X

 */

void ez_template_extras() {

  // Only run this when not connected to a competition switch

  if (!pros::competition::is_connected()) {

    // PID Tuner

    // - after you find values that you're happy with, you'll have to set them in auton.cpp



    // Enable / Disable PID Tuner

    //  When enabled:

    //  * use A and Y to increment / decrement the constants

    //  * use the arrow keys to navigate the constants

    if (master.get_digital_new_press(DIGITAL_UP))

      chassis.pid_tuner_toggle();



    // Trigger the selected autonomous routine

    if ((master.get_digital_new_press(DIGITAL_LEFT) && master.get_digital(DIGITAL_RIGHT)) ||

        (master.get_digital_new_press(DIGITAL_RIGHT) && master.get_digital(DIGITAL_LEFT))) {

      pros::motor_brake_mode_e_t preference = chassis.drive_brake_get();

      autonomous();

      chassis.drive_brake_set(preference);

    }



    // Allow PID Tuner to iterate

    chassis.pid_tuner_iterate();

  }



  // Disable PID Tuner when connected to a comp switch

  else {

    if (chassis.pid_tuner_enabled())

      chassis.pid_tuner_disable();

  }

}



/**

 * Runs the operator control code. This function will be started in its own task

 * with the default priority and stack size whenever the robot is enabled via

 * the Field Management System or the VEX Competition Switch in the operator

 * control mode.

 *

 * If no competition control is connected, this function will run immediately

 * following initialize().

 *

 * If the robot is disabled or communications is lost, the

 * operator control task will be stopped. Re-enabling the robot will restart the

 * task, not resume it from where it left off.

 */

// 81988 动作组后台任务
static volatile bool task_81988_active = false;

static void delay_check(int ms) {
  for (int t = 0; t < ms && task_81988_active; t += 10)
    pros::delay(10);
}

static void do_highthrow(double v) {
  pneumatic_valve_3.set_value(false);
  intake_D.move(-v);
  intake_M.move(-v);
  intake_U.move(-v);
  delay_check(250);
  if (!task_81988_active) return;
  intake_D.move(v);
  intake_M.move(v);
  intake_U.move((int)(-0.6 * v));
}

static void task_81988_fn(void*) {
  double v = 85;
  do_highthrow(v);
  for (int i = 1; i <= 4 && task_81988_active; i++) {
    delay_check(1000);
    if (!task_81988_active) break;
    v -= 15;
    do_highthrow(v);
  }
  if (task_81988_active) {
    optical_2.set_led_pwm(100);
    int32_t t0 = pros::millis();
    while (optical_2.get_proximity() > 200 && (pros::millis() - t0) < 5000 && task_81988_active) {
      do_highthrow(v);
      delay_check(1000);
    }
  }

  intake_D.move(0);
  intake_M.move(0);
  intake_U.move(0);
  task_81988_active = false;
}

void opcontrol() {

  // This is preference to what you like to drive on
  
  chassis.drive_brake_set(MOTOR_BRAKE_COAST);



  int32_t l2_press_time = 0;

  bool l2_prev = false;



  while (true) {

    // Gives you some extras to make EZ-Template ezier

    ez_template_extras();



    // chassis.opcontrol_tank();  // Tank control

    // chassis.opcontrol_arcade_standard(ez::SPLIT);   // Standard split arcade

    chassis.opcontrol_arcade_standard(ez::SINGLE);  // Standard single arcade

    // chassis.opcontrol_arcade_flipped(ez::SPLIT);    // Flipped split arcade

    // chassis.opcontrol_arcade_flipped(ez::SINGLE);   // Flipped single arcade



    const bool x_modifier = master.get_digital(DIGITAL_X);

    const bool y_modifier = master.get_digital(DIGITAL_Y);



    if (master.get_digital(DIGITAL_LEFT)) {

      if (master.get_digital_new_press(DIGITAL_X))

        ez::as::page_up();

      if (master.get_digital_new_press(DIGITAL_B))

        ez::as::page_down();

    }

    if (master.get_digital_new_press(DIGITAL_DOWN)) {
      if (task_81988_active) {
        task_81988_active = false;
        pros::delay(20);
        intake_D.move(0);
        intake_M.move(0);
        intake_U.move(0);
      } else {
        task_81988_active = true;
        pros::Task t(task_81988_fn, nullptr, "81988");
      }
    }



    const bool r1 = master.get_digital(DIGITAL_R1);

    const bool r2 = master.get_digital(DIGITAL_R2);

    const bool l1 = master.get_digital(DIGITAL_L1);

    const bool l2 = master.get_digital(DIGITAL_L2);



    int32_t now = pros::millis();

    if (l2 && !l2_prev) {

      l2_press_time = now;

    }

    l2_prev = l2;



    int intake_d_speed = 0;

    int intake_m_speed = 0;

    int intake_u_speed = 0;//如果容易漏球可以给功率 调试过程中马达太烫了暂时删掉



    if (r1) {

      intake_d_speed = 127;

      intake_m_speed = 127;

      intake_u_speed = 30;

    } else if (r2) {

      if (x_modifier) {

        intake_d_speed = -40;

        intake_m_speed = -40;

        intake_u_speed = -50;

      } else {

        intake_d_speed = -127;

        intake_m_speed = -127;

        intake_u_speed = -127;

      }

      if (y_modifier) {

        intake_d_speed = (int)(intake_d_speed * 0.45);

        intake_m_speed = (int)(intake_m_speed * 0.45);

        intake_u_speed = (int)(intake_u_speed * 0.45);

      }

    } else if (l2) {

      if (now - l2_press_time < 200) {

        intake_d_speed = -127;

        intake_m_speed = -127;

        intake_u_speed = -127;

      } else {

        if (x_modifier) {

          intake_d_speed = 60;

          intake_m_speed = 60;

          intake_u_speed = -40;

        } else {

          intake_d_speed = 127;

          intake_m_speed = 127;

          intake_u_speed = -127;

        }

      }

    } else if (l1) {

      intake_d_speed = 127;

      intake_m_speed = 127;

      intake_u_speed = 127;

    }



    if (!task_81988_active) {
      intake_D.move(intake_d_speed);
      intake_M.move(intake_m_speed);
      intake_U.move(intake_u_speed);
    }



    if (!master.get_digital(DIGITAL_LEFT)) {

      pneumatic_valve_1.set_value(master.get_digital(DIGITAL_A));

      pneumatic_valve_2.set_value(master.get_digital(DIGITAL_B));

      pneumatic_valve_3.set_value(master.get_digital(DIGITAL_L1));

      pneumatic_valve_4.set_value(master.get_digital(DIGITAL_Y));

    }



    pros::delay(ez::util::DELAY_TIME);  // This is used for timer calculations!  Keep this ez::util::DELAY_TIME

  }

}

