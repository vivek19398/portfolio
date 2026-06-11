-- 004_seed_initial_data.sql
-- Seed data generated from Vivek Ranjan's resume (source of truth).
-- Replace placeholder domain/email/social URLs after connecting your domain.

-- ── Profile ──────────────────────────────────────────────────────────────
insert into public.profile
  (full_name, headline, short_tagline, location, email, linkedin_url, github_url, resume_url, about_text)
values (
  'Vivek Ranjan',
  'AI & Data Engineer',
  'Engineering scalable data platforms and production-grade GenAI systems — 4+ years across healthcare, pharma, and supply chain.',
  'Cork, Ireland',
  'hello@mydomain.com',
  'https://linkedin.com/in/my-profile',
  'https://github.com/my-profile',
  '/Vivek_Ranjan_Resume.pdf',
  'I am a software developer with 4+ years of experience in Python, Generative AI, and Data Engineering, with deep domain expertise in pharmaceuticals and supply chain. At Eli Lilly, I built and scaled healthcare reporting pipelines processing 10M+ patient records across 150+ tables on AWS (S3, Glue, Redshift), cutting manual operations by 40%, and engineered a production RAG pipeline with LangChain and Pinecone that improved retrieval accuracy by 25%. I work across the full data and AI stack — Python, SQL, PySpark, Airflow, Snowflake, Redshift — and bring insights to life with Tableau and Power BI. Currently pursuing a Master of Engineering in Artificial Intelligence and Computer Vision at the University of Limerick, I am authorized to work in Ireland and open to AI Engineer and Data Engineer opportunities.'
);

-- ── Skills ───────────────────────────────────────────────────────────────
insert into public.skills (category, name, icon_name, proficiency_level, display_order, is_featured) values
  ('Data Engineering', 'PySpark', 'spark', 90, 1, true),
  ('Data Engineering', 'Airflow', 'airflow', 85, 2, true),
  ('Data Engineering', 'Kafka', 'kafka', 75, 3, false),
  ('Data Engineering', 'ETL / ELT Pipelines', 'pipeline', 92, 4, true),
  ('Data Engineering', 'Data Warehousing', 'warehouse', 88, 5, false),
  ('Cloud & DevOps', 'AWS (S3, Lambda, Glue, Redshift, Athena)', 'aws', 90, 1, true),
  ('Cloud & DevOps', 'Docker', 'docker', 80, 2, false),
  ('Cloud & DevOps', 'Kubernetes', 'kubernetes', 70, 3, false),
  ('Cloud & DevOps', 'GitHub Actions (CI/CD)', 'github', 88, 4, true),
  ('AI / ML', 'LangChain & LangGraph', 'chain', 90, 1, true),
  ('AI / ML', 'RAG Systems', 'rag', 92, 2, true),
  ('AI / ML', 'OpenAI API', 'openai', 88, 3, false),
  ('AI / ML', 'Pinecone & FAISS', 'vector', 85, 4, false),
  ('AI / ML', 'PyTorch', 'pytorch', 75, 5, false),
  ('AI / ML', 'MCP (Model Context Protocol)', 'mcp', 78, 6, false),
  ('BI & Analytics', 'Tableau', 'tableau', 82, 1, false),
  ('BI & Analytics', 'Power BI', 'powerbi', 82, 2, false),
  ('BI & Analytics', 'Pandas & NumPy', 'pandas', 90, 3, true),
  ('BI & Analytics', 'Streamlit', 'streamlit', 85, 4, false),
  ('Programming', 'Python', 'python', 95, 1, true),
  ('Programming', 'SQL', 'sql', 93, 2, true),
  ('Programming', 'JavaScript', 'javascript', 72, 3, false),
  ('Programming', 'FastAPI', 'fastapi', 82, 4, false),
  ('Databases', 'Amazon Redshift', 'redshift', 90, 1, true),
  ('Databases', 'Snowflake', 'snowflake', 85, 2, true),
  ('Databases', 'PostgreSQL', 'postgres', 80, 3, false),
  ('Tools', 'Git & GitHub', 'git', 92, 1, false),
  ('Tools', 'JIRA', 'jira', 85, 2, false),
  ('Tools', 'Postman', 'postman', 85, 3, false);

