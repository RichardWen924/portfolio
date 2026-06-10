import type { Service } from './types';

export const services: Service[] = [
  {
    id: 'svc-1',
    title: {
      en: 'Backend Development',
      zh: '后端开发',
    },
    description: {
      en: 'Building robust microservice architectures with Spring Boot, Spring Cloud, Spring Cloud Alibaba, Spring Cloud Gateway, OpenFeign, MyBatis-Plus, and RESTful APIs.',
      zh: '使用 Spring Boot、Spring Cloud、Spring Cloud Alibaba、Spring Cloud Gateway、OpenFeign、MyBatis-Plus 构建健壮的微服务架构和 RESTful API。',
    },
    tags: ['Spring Boot', 'Spring Cloud', 'Spring Cloud Alibaba', 'Spring Cloud Gateway', 'OpenFeign', 'MyBatis-Plus', 'RESTful API'],
  },
  {
    id: 'svc-2',
    title: {
      en: 'Service Governance',
      zh: '服务治理',
    },
    description: {
      en: 'Microservice discovery, configuration management, and traffic control with Nacos. Service splitting, unified gateway, load balancing, and inter-service communication.',
      zh: '基于 Nacos 注册中心与配置中心实现服务发现与配置管理。微服务拆分、统一网关、负载均衡、服务间调用。',
    },
    tags: ['Nacos', '服务注册', '配置中心', '微服务拆分', '统一网关', '负载均衡', '服务间调用'],
  },
  {
    id: 'svc-3',
    title: {
      en: 'High Concurrency & Middleware',
      zh: '高并发与中间件',
    },
    description: {
      en: 'Handling high-throughput scenarios with Redis, RabbitMQ, async message queues, distributed locks, idempotent APIs, and peak-shaving strategies.',
      zh: '使用 Redis、RabbitMQ、异步消息队列、分布式锁、接口幂等、削峰填谷应对高并发场景。',
    },
    tags: ['Redis', 'RabbitMQ', '异步消息队列', '分布式锁', '接口幂等', '削峰填谷'],
  },
  {
    id: 'svc-4',
    title: {
      en: 'Database & Search',
      zh: '数据库与搜索',
    },
    description: {
      en: 'Data modeling and query optimization across MySQL, PostgreSQL, and Elasticsearch for full-text search and analytics.',
      zh: '跨 MySQL、PostgreSQL 和 Elasticsearch 进行数据建模、查询优化，实现全文搜索与分析。',
    },
    tags: ['MySQL', 'Elasticsearch', 'PostgreSQL'],
  },
  {
    id: 'svc-5',
    title: {
      en: 'AI Agent / RAG',
      zh: 'AI Agent / RAG',
    },
    description: {
      en: 'Building AI-powered Agent systems with FastAPI, LangGraph, LangChain, Qdrant, RAG pipelines, Embedding, Function Calling, and Tool Calling.',
      zh: '使用 FastAPI、LangGraph、LangChain、Qdrant、RAG、Embedding、Function Calling、Tool Calling 构建 AI 驱动的 Agent 系统。',
    },
    tags: ['FastAPI', 'LangGraph', 'LangChain', 'Qdrant', 'RAG', 'Embedding', 'Function Calling', 'Tool Calling'],
  },
  {
    id: 'svc-6',
    title: {
      en: 'Engineering & Deployment',
      zh: '工程化与部署',
    },
    description: {
      en: 'Streamlined development workflow with Maven, Kibana monitoring, Git version control, and API testing with Postman.',
      zh: '使用 Maven、Kibana 监控、Git 版本控制和 Postman API 测试构建高效的开发工作流。',
    },
    tags: ['Maven', 'Kibana', 'Git', 'Postman'],
  },
  {
    id: 'svc-7',
    title: {
      en: 'Frontend Development',
      zh: '前端技术',
    },
    description: {
      en: 'Building modern web interfaces with Vue 3, Vite, and JavaScript, leveraging AI-assisted development workflows.',
      zh: '使用 Vue 3、Vite、JavaScript 构建现代 Web 界面，借助 AI 辅助开发提升效率。',
    },
    tags: ['Vue 3', 'Vite', 'JavaScript', 'AI 辅助开发'],
  },
  {
    id: 'svc-8',
    title: {
      en: 'AI Tools',
      zh: 'AI 工具',
    },
    description: {
      en: 'Accelerating development with AI-powered coding tools including Codex and Claude Code for faster iteration and higher code quality.',
      zh: '使用 Codex、Claude Code 等 AI 编码工具加速开发迭代，提升代码质量。',
    },
    tags: ['Codex', 'Claude Code'],
  },
];
