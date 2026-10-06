-- Resume-derived seed for a fresh database. Do not rerun on an existing populated database.

begin;

insert into public.profile (full_name, headline, short_tagline, location, email, linkedin_url, github_url, resume_url, about_text) values
  ('Vivek Ranjan', 'Senior Software Engineer', 'Turning ideas into production-grade applications — approximately 5 years building GenAI systems, agentic workflows, and cloud-native platforms.', 'Dublin, Ireland', 'vivek000@outlook.com', 'https://www.linkedin.com/in/ranjanvivek19', 'https://github.com/vivek19398/', '/Vivek_Ranjan_Resume.pdf', 'Senior Software Engineer with approximately 5 years of experience designing and building production-grade GenAI, Agentic AI, RAG, and cloud-native applications using Python, FastAPI, LangChain, LangGraph, and cloud services. Experienced in scalable LLM-powered APIs, AI guardrails, evaluation frameworks, multimodal AI, and enterprise data platforms. Built and scaled AWS data pipelines processing 10M+ patient records across therapeutic areas, delivering AI-enabled solutions in enterprise pharmaceutical environments. Eligible to work in Ireland without employer sponsorship (Stamp 1G).');

insert into public.skills (category, name, icon_name, proficiency_level, display_order, is_featured) values
  ('Languages & Backend', 'C++', null, 0, 1, false),
  ('Languages & Backend', 'Python', null, 0, 2, false),
  ('Languages & Backend', 'FastAPI', null, 0, 3, false),
  ('Languages & Backend', 'REST APIs', null, 0, 4, false),
  ('Languages & Backend', 'SQL', null, 0, 5, false),
  ('Generative AI & Machine Learning', 'RAG', null, 0, 1, false),
  ('Generative AI & Machine Learning', 'Agentic AI Workflows', null, 0, 2, false),
  ('Generative AI & Machine Learning', 'LangChain', null, 0, 3, false),
  ('Generative AI & Machine Learning', 'LangGraph', null, 0, 4, false),
  ('Generative AI & Machine Learning', 'LangSmith', null, 0, 5, false),
  ('Generative AI & Machine Learning', 'MCP', null, 0, 6, false),
  ('Generative AI & Machine Learning', 'OpenAI API', null, 0, 7, false),
  ('Generative AI & Machine Learning', 'Amazon Bedrock', null, 0, 8, false),
  ('Generative AI & Machine Learning', 'Microsoft Foundry', null, 0, 9, false),
  ('Generative AI & Machine Learning', 'Prompt Engineering', null, 0, 10, false),
  ('Generative AI & Machine Learning', 'Multimodal AI', null, 0, 11, false),
  ('Generative AI & Machine Learning', 'NLP', null, 0, 12, false),
  ('Generative AI & Machine Learning', 'Vector DB', null, 0, 13, false),
  ('Generative AI & Machine Learning', 'Pydantic', null, 0, 14, false),
  ('Generative AI & Machine Learning', 'PyTorch', null, 0, 15, false),
  ('Cloud Platforms', 'AWS Lambda', null, 0, 1, false),
  ('Cloud Platforms', 'AWS Glue', null, 0, 2, false),
  ('Cloud Platforms', 'AWS ECS', null, 0, 3, false),
  ('Cloud Platforms', 'Amazon S3', null, 0, 4, false),
  ('Cloud Platforms', 'AWS IAM', null, 0, 5, false),
  ('Cloud Platforms', 'Amazon VPC', null, 0, 6, false),
  ('Cloud Platforms', 'Amazon Athena', null, 0, 7, false),
  ('Cloud Platforms', 'Amazon Redshift', null, 0, 8, false),
  ('Cloud Platforms', 'Amazon RDS', null, 0, 9, false),
  ('Cloud Platforms', 'Amazon API Gateway', null, 0, 10, false),
  ('Cloud Platforms', 'Amazon SageMaker', null, 0, 11, false),
  ('Cloud Platforms', 'AWS CloudFormation', null, 0, 12, false),
  ('Cloud Platforms', 'Azure Data Factory', null, 0, 13, false),
  ('Cloud Platforms', 'Azure Databricks', null, 0, 14, false),
  ('Data Engineering & Analytics', 'PySpark', null, 0, 1, false),
  ('Data Engineering & Analytics', 'ETL Pipeline Automation', null, 0, 2, false),
  ('Data Engineering & Analytics', 'Snowflake', null, 0, 3, false),
  ('Data Engineering & Analytics', 'Microsoft Fabric', null, 0, 4, false),
  ('Data Engineering & Analytics', 'Microsoft SQL Server', null, 0, 5, false),
  ('Data Engineering & Analytics', 'Apache Airflow', null, 0, 6, false),
  ('Data Engineering & Analytics', 'Apache Kafka', null, 0, 7, false),
  ('Data Engineering & Analytics', 'Delta Lake', null, 0, 8, false),
  ('Data Engineering & Analytics', 'Power BI', null, 0, 9, false),
  ('Data Engineering & Analytics', 'LAAD', null, 0, 10, false),
  ('DevOps & Collaboration', 'Docker', null, 0, 1, false),
  ('DevOps & Collaboration', 'GitHub Actions', null, 0, 2, false),
  ('DevOps & Collaboration', 'Jenkins', null, 0, 3, false),
  ('DevOps & Collaboration', 'CI/CD', null, 0, 4, false),
  ('DevOps & Collaboration', 'Git', null, 0, 5, false);