-- ── Projects (derived from real resume work) ─────────────────────────────
insert into public.projects
  (title, slug, short_description, long_description, tech_stack, impact_metrics, github_url, display_order, is_featured)
values
  (
    'Healthcare Data Pipeline Platform',
    'healthcare-data-pipeline-platform',
    'Enterprise reporting pipelines for Zepbound (Lilly Health) and Diabetes (Tempo) connected-medicine programs.',
    'Built and scaled production reporting pipelines processing 10M+ patient records across 150+ tables on AWS using S3, Glue, and Redshift. A config-driven Python framework with GitHub Actions CI/CD automates builds, daily updates, and auditing of warehouse transactional tables.',
    array['Python','AWS S3','AWS Glue','Amazon Redshift','GitHub Actions','SQL'],
    array['10M+ patient records processed','150+ warehouse tables','40% reduction in manual operations'],
    'https://github.com/my-profile', 1, true
  ),
  (
    'Enterprise RAG Pipeline',
    'enterprise-rag-pipeline',
    'Production retrieval-augmented generation system with hybrid retrieval and reranking for enterprise knowledge workflows.',
    'Engineered a production RAG pipeline using LangChain and Pinecone featuring hybrid retrieval (dense + sparse) and reranking, improving retrieval accuracy by 25% over a baseline BM25 implementation in enterprise-facing workflows.',
    array['LangChain','Pinecone','Python','OpenAI API','FAISS'],
    array['25% retrieval accuracy improvement vs BM25','Hybrid retrieval + reranking in production'],
    'https://github.com/my-profile', 2, true
  ),
  (
    'AI Guardrails Framework',
    'ai-guardrails-framework',
    'Layered safety system for enterprise LLM applications — validation, topic classification, and PII detection.',
    'Designed and deployed 10+ AI guardrail layers including input/output validation, topic classification, and PII detection, reducing out-of-policy LLM responses by 95% in enterprise-facing workflows.',
    array['Python','LangChain','OpenAI API','NLP'],
    array['10+ guardrail layers in production','95% reduction in out-of-policy LLM responses'],
    'https://github.com/my-profile', 3, true
  ),
  (
    'Cloud ETL Automation & Validation',
    'cloud-etl-automation',
    'Automated data validation module and orchestrated ETL workflows for manufacturing and distribution analytics.',
    'Developed an automated data validation module and orchestrated ETL workflows using AWS Glue and Airflow, improving data freshness, reliability, and reporting confidence across warehouse and supply-chain operations.',
    array['AWS Glue','Airflow','Python','SQL'],
    array['Improved data freshness and reliability','Automated validation across ETL workflows'],
    'https://github.com/my-profile', 4, false
  ),
  (
    'Supply Chain BI Modernization',
    'supply-chain-bi-modernization',
    'Modernized the reporting estate for El Paso and Denver warehouse and supply-chain operations.',
    'Modernized 20+ warehouse and supply-chain reports using Python and SQL, improving reporting efficiency by approximately 20% and giving operations teams faster, more reliable insight.',
    array['Python','SQL','Tableau','Power BI'],
    array['20+ reports modernized','~20% reporting efficiency gain'],
    'https://github.com/my-profile', 5, false
  ),
  (
    'Snowflake Analytics Warehouse',
    'snowflake-analytics-warehouse',
    'Star-schema warehouse modeling powering scalable BI and analytics use cases.',
    'Modeled star-schema fact and dimension tables in Snowflake to support scalable BI and analytics, applying SQL, PySpark, and data-warehousing best practices, with rigorous production code review for quality and maintainability.',
    array['Snowflake','SQL','PySpark','Data Modeling'],
    array['Star-schema models powering BI at scale'],
    'https://github.com/my-profile', 6, false
  );

