import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const honors = [
  '2022 年 VEX 中国青岛第十五届亚锦赛二等奖',
  '2022 年高新区中小学第八届科创比赛二等奖',
  '2023 年“科创青禾”全国 VEX 机器人精英赛高中组一等奖',
  '2023 年 VRC 上海交通大学全国精英赛殿军',
  '2023 年 VRC 中国—加拿大国际赛西南赛区冠军',
  '2023 年 VRC 中国—加拿大国际赛西南赛区一等奖',
  '2023 年首届“中国蓝 AI 未来之星—博思杯”VRC 技能赛殿军',
  '2023 年首届“中国蓝 AI 未来之星—博思杯”VRC 最佳惊奇奖',
  '2023 年高新区英才计划首聘人员计算机类',
  '2023 年成都市高新区科创十佳学生',
];

export default function About(): React.ReactNode {
  const photoUrl = useBaseUrl('/img/source-assets/phot.png');

  return (
    <Layout title="About" description="SHELL Workspace 公开身份档案">
      <main className="container margin-vert--lg">
        <section className="about-hero">
          <div>
            <h1>About SHELL</h1>
            <p>
              SHELL，男，2007 年 10 月出生于中国重庆，现任成都骐闻科技有限公司实习生。
              他关注软件、Web 开发、VEX、机器人控制、人工智能工具链与工程实践的结合。
            </p>
            <p>
              他的目标是用代码控制真实机器，用工程方法管理项目，用 AI 工具提升开发效率，
              再把这些过程整理成可以长期复用和公开展示的作品。
            </p>
            <div className="about-actions">
              <Link className="button button--primary" to="/projects">
                查看 Projects
              </Link>
              <Link className="button button--secondary" to="/notes/robotics/intro">
                查看 Robotics
              </Link>
            </div>
          </div>
          <img src={photoUrl} alt="SHELL 公开展示照片" />
        </section>

        <section className="about-section">
          <h2>公开身份</h2>
          <ul>
            <li>VEX U 程序员。</li>
            <li>软件工程、嵌入式开发和机械工程学习者。</li>
            <li>Melody Rapper，同时关注说唱音乐和流行乐创作。</li>
            <li>羽毛球爱好者，守望先锋白金玩家。</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>当前关注方向</h2>
          <ul>
            <li>VEX / VEX-U 机器人程序开发。</li>
            <li>C++ 与嵌入式控制。</li>
            <li>机器人路径规划、Pure Pursuit 和运动控制。</li>
            <li>Web 项目、个人网站建设、GitHub / 开源项目管理。</li>
            <li>AI 辅助开发工作流、工程文档与长期知识库建设。</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>教育与队伍经历</h2>
          <ul>
            <li>高中就读于电子科技大学实验中学。</li>
            <li>本科阶段学习机械设计制造及其自动化相关专业。</li>
            <li>2022 年前：在 758C VEX 初中组担任程序员。</li>
            <li>2022 年及以后：在 74000M V5RC 队伍中担任程序员。</li>
            <li>2026 年：专项准备并参与 VEX-U 方向相关项目与竞赛。</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>机器人职责</h2>
          <ul>
            <li>机器人程序开发与自动阶段逻辑设计。</li>
            <li>底盘控制、运动控制、路径规划与路径跟踪。</li>
            <li>竞赛策略程序实现、赛前调试、参数优化和现场问题排查。</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>竞赛与荣誉</h2>
          <ul>
            {honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </section>

        <section className="about-section">
          <h2>实习与工程经历</h2>
          <p>
            SHELL 在成都骐闻科技有限公司担任在职实习生，接触机器人教育、竞赛项目、
            程序开发与工程协作相关工作，包括技术迭代、工程文档、AI 编程工具、
            团队协作、项目交付流程和机器人竞赛训练与开发场景。
          </p>
        </section>

        <section className="about-section">
          <h2>校园与新媒体经历</h2>
          <p>
            高中阶段，SHELL 曾担任学生会新媒体部成员，参与校园新媒体内容制作、
            活动支持与现场技术协作，也参与过学校典礼与大型活动的后台控制、
            灯光控制和现场执行工作。
          </p>
        </section>

        <section className="about-section">
          <h2>联系</h2>
          <ul>
            <li>Email：shell05117@163.com</li>
            <li>Instagram：shell05117</li>
            <li>Discord：shell05117</li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
