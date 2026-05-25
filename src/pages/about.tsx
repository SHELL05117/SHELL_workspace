import React, {useEffect} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import {BadgeCheck, CalendarDays} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '../components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../components/ui/tabs';

const honors = [
  {
    id: 'vex-qingdao-2022',
    year: '2022',
    title: 'VEX 中国青岛第十五届亚锦赛',
    result: '二等奖',
    imageUrl: '',
  },
  {
    id: 'gaoxin-maker-2022',
    year: '2022',
    title: '高新区中小学第八届科创比赛',
    result: '二等奖',
    imageUrl: '',
  },
  {
    id: 'qinghe-2023',
    year: '2023',
    title: '“科创青禾”全国 VEX 机器人精英赛高中组',
    result: '一等奖',
    imageUrl: '',
  },
  {
    id: 'sjtu-vrc-2023',
    year: '2023',
    title: 'VRC 上海交通大学全国精英赛',
    result: '殿军',
    imageUrl: '',
  },
  {
    id: 'canada-southwest-champion-2023',
    year: '2023',
    title: 'VRC 中国-加拿大国际赛西南赛区',
    result: '冠军',
    imageUrl: '',
  },
  {
    id: 'canada-southwest-first-2023',
    year: '2023',
    title: 'VRC 中国-加拿大国际赛西南赛区',
    result: '一等奖',
    imageUrl: '',
  },
  {
    id: 'blue-ai-skills-2023',
    year: '2023',
    title: '首届“中国蓝 AI 未来之星-博思杯” VRC 技能赛',
    result: '殿军',
    imageUrl: '',
  },
  {
    id: 'blue-ai-amaze-2023',
    year: '2023',
    title: '首届“中国蓝 AI 未来之星-博思杯” VRC',
    result: '最佳惊奇奖',
    imageUrl: '',
  },
  {
    id: 'talent-program-2023',
    year: '2023',
    title: '高新区英才计划首聘人员',
    result: '计算机类',
    imageUrl: '',
  },
  {
    id: 'top-maker-student-2023',
    year: '2023',
    title: '成都市高新区科创十佳学生',
    result: '入选',
    imageUrl: '',
  },
];