insert into public.projects (title, slug, short_description, long_description, tech_stack, impact_metrics, image_url, github_url, live_url, display_order, is_featured) values
  ('GraphCore Studio', 'graphcore-studio', 'A local-first visual agent workflow platform with drag-and-drop graphs, conditional routing, agent handoffs, and human approval checkpoints.', 'Built a local-first visual AI workflow studio with drag-and-drop graph editing, conditional routing, agent handoffs, structured-output validation, Python tools, and human approval checkpoints. A native C++17 graph execution engine connects to Python through a C ABI/ctypes bridge, supporting workflow scheduling, state management, and crash-recoverable checkpoints. Integrated OpenRouter models, Pydantic validation, plugin-based Python tools, and a dependency-free browser interface. Published to PyPI with one-command installation: pip install graphcore-studio, using CMake and scikit-build-core for native runtime packaging.', array['C++17','Python','C ABI / ctypes','OpenRouter','Pydantic','CMake','scikit-build-core']::text[], array['Published on PyPI: pip install graphcore-studio','Crash-recoverable workflow checkpoints']::text[], null, 'https://github.com/vivek19398/graphcore-studio', 'https://pypi.org/project/graphcore-studio/', 1, true),
  ('AstraPDF', 'astrapdf', 'A cross-platform Python PDF toolkit and local web studio for working with documents while keeping files on your own machine.', 'Developed a Python PDF toolkit and local browser studio for merging, splitting, extracting, rotating, reordering, annotating, watermarking, cropping, and exporting PDF documents. The privacy-first architecture uses a loopback-only web server and in-memory processing; files remain local and are not transmitted to an online service. Integrated native PDFium rendering, lazy thumbnails, page-image caching, and short-lived in-memory sessions for large-document browsing. Published to PyPI with pip install astrapdf, exposing a Python API through the pdfstudio module and a command-line launcher via astrapdf.', array['Python','PDFium','Loopback web server','In-memory processing','PyPI']::text[], array['Published on PyPI: pip install astrapdf','Local document processing']::text[], null, 'https://github.com/vivek19398/AstraPDF', 'https://pypi.org/project/astrapdf/', 2, true);

