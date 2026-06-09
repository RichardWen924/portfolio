import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    category: {
      en: 'Backend & LLM',
      zh: '后端 & LLM',
    },
    title: {
      en: 'LLM Agent Platform',
      zh: 'LLM Agent 平台',
    },
    description: {
      en: 'Enterprise-grade platform for building and deploying LLM-powered agents with seamless integration into existing microservice ecosystems.',
      zh: '企业级 LLM Agent 构建与部署平台，无缝集成现有微服务生态系统。',
    },
    attribution: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    tags: ['Java', 'Spring Boot', 'LLM', 'Kafka'],
    href: 'https://github.com/RichardWen924',
  },
  {
    id: 'proj-2',
    category: {
      en: 'Distributed Systems',
      zh: '分布式系统',
    },
    title: {
      en: 'Microservice Gateway',
      zh: '微服务网关',
    },
    description: {
      en: 'High-performance API gateway with intelligent routing, rate limiting, and circuit breaker patterns for distributed backend systems.',
      zh: '高性能 API 网关，具备智能路由、限流和分布式后端系统的熔断器模式。',
    },
    attribution: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    tags: ['Spring Cloud', 'Redis', 'Docker', 'Nginx'],
    href: 'https://github.com/RichardWen924',
  },
  {
    id: 'proj-3',
    category: {
      en: 'Data Engineering',
      zh: '数据工程',
    },
    title: {
      en: 'Real-time Data Pipeline',
      zh: '实时数据管道',
    },
    description: {
      en: 'Streaming data processing pipeline handling millions of events per day with exactly-once semantics and fault tolerance.',
      zh: '流式数据处理管道，每日处理数百万事件，具备精确一次语义和容错能力。',
    },
    attribution: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    tags: ['Kafka', 'PostgreSQL', 'MongoDB', 'Python'],
    href: 'https://github.com/RichardWen924',
  },
];