export default function About(): React.ReactNode {
  const location = useLocation();
  const photoUrl = useBaseUrl('/img/source-assets/phot.png');
  const graduationPhoto = useBaseUrl('/img/source-assets/毕业.jpg');
  const internshipPhoto = useBaseUrl('/img/source-assets/在成都骐闻科技有限公司实习.jpg');
  const campusPhoto = useBaseUrl('/img/source-assets/高中阶段.jpg');
  const emailLogo = useBaseUrl('/img/social/email.svg');
  const instagramLogo = useBaseUrl('/img/social/instagram.svg');
  const discordLogo = useBaseUrl('/img/social/discord.svg');
  const githubLogo = useBaseUrl('/img/social/github.svg');

  useEffect(() => {
    const section = new URLSearchParams(location.search).get('section');
    if (!section) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  }, [location.search]);

  return (
    <Layout title="About" description="SHELL Workspace 公开身份档案">
      <main className="stage-page container margin-vert--lg">
        <section id="public-profile" className="about-hero">
          <div className="archive-panel">
            <p className="stage-kicker">Public Profile</p>
            <h1>About SHELL</h1>
            <p>
              SHELL，男，2007 年 10 月出生于中国重庆，现任成都骐闻科技有限公司实习生。他关注软件、Web 开发、VEX、
              机器人控制、人工智能工具链与工程实践的结合。
            </p>
            <p>
              他的目标是用代码控制真实机器，用工程方法管理项目，用 AI 工具提升开发效率，再把这些过程整理成可以长期复用和公开展示的作品。
            </p>
            <div className="about-actions">
              <Link className="button button--primary" to="/projects">
                查看 Projects
              </Link>
              <Link className="button button--secondary" to="/about?section=contact">
                交流学习
              </Link>
            </div>
          </div>
          <img src={photoUrl} alt="SHELL 公开展示照片" />
        </section>

        <section id="public-identity" className="about-section archive-panel">
          <h2>公开身份</h2>
          <ul>
            <li>VEX U 程序员。</li>
            <li>软件工程、嵌入式开发和机械工程学习者。</li>
            <li>Melody Rapper，同时关注说唱音乐和流行乐创作。</li>
            <li>羽毛球爱好者，守望先锋白金玩家。</li>
          </ul>
        </section>

        <section id="focus" className="about-section archive-panel">
          <h2>当前关注方向</h2>
          <ul className="skill-matrix">
            <li>VEX / VEX-U 机器人程序开发。</li>
            <li>C++ 与嵌入式控制。</li>
            <li>机器人路径规划、Pure Pursuit 和运动控制。</li>
            <li>Web 项目、个人网站建设、GitHub / 开源项目管理。</li>
            <li>AI 辅助开发工作流、工程文档与长期知识库建设。</li>
          </ul>
        </section>

        <section id="education" className="about-section archive-panel about-section--with-photo">
          <div>
            <h2>教育与队伍经历</h2>
            <ul>
              <li>高中就读于电子科技大学实验中学。</li>
              <li>本科阶段学习机械设计制造及其自动化相关专业。</li>
              <li>2022 年前：在 758C VEX 初中组担任程序员。</li>
              <li>2022 年及以后：在 74000M V5RC 队伍中担任程序员。</li>
              <li>2026 年：专项准备并参与 VEX-U 方向相关项目与竞赛。</li>
            </ul>
          </div>
          <figure className="about-photo-note about-photo-note--portrait">
            <img src={graduationPhoto} alt="SHELL 毕业阶段档案照片" />
            <figcaption>毕业阶段 / 校园档案</figcaption>
          </figure>
        </section>

        <section id="robotics-role" className="about-section archive-panel">
          <h2>机器人职责</h2>
          <ul>
            <li>机器人程序开发与自动阶段逻辑设计。</li>
            <li>底盘控制、运动控制、路径规划与路径跟随。</li>
            <li>竞赛策略程序实现、赛前调试、参数优化和现场问题排查。</li>
          </ul>
        </section>

        <section id="honors" className="about-section honor-archive">
          <div className="section-heading-row">
            <div>
              <p className="stage-kicker">Honor Archive</p>
              <h2>竞赛与荣誉</h2>
            </div>
            <span>图片链接待补充</span>
          </div>
          <Tabs defaultValue={honors[0].id} className="honor-tabs">
            <TabsList aria-label="荣誉档案概览">
              {honors.map((honor) => (
                <TabsTrigger key={honor.id} value={honor.id}>
                  <span>{honor.year}</span>
                  {honor.result}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="honor-content-stack">
              {honors.map((honor) => (
                <TabsContent key={honor.id} value={honor.id}>
                  <Card className="honor-card">
                    <CardHeader>
                      <span className="honor-year">
                        <CalendarDays aria-hidden="true" size={16} />
                        {honor.year}
                      </span>
                      <CardTitle>{honor.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="honor-media">
                        {honor.imageUrl ? <img src={honor.imageUrl} alt={`${honor.title} ${honor.result}`} /> : <span>荣誉图片预留位</span>}
                      </div>
                      <div className="honor-meta">
                        <BadgeCheck aria-hidden="true" size={18} />
                        <strong>{honor.result}</strong>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </section>

        <section id="engineering" className="about-section archive-panel about-section--with-photo">
          <div>
            <h2>实习与工程经历</h2>
            <p>
              SHELL 在成都骐闻科技有限公司担任实习生，接触机器人教育、竞赛项目、程序开发与工程协作相关工作，包括技术迭代、工程文档、
              AI 编程工具、团队协作、项目交付流程和机器人竞赛训练与开发场景。
            </p>
          </div>
          <figure className="about-photo-note about-photo-note--wide">
            <img src={internshipPhoto} alt="SHELL 实习与机器人工程现场照片" />
            <figcaption>实习现场 / 工程协作</figcaption>
          </figure>
        </section>

        <section id="campus" className="about-section archive-panel about-section--with-photo">
          <div>
            <h2>校园与新媒体经历</h2>
            <p>
              高中阶段，SHELL 曾担任学生会新媒体部成员，参与校园新媒体内容制作、活动支持与现场技术协作，也参与过学校典礼与大型活动的后台控制、
              灯光控制和现场执行工作。
            </p>
          </div>
          <figure className="about-photo-note about-photo-note--small">
            <img src={campusPhoto} alt="SHELL 高中阶段生活片段" />
            <figcaption>校园阶段 / 生活片段</figcaption>
          </figure>
        </section>

        <section id="contact" className="about-section contact-panel">
          <div>
            <p className="stage-kicker">Signal Panel</p>
            <h2>联系</h2>
          </div>
          <div className="contact-stack">
            <div className="contact-grid">
              <a className="contact-token" href="mailto:shell05117@163.com">
                <span className="contact-icon">
                  <img src={emailLogo} alt="" />
                </span>
                <span>Email</span>
                <strong>shell05117@163.com</strong>
              </a>
              <a className="contact-token" href="https://github.com/shell05117">
                <span className="contact-icon">
                  <img src={githubLogo} alt="" />
                </span>
                <span>GitHub</span>
                <strong>shell05117</strong>
              </a>
              <a className="contact-token" href="https://www.instagram.com/shell05117">
                <span className="contact-icon">
                  <img src={instagramLogo} alt="" />
                </span>
                <span>Instagram</span>
                <strong>shell05117</strong>
              </a>
              <div className="contact-token">
                <span className="contact-icon">
                  <img src={discordLogo} alt="" />
                </span>
                <span>Discord</span>
                <strong>shell05117</strong>
              </div>
            </div>
            <div className="contact-signal-ribbon" aria-label="联系方式快速展示">
              <span>OPEN CHANNEL</span>
              <strong>shell05117@163.com</strong>
              <p>GitHub / Instagram / Discord: shell05117</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