insert into public.experience (company_name, role_title, location, start_date, end_date, is_current, description, achievements, tech_stack, display_order) values
  ('Eli Lilly and Company', 'Associate Consultant', 'Bengaluru, India', '2023-11-01', '2025-08-31', false, 'Intelligent analytics, agentic backend services, and enterprise data platforms for pharmaceutical programs.', array['Engineered BioSmartPlatform using LangChain, Python, and AWS for Tempo (Diabetes), Lilly Health (Zepbound and Mounjaro), and Lilly Together (Immunology). Combined RAG over product PDFs with Text-to-SQL queries against Amazon Redshift and RDS, and natural-language access to enterprise sources. Automated data-quality and refresh monitoring, notifications, and Jira request management, saving the analytics team 8+ hours per week.','Built high-concurrency RESTful APIs with FastAPI, Python, and LangGraph for the Consensus system (RedStrike), integrating an LLM agentic framework and AI guardrails for input/output validation, topic classification, and PII detection to address HIPAA/GDPR requirements.','Built and scaled Zepbound (Lilly Health) and Diabetes (Tempo) reporting pipelines processing 10M+ patient records across 150+ tables on AWS S3, Glue, and Redshift, reducing manual operations by 40%.','Integrated SCD Type 1 and Type 2 to enhance data accuracy and introduced monitoring for AWS applications, achieving 99% uptime within 6 months.','Consolidated multiple SQL Data Warehouse tables into a unified flat table and streamlined reconciliation across sources, boosting accuracy and efficiency by 90%.']::text[], array['Python','FastAPI','LangChain','LangGraph','AWS','Amazon Redshift','Amazon RDS','AWS Glue','SQL']::text[], 1),
  ('Dish Network Technologies (EchoStar Corporation)', 'Software Engineer', 'Bengaluru, India', '2022-09-01', '2023-10-31', false, 'Automated ETL, warehouse and supply-chain reporting, and cloud data integration.', array['Built automated ETL workflows using PySpark and AWS Glue, eliminating manual overhead and recovering 40+ engineering hours per month.','Modernized 20+ warehouse and supply-chain reports for El Paso and Denver operations using Python and SQL, improving reporting efficiency by approximately 20%.','Built end-to-end ETL solutions using Azure Data Factory V2, automating extraction, pipeline orchestration, and monitoring through Power BI.','Integrated ServiceNow with data pipelines for failure alerts, reducing support resolution time by 30%.']::text[], array['Python','SQL','PySpark','AWS Glue','Azure Data Factory V2','Power BI','ServiceNow']::text[], 2),
  ('Cognizant Technology Solutions', 'Programmer Analyst', 'Remote', '2021-01-01', '2022-09-30', false, 'Automated warehouse workflows and commercial insurance analytics on Snowflake.', array['Created a reliable CI/CD pipeline using GitHub Actions and a flexible, config-driven Python framework to automate builds, daily updates, and auditing of warehouse transactional tables.','Modelled star-schema fact and dimension tables for a Commercial Insurance dataset, supporting scalable BI and analytics through SQL, PySpark, and data-warehousing practices in Snowflake.']::text[], array['Python','GitHub Actions','SQL','PySpark','Snowflake']::text[], 3);

insert into public.education (institution, degree, field, location, start_year, end_year, description, display_order) values
  ('University of Limerick', 'Master of Engineering', 'Artificial Intelligence', 'Limerick, Ireland', 2025, 2026, 'September 2025 – August 2026. GPA: 3.55/4 (First Class Honours).', 1),
  ('Panjab University, India', 'Bachelor of Engineering', 'Computer Science and Engineering', 'India', 2017, 2021, 'July 2017 – May 2021. GPA: 70%.', 2);

insert into public.achievements (title, description, issuer, achievement_date, display_order) values
  ('Eli Lilly Rise Award — Q1 2024', 'Teamwork and innovation in data infrastructure.', 'Eli Lilly and Company', null, 1),
  ('Eli Lilly Rise Award — Q4 2024', 'Exceptional productivity and delivery.', 'Eli Lilly and Company', null, 2);

insert into public.certifications (title, issuer, issue_date, credential_url, display_order) values
  ('Microsoft Certified: Azure Fundamentals (AZ-900)', 'Microsoft · 2022', null, null, 1),
  ('IBM RAG and Agentic AI', 'Coursera · 2026', null, null, 2);

commit;