-- ── Experience ───────────────────────────────────────────────────────────
insert into public.experience
  (company_name, role_title, location, start_date, end_date, is_current, description, achievements, tech_stack, display_order)
values
  (
    'Eli Lilly and Company',
    'Associate Consultant — Connected Medicine',
    'Bengaluru, India',
    '2023-11-01', '2025-08-31', false,
    'Healthcare data platforms and Generative AI for connected-medicine programs (Zepbound / Lilly Health, Diabetes / Tempo).',
    array[
      'Built and scaled reporting pipelines processing 10M+ patient records across 150+ tables on AWS (S3, Glue, Redshift), reducing manual operations by 40%',
      'Created a reliable CI/CD pipeline with GitHub Actions and a config-driven Python framework, automating builds, daily updates, and auditing of warehouse transactional tables',
      'Led developers across vendor and cross-functional stakeholders — translating business requirements into technical specs, overseeing development, performing UAT, and communicating delivery outcomes',
      'Engineered a production RAG pipeline using LangChain and Pinecone with hybrid retrieval and reranking, improving retrieval accuracy by 25% over a BM25 baseline',
      'Designed and deployed 10+ AI guardrail layers (input/output validation, topic classification, PII detection), reducing out-of-policy LLM responses by 95%'
    ],
    array['Python','AWS','Redshift','Glue','LangChain','Pinecone','GitHub Actions'],
    1
  ),
  (
    'Dish Network Technologies (EchoStar Corporation)',
    'Engineer I — Manufacturing & Distribution',
    'Bengaluru, India',
    '2022-09-01', '2023-10-31', false,
    'Data engineering for manufacturing, warehouse, and supply-chain analytics.',
    array[
      'Developed an automated data validation module and orchestrated ETL workflows using AWS Glue and Airflow, improving data freshness, reliability, and reporting confidence',
      'Modernized 20+ warehouse and supply-chain reports for El Paso and Denver operations using Python and SQL, improving reporting efficiency by approximately 20%'
    ],
    array['Python','SQL','AWS Glue','Airflow'],
    2
  ),
  (
    'Cognizant Technology Solutions',
    'Programmer Analyst — Data Engineering',
    'Remote',
    '2021-08-01', '2022-09-30', false,
    'Data warehousing and analytics engineering on Snowflake.',
    array[
      'Modeled star-schema fact and dimension tables to support scalable BI and analytics use cases, applying SQL, PySpark, and data-warehousing best practices in Snowflake',
      'Reviewed production-ready code for correctness, maintainability, and reliability, surfacing quality issues and improvement opportunities for the engineering team'
    ],
    array['Snowflake','SQL','PySpark'],
    3
  );

-- ── Education ────────────────────────────────────────────────────────────
insert into public.education
  (institution, degree, field, location, start_year, end_year, description, display_order)
values
  ('University of Limerick', 'Master of Engineering', 'Artificial Intelligence and Computer Vision',
   'Limerick, Ireland', 2025, 2026, 'Current GPA: 3.52 / 4.0 (First Class Honours track)', 1),
  ('Panjab University', 'Bachelor of Engineering', 'Computer Science and Engineering',
   'Chandigarh, India', 2017, 2021, 'Graduated with First Class Honours (1:1)', 2);

-- ── Achievements ─────────────────────────────────────────────────────────
insert into public.achievements (title, description, issuer, achievement_date, display_order) values
  ('Lilly Rise Award — Q1 2024', 'Recognized for teamwork and innovation in data infrastructure.',
   'Eli Lilly and Company', '2024-03-01', 1),
  ('Lilly Rise Award — Q4 2024', 'Recognized for exceptional productivity and delivery.',
   'Eli Lilly and Company', '2024-12-01', 2);

-- Certifications: none listed on the resume — add via /admin when earned.
