import type { PortfolioData } from '../types/database'

/**
 * Static fallback content generated from Vivek Ranjan's resume.
 * Used when Supabase is not configured or unreachable, so the site
 * always renders. The SQL seed file mirrors this data — once Supabase
 * is live, the database becomes the source of truth.
 */
export const fallbackData: PortfolioData = {
  profile: {
    id: 'local',
    full_name: 'Vivek Ranjan',
    headline: 'AI & Data Engineer',
    short_tagline:
      'Engineering scalable data platforms and production-grade GenAI systems — 4+ years across healthcare, pharma, and supply chain.',
    location: 'Cork, Ireland',
    email: 'hello@mydomain.com',
    linkedin_url: 'https://linkedin.com/in/my-profile',
    github_url: 'https://github.com/my-profile',
    resume_url: '/Vivek_Ranjan_Resume.pdf',
    about_text:
      'I am a software developer with 4+ years of experience in Python, Generative AI, and Data Engineering, with deep domain expertise in pharmaceuticals and supply chain. At Eli Lilly, I built and scaled healthcare reporting pipelines processing 10M+ patient records across 150+ tables on AWS (S3, Glue, Redshift), cutting manual operations by 40%, and engineered a production RAG pipeline with LangChain and Pinecone that improved retrieval accuracy by 25%. I work across the full data and AI stack — Python, SQL, PySpark, Airflow, Snowflake, Redshift — and bring insights to life with Tableau and Power BI. Currently pursuing a Master of Engineering in Artificial Intelligence and Computer Vision at the University of Limerick, I am authorized to work in Ireland and open to AI Engineer and Data Engineer opportunities.',
  },

  skills: [
    // Data Engineering
    { id: 's1', category: 'Data Engineering', name: 'PySpark', icon_name: 'spark', proficiency_level: 90, display_order: 1, is_featured: true },
    { id: 's2', category: 'Data Engineering', name: 'Airflow', icon_name: 'airflow', proficiency_level: 85, display_order: 2, is_featured: true },
    { id: 's3', category: 'Data Engineering', name: 'Kafka', icon_name: 'kafka', proficiency_level: 75, display_order: 3, is_featured: false },
    { id: 's4', category: 'Data Engineering', name: 'ETL / ELT Pipelines', icon_name: 'pipeline', proficiency_level: 92, display_order: 4, is_featured: true },
    { id: 's5', category: 'Data Engineering', name: 'Data Warehousing', icon_name: 'warehouse', proficiency_level: 88, display_order: 5, is_featured: false },
    // Cloud & DevOps
    { id: 's6', category: 'Cloud & DevOps', name: 'AWS (S3, Lambda, Glue, Redshift, Athena)', icon_name: 'aws', proficiency_level: 90, display_order: 1, is_featured: true },
    { id: 's7', category: 'Cloud & DevOps', name: 'Docker', icon_name: 'docker', proficiency_level: 80, display_order: 2, is_featured: false },
    { id: 's8', category: 'Cloud & DevOps', name: 'Kubernetes', icon_name: 'kubernetes', proficiency_level: 70, display_order: 3, is_featured: false },
    { id: 's9', category: 'Cloud & DevOps', name: 'GitHub Actions (CI/CD)', icon_name: 'github', proficiency_level: 88, display_order: 4, is_featured: true },
    // AI / ML
    { id: 's10', category: 'AI / ML', name: 'LangChain & LangGraph', icon_name: 'chain', proficiency_level: 90, display_order: 1, is_featured: true },
    { id: 's11', category: 'AI / ML', name: 'RAG Systems', icon_name: 'rag', proficiency_level: 92, display_order: 2, is_featured: true },
    { id: 's12', category: 'AI / ML', name: 'OpenAI API', icon_name: 'openai', proficiency_level: 88, display_order: 3, is_featured: false },
    { id: 's13', category: 'AI / ML', name: 'Pinecone & FAISS', icon_name: 'vector', proficiency_level: 85, display_order: 4, is_featured: false },
    { id: 's14', category: 'AI / ML', name: 'PyTorch', icon_name: 'pytorch', proficiency_level: 75, display_order: 5, is_featured: false },
    { id: 's15', category: 'AI / ML', name: 'MCP (Model Context Protocol)', icon_name: 'mcp', proficiency_level: 78, display_order: 6, is_featured: false },
    // BI & Analytics
    { id: 's16', category: 'BI & Analytics', name: 'Tableau', icon_name: 'tableau', proficiency_level: 82, display_order: 1, is_featured: false },
    { id: 's17', category: 'BI & Analytics', name: 'Power BI', icon_name: 'powerbi', proficiency_level: 82, display_order: 2, is_featured: false },
    { id: 's18', category: 'BI & Analytics', name: 'Pandas & NumPy', icon_name: 'pandas', proficiency_level: 90, display_order: 3, is_featured: true },
    { id: 's19', category: 'BI & Analytics', name: 'Streamlit', icon_name: 'streamlit', proficiency_level: 85, display_order: 4, is_featured: false },
    // Programming
    { id: 's20', category: 'Programming', name: 'Python', icon_name: 'python', proficiency_level: 95, display_order: 1, is_featured: true },
    { id: 's21', category: 'Programming', name: 'SQL', icon_name: 'sql', proficiency_level: 93, display_order: 2, is_featured: true },
    { id: 's22', category: 'Programming', name: 'JavaScript', icon_name: 'javascript', proficiency_level: 72, display_order: 3, is_featured: false },
    { id: 's23', category: 'Programming', name: 'FastAPI', icon_name: 'fastapi', proficiency_level: 82, display_order: 4, is_featured: false },
    // Databases
    { id: 's24', category: 'Databases', name: 'Amazon Redshift', icon_name: 'redshift', proficiency_level: 90, display_order: 1, is_featured: true },
    { id: 's25', category: 'Databases', name: 'Snowflake', icon_name: 'snowflake', proficiency_level: 85, display_order: 2, is_featured: true },
    { id: 's26', category: 'Databases', name: 'PostgreSQL', icon_name: 'postgres', proficiency_level: 80, display_order: 3, is_featured: false },
    // Tools
    { id: 's27', category: 'Tools', name: 'Git & GitHub', icon_name: 'git', proficiency_level: 92, display_order: 1, is_featured: false },
    { id: 's28', category: 'Tools', name: 'JIRA', icon_name: 'jira', proficiency_level: 85, display_order: 2, is_featured: false },
    { id: 's29', category: 'Tools', name: 'Postman', icon_name: 'postman', proficiency_level: 85, display_order: 3, is_featured: false },
  ],

  projects: [
    {
      id: 'p1',
      title: 'Healthcare Data Pipeline Platform',
      slug: 'healthcare-data-pipeline-platform',
      short_description:
        'Enterprise reporting pipelines for Zepbound (Lilly Health) and Diabetes (Tempo) connected-medicine programs.',
      long_description:
        'Built and scaled production reporting pipelines processing 10M+ patient records across 150+ tables on AWS using S3, Glue, and Redshift. A config-driven Python framework with GitHub Actions CI/CD automates builds, daily updates, and auditing of warehouse transactional tables.',
      tech_stack: ['Python', 'AWS S3', 'AWS Glue', 'Amazon Redshift', 'GitHub Actions', 'SQL'],
      impact_metrics: ['10M+ patient records processed', '150+ warehouse tables', '40% reduction in manual operations'],
      image_url: null,
      github_url: 'https://github.com/my-profile',
      live_url: null,
      display_order: 1,
      is_featured: true,
    },
    {
      id: 'p2',
      title: 'Enterprise RAG Pipeline',
      slug: 'enterprise-rag-pipeline',
      short_description:
        'Production retrieval-augmented generation system with hybrid retrieval and reranking for enterprise knowledge workflows.',
      long_description:
        'Engineered a production RAG pipeline using LangChain and Pinecone featuring hybrid retrieval (dense + sparse) and reranking, improving retrieval accuracy by 25% over a baseline BM25 implementation in enterprise-facing workflows.',
      tech_stack: ['LangChain', 'Pinecone', 'Python', 'OpenAI API', 'FAISS'],
      impact_metrics: ['25% retrieval accuracy improvement vs BM25', 'Hybrid retrieval + reranking in production'],
      image_url: null,
      github_url: 'https://github.com/my-profile',
      live_url: null,
      display_order: 2,
      is_featured: true,
    },
    {
      id: 'p3',
      title: 'AI Guardrails Framework',
      slug: 'ai-guardrails-framework',
      short_description:
        'Layered safety system for enterprise LLM applications — validation, topic classification, and PII detection.',
      long_description:
        'Designed and deployed 10+ AI guardrail layers including input/output validation, topic classification, and PII detection, reducing out-of-policy LLM responses by 95% in enterprise-facing workflows.',
      tech_stack: ['Python', 'LangChain', 'OpenAI API', 'NLP'],
      impact_metrics: ['10+ guardrail layers in production', '95% reduction in out-of-policy LLM responses'],
      image_url: null,
      github_url: 'https://github.com/my-profile',
      live_url: null,
      display_order: 3,
      is_featured: true,
    },
    {
      id: 'p4',
      title: 'Cloud ETL Automation & Validation',
      slug: 'cloud-etl-automation',
      short_description:
        'Automated data validation module and orchestrated ETL workflows for manufacturing and distribution analytics.',
      long_description:
        'Developed an automated data validation module and orchestrated ETL workflows using AWS Glue and Airflow, improving data freshness, reliability, and reporting confidence across warehouse and supply-chain operations.',
      tech_stack: ['AWS Glue', 'Airflow', 'Python', 'SQL'],
      impact_metrics: ['Improved data freshness and reliability', 'Automated validation across ETL workflows'],
      image_url: null,
      github_url: 'https://github.com/my-profile',
      live_url: null,
      display_order: 4,
      is_featured: false,
    },
    {
      id: 'p5',
      title: 'Supply Chain BI Modernization',
      slug: 'supply-chain-bi-modernization',
      short_description:
        'Modernized the reporting estate for El Paso and Denver warehouse and supply-chain operations.',
      long_description:
        'Modernized 20+ warehouse and supply-chain reports using Python and SQL, improving reporting efficiency by approximately 20% and giving operations teams faster, more reliable insight.',
      tech_stack: ['Python', 'SQL', 'Tableau', 'Power BI'],
      impact_metrics: ['20+ reports modernized', '~20% reporting efficiency gain'],
      image_url: null,
      github_url: 'https://github.com/my-profile',
      live_url: null,
      display_order: 5,
      is_featured: false,
    },
    {
      id: 'p6',
      title: 'Snowflake Analytics Warehouse',
      slug: 'snowflake-analytics-warehouse',
      short_description:
        'Star-schema warehouse modeling powering scalable BI and analytics use cases.',
      long_description:
        'Modeled star-schema fact and dimension tables in Snowflake to support scalable BI and analytics, applying SQL, PySpark, and data-warehousing best practices, with rigorous production code review for quality and maintainability.',
      tech_stack: ['Snowflake', 'SQL', 'PySpark', 'Data Modeling'],
      impact_metrics: ['Star-schema models powering BI at scale'],
      image_url: null,
      github_url: 'https://github.com/my-profile',
      live_url: null,
      display_order: 6,
      is_featured: false,
    },
  ],

  experience: [
    {
      id: 'e1',
      company_name: 'Eli Lilly and Company',
      role_title: 'Associate Consultant — Connected Medicine',
      location: 'Bengaluru, India',
      start_date: '2023-11-01',
      end_date: '2025-08-31',
      is_current: false,
      description:
        'Healthcare data platforms and Generative AI for connected-medicine programs (Zepbound / Lilly Health, Diabetes / Tempo).',
      achievements: [
        'Built and scaled reporting pipelines processing 10M+ patient records across 150+ tables on AWS (S3, Glue, Redshift), reducing manual operations by 40%',
        'Created a reliable CI/CD pipeline with GitHub Actions and a config-driven Python framework, automating builds, daily updates, and auditing of warehouse transactional tables',
        'Led developers across vendor and cross-functional stakeholders — translating business requirements into technical specs, overseeing development, performing UAT, and communicating delivery outcomes',
        'Engineered a production RAG pipeline using LangChain and Pinecone with hybrid retrieval and reranking, improving retrieval accuracy by 25% over a BM25 baseline',
        'Designed and deployed 10+ AI guardrail layers (input/output validation, topic classification, PII detection), reducing out-of-policy LLM responses by 95%',
      ],
      tech_stack: ['Python', 'AWS', 'Redshift', 'Glue', 'LangChain', 'Pinecone', 'GitHub Actions'],
      display_order: 1,
    },
    {
      id: 'e2',
      company_name: 'Dish Network Technologies (EchoStar Corporation)',
      role_title: 'Engineer I — Manufacturing & Distribution',
      location: 'Bengaluru, India',
      start_date: '2022-09-01',
      end_date: '2023-10-31',
      is_current: false,
      description: 'Data engineering for manufacturing, warehouse, and supply-chain analytics.',
      achievements: [
        'Developed an automated data validation module and orchestrated ETL workflows using AWS Glue and Airflow, improving data freshness, reliability, and reporting confidence',
        'Modernized 20+ warehouse and supply-chain reports for El Paso and Denver operations using Python and SQL, improving reporting efficiency by approximately 20%',
      ],
      tech_stack: ['Python', 'SQL', 'AWS Glue', 'Airflow'],
      display_order: 2,
    },
    {
      id: 'e3',
      company_name: 'Cognizant Technology Solutions',
      role_title: 'Programmer Analyst — Data Engineering',
      location: 'Remote',
      start_date: '2021-08-01',
      end_date: '2022-09-30',
      is_current: false,
      description: 'Data warehousing and analytics engineering on Snowflake.',
      achievements: [
        'Modeled star-schema fact and dimension tables to support scalable BI and analytics use cases, applying SQL, PySpark, and data-warehousing best practices in Snowflake',
        'Reviewed production-ready code for correctness, maintainability, and reliability, surfacing quality issues and improvement opportunities for the engineering team',
      ],
      tech_stack: ['Snowflake', 'SQL', 'PySpark'],
      display_order: 3,
    },
  ],

  education: [
    {
      id: 'ed1',
      institution: 'University of Limerick',
      degree: 'Master of Engineering',
      field: 'Artificial Intelligence and Computer Vision',
      location: 'Limerick, Ireland',
      start_year: 2025,
      end_year: 2026,
      description: 'Current GPA: 3.52 / 4.0 (First Class Honours track)',
      display_order: 1,
    },
    {
      id: 'ed2',
      institution: 'Panjab University',
      degree: 'Bachelor of Engineering',
      field: 'Computer Science and Engineering',
      location: 'Chandigarh, India',
      start_year: 2017,
      end_year: 2021,
      description: 'Graduated with First Class Honours (1:1)',
      display_order: 2,
    },
  ],

  achievements: [
    {
      id: 'a1',
      title: 'Lilly Rise Award — Q1 2024',
      description: 'Recognized for teamwork and innovation in data infrastructure.',
      issuer: 'Eli Lilly and Company',
      achievement_date: '2024-03-01',
      display_order: 1,
    },
    {
      id: 'a2',
      title: 'Lilly Rise Award — Q4 2024',
      description: 'Recognized for exceptional productivity and delivery.',
      issuer: 'Eli Lilly and Company',
      achievement_date: '2024-12-01',
      display_order: 2,
    },
  ],

  certifications: [],
}

export const SKILL_CATEGORIES = [
  'Data Engineering',
  'Cloud & DevOps',
  'AI / ML',
  'BI & Analytics',
  'Programming',
  'Databases',
  'Tools',
] as const
