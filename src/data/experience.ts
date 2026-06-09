import type { Experience, Education } from './types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: {
      en: 'Backend Developer Engineer',
      zh: '后端开发工程师',
    },
    company: {
      en: 'Enterprise Applications',
      zh: '企业应用',
    },
    startDate: '2022-07',
    endDate: null,
    description: {
      en: 'Designing and developing scalable microservice architectures with Java and Spring Boot. Leading LLM integration initiatives for enterprise applications, building AI-powered Agent systems that transform traditional backend workflows.',
      zh: '使用 Java 和 Spring Boot 设计和开发可扩展的微服务架构。主导 LLM 集成项目，为企业应用构建 AI 驱动的 Agent 系统，转型传统后端工作流程。',
    },
  },
  {
    id: 'exp-2',
    role: {
      en: 'Java Backend Developer',
      zh: 'Java 后端开发者',
    },
    company: {
      en: 'Distributed Systems',
      zh: '分布式系统',
    },
    startDate: '2021-03',
    endDate: '2022-06',
    description: {
      en: 'Built high-throughput data pipelines processing millions of daily events using Kafka and Redis. Implemented rate limiting, circuit breaker patterns, and intelligent routing for API gateway services.',
      zh: '使用 Kafka 和 Redis 构建每日处理数百万事件的高吞吐量数据管道。为 API 网关服务实现了限流、熔断器模式和智能路由。',
    },
  },
  {
    id: 'exp-3',
    role: {
      en: 'Software Developer',
      zh: '软件开发者',
    },
    company: {
      en: 'Full-Stack Development',
      zh: '全栈开发',
    },
    startDate: '2020-08',
    endDate: '2021-02',
    description: {
      en: 'Developed full-stack web applications with Vue.js frontends and Spring Boot backends. Worked with MySQL, PostgreSQL, and MongoDB for data persistence across multiple projects.',
      zh: '使用 Vue.js 前端和 Spring Boot 后端开发全栈 Web 应用。在多个项目中使用 MySQL、PostgreSQL 和 MongoDB 进行数据持久化。',
    },
  },
];

export const educations: Education[] = [
  {
    id: 'edu-1',
    school: {
      en: 'Nanchang University',
      zh: '南昌大学',
    },
    degree: {
      en: 'B.E. Software Engineering',
      zh: '软件工程学士',
    },
    date: {
      en: '2018 \u2014 2022',
      zh: '2018 \u2014 2022',
    },
  },
];
