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
    longDescription: {
      en: 'Designed and built a comprehensive platform that enables enterprises to rapidly develop, test, and deploy LLM-powered autonomous agents. The system integrates with existing microservice architectures through a plugin-based adapter layer, supporting multiple LLM providers including OpenAI, Ollama, and custom fine-tuned models.\n\nThe platform features a visual agent builder, real-time monitoring dashboards, and robust evaluation pipelines. Built with scalability in mind, it handles concurrent agent executions across distributed nodes with Kafka-based event streaming and Redis-powered state management.',
      zh: '设计并构建了一个综合平台，使企业能够快速开发、测试和部署 LLM 驱动的自主 Agent。系统通过插件式适配器层与现有微服务架构集成，支持 OpenAI、Ollama 和自定义微调模型等多种 LLM 提供商。\n\n平台具备可视化 Agent 构建器、实时监控仪表板和强大的评估管道。以可扩展性为核心设计，通过 Kafka 事件流和 Redis 状态管理，支持跨分布式节点的并发 Agent 执行。',
    },
    role: {
      en: 'Backend Developer',
      zh: '后端开发',
    },
    client: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    attribution: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    tags: ['Java', 'Spring Boot', 'LLM', 'Kafka'],
    highlights: {
      en: ['Multi-provider LLM adapter with plugin architecture', 'Visual agent builder with drag-and-drop workflow', 'Real-time monitoring with Kafka event streaming', 'Redis-powered distributed state management'],
      zh: ['插件式多 LLM 提供商适配器', '可视化拖拽 Agent 构建器', 'Kafka 事件流实时监控', 'Redis 分布式状态管理'],
    },
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
    longDescription: {
      en: 'Built a high-performance API gateway from the ground up, handling over 10,000 requests per second with sub-millisecond latency. The gateway implements dynamic route configuration, pluggable authentication middleware, and adaptive rate limiting based on real-time traffic patterns.\n\nKey architectural decisions include a non-blocking I/O model using Netty, Redis-backed distributed rate limiting, and a circuit breaker implementation that gracefully degrades during downstream failures. Comprehensive monitoring is provided through Kibana dashboards and custom metrics exporters.',
      zh: '从零构建了一个高性能 API 网关，每秒处理超过 10,000 个请求，延迟低于毫秒级。网关实现了动态路由配置、可插拔认证中间件以及基于实时流量模式的自适应限流。\n\n关键架构决策包括使用 Netty 的非阻塞 I/O 模型、Redis 支持的分布式限流，以及在下游故障时优雅降级的熔断器实现。通过 Kibana 仪表板和自定义指标导出器提供全面监控。',
    },
    role: {
      en: 'Backend Developer',
      zh: '后端开发',
    },
    client: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    attribution: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    tags: ['Spring Cloud', 'Redis', 'Docker', 'Nginx'],
    highlights: {
      en: ['Non-blocking I/O with Netty for 10K+ RPS', 'Dynamic route configuration and hot reload', 'Adaptive rate limiting based on traffic patterns', 'Circuit breaker with graceful degradation'],
      zh: ['Netty 非阻塞 I/O 支持万级 QPS', '动态路由配置与热加载', '基于流量模式的自适应限流', '熔断器优雅降级'],
    },
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
    longDescription: {
      en: 'Architected a real-time data ingestion and processing pipeline capable of handling millions of events daily across multiple data sources. The system ensures exactly-once processing semantics through careful offset management and idempotent write operations.\n\nThe pipeline ingests data from Kafka topics, applies transformation and enrichment logic via a configurable processor chain, and sinks to PostgreSQL for analytics and MongoDB for operational queries. Fault tolerance is achieved through checkpoint-based recovery and dead-letter queues for unprocessable events.',
      zh: '设计了一个实时数据摄取和处理管道，能够每日处理来自多个数据源的数百万事件。系统通过精细的偏移量管理和幂等写入操作确保障精确一次处理语义。\n\n管道从 Kafka 主题摄取数据，通过可配置的处理器链应用转换和增强逻辑，并汇入 PostgreSQL 进行分析查询和 MongoDB 进行运营查询。通过基于检查点的恢复和不可处理事件的死信队列实现容错。',
    },
    role: {
      en: 'Data Engineer',
      zh: '数据工程',
    },
    client: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    attribution: {
      en: 'Personal Project',
      zh: '个人项目',
    },
    tags: ['Kafka', 'PostgreSQL', 'MongoDB', 'Python'],
    highlights: {
      en: ['Exactly-once processing with idempotent writes', 'Multi-source ingestion from Kafka topics', 'Configurable transformation processor chain', 'Fault-tolerant with checkpoint recovery and DLQ'],
      zh: ['幂等写入精确一次处理语义', '多数据源 Kafka 主题摄取', '可配置转换处理器链', '检查点恢复与死信队列容错'],
    },
    href: 'https://github.com/RichardWen924',
  },
];
