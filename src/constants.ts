import { AITool } from './types';

const CATEGORY_NAMES = [
  'Chat & Assistants', 'Code Generation', 'Developer', 'Image Generation', 'Video Production',
  'Audio & Music', 'Writing & Content', 'Data Analysis', 'Marketing & SEO',
  'Education & Tutoring', 'Design & UI/UX', '3D & Gaming', 'Productivity & Workflow',
  'Finance & Investing', 'HR & Recruiting', 'Research & Science',
  'Social Media Management', 'Personal Growth', 'Travel & Planning'
];

const generateTools = (): AITool[] => {
  const tools: AITool[] = [];
  
  // Real tools mapping for high-quality data
  const realTools: Partial<AITool>[] = [
    // Chat & Assistants
    { name: 'ChatGPT', url: 'https://chat.openai.com', categories: ['Chat & Assistants', 'Writing & Content'], description: 'The industry-leading conversational AI by OpenAI, capable of complex reasoning, creative writing, and coding assistance.', details: { authReq: 'Email, Google, Microsoft, or Apple account.', credits: 'Free tier with GPT-4o mini. Plus at $20/mo for GPT-4o.', specializedInfo: [{ label: 'Model', value: 'GPT-4o' }, { label: 'Context', value: '128k tokens' }] } },
    { name: 'Claude', url: 'https://claude.ai', categories: ['Chat & Assistants', 'Code Generation'], description: 'Anthropic\'s advanced AI known for its nuanced reasoning, large context window, and helpful, honest personality.', details: { authReq: 'Email or Google account.', credits: 'Free usage limits. Pro at $20/mo for higher limits and Claude 3.5 Sonnet.', specializedInfo: [{ label: 'Model', value: 'Claude 3.5 Sonnet' }, { label: 'Context', value: '200k tokens' }] } },
    { name: 'Gemini', url: 'https://gemini.google.com', categories: ['Chat & Assistants', 'Data Analysis'], description: 'Google\'s multimodal AI integrated with Google Workspace, offering real-time information and deep ecosystem integration.', details: { authReq: 'Google account.', credits: 'Free access. Advanced with Google One AI Premium subscription.', specializedInfo: [{ label: 'Model', value: 'Gemini 1.5 Pro' }, { label: 'Context', value: '1M - 2M tokens' }] } },
    { name: 'Perplexity', url: 'https://perplexity.ai', categories: ['Chat & Assistants', 'Research & Science'], description: 'An AI-powered search engine that provides direct answers with cited sources, perfect for deep research and fact-checking.', details: { authReq: 'Email, Google, or Apple account.', credits: 'Free search. Pro at $20/mo for advanced models like Claude 3 and GPT-4.', specializedInfo: [{ label: 'Search', value: 'Real-time Web' }, { label: 'Sources', value: 'Cited' }] } },
    { name: 'DeepSeek', url: 'https://deepseek.com', categories: ['Chat & Assistants', 'Code Generation'], description: 'A powerful open-source model series from China, highly competitive in coding and mathematical reasoning.', details: { authReq: 'Email or Phone.', credits: 'Free chat. Pay-as-you-go API.' } },
    { name: 'Mistral', url: 'https://mistral.ai', categories: ['Chat & Assistants', 'Code Generation'], description: 'European AI leader providing high-performance open-weight models optimized for efficiency and speed.', details: { authReq: 'Email or GitHub.', credits: 'Pay-as-you-go API. Free chat on Le Chat platform.' } },
    { name: 'Character.ai', url: 'https://character.ai', categories: ['Chat & Assistants'], description: 'Create and interact with AI characters with distinct personalities and backstories.', details: { authReq: 'Email or Social login.', credits: 'Free to use. c.ai+ for priority access.' } },
    { name: 'Pi', url: 'https://pi.ai', categories: ['Chat & Assistants'], description: 'A personal AI designed to be supportive, smart, and available anytime.', details: { authReq: 'Phone number or Email.', credits: 'Free personal AI.' } },

    // Developer
    { name: 'Vercel V0', url: 'https://v0.dev', categories: ['Developer', 'Design & UI/UX'], description: 'Generative UI system by Vercel that helps you build React components and full pages from text prompts.', details: { authReq: 'Vercel account.', credits: 'Free tier. Pro for more generations.', specializedInfo: [{ label: 'Framework', value: 'React/Next.js' }, { label: 'Styling', value: 'Tailwind CSS' }] } },
    { name: 'Lovable', url: 'https://lovable.dev', categories: ['Developer', 'Code Generation'], description: 'The GPT Engineer. Build and ship full-stack web applications by just talking to AI.', details: { authReq: 'GitHub or Google.', credits: 'Free trial. Subscription for deployment.', specializedInfo: [{ label: 'Focus', value: 'Full-stack Web' }, { label: 'Speed', value: 'Ultra-fast' }] } },
    { name: 'Bolt.new', url: 'https://bolt.new', categories: ['Developer', 'Code Generation'], description: 'Full-stack web development in the browser. Edit, run, and deploy applications with AI assistance.', details: { authReq: 'GitHub or Google.', credits: 'Free tier available.', specializedInfo: [{ label: 'Environment', value: 'Web Container' }, { label: 'Stack', value: 'Node.js/React' }] } },
    { name: 'Replicate', url: 'https://replicate.com', categories: ['Developer'], description: 'Run and deploy open-source machine learning models with a single line of code.', details: { authReq: 'GitHub account.', credits: 'Pay-as-you-go GPU usage.', specializedInfo: [{ label: 'API', value: 'REST/Python' }, { label: 'Models', value: 'Llama, SDXL, etc.' }] } },
    { name: 'Hugging Face', url: 'https://huggingface.co', categories: ['Developer', 'Research & Science'], description: 'The central hub for machine learning models, datasets, and demo apps (Spaces).', details: { authReq: 'Email or GitHub.', credits: 'Free model hosting. Paid inference endpoints.', specializedInfo: [{ label: 'Community', value: 'Largest ML Hub' }, { label: 'Tools', value: 'Transformers, Diffusers' }] } },
    { name: 'LangChain', url: 'https://langchain.com', categories: ['Developer'], description: 'Framework for developing applications powered by large language models.', details: { authReq: 'None (Library).', credits: 'Open-source framework.', specializedInfo: [{ label: 'Type', value: 'Framework' }, { label: 'Language', value: 'Python/JS' }] } },
    { name: 'Pinecone', url: 'https://pinecone.io', categories: ['Developer', 'Data Analysis'], description: 'Vector database for building high-performance AI applications with long-term memory.', details: { authReq: 'Email or Google.', credits: 'Free tier. Pay-as-you-go.', specializedInfo: [{ label: 'Type', value: 'Vector DB' }, { label: 'Use Case', value: 'RAG/Search' }] } },

    // Code Generation
    { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', categories: ['Code Generation'], description: 'The world\'s most widely used AI developer tool, providing real-time code suggestions directly in your IDE.', details: { authReq: 'GitHub account.', credits: 'Individual at $10/mo. Free for verified students and maintainers of popular OSS.' } },
    { name: 'Cursor', url: 'https://cursor.com', categories: ['Code Generation', 'Productivity & Workflow'], description: 'The AI-native code editor built on VS Code, offering deep codebase indexing and advanced chat/edit features.', details: { authReq: 'Email or GitHub.', credits: 'Free tier. Pro at $20/mo for unlimited Claude 3.5 and GPT-4o usage.' } },
    { name: 'Codeium', url: 'https://codeium.com', categories: ['Code Generation'], description: 'A fast, free-for-individuals AI coding assistant supporting 70+ languages and 40+ IDEs.', details: { authReq: 'Email or GitHub.', credits: 'Free for individuals. Enterprise plans for teams.' } },
    { name: 'Tabnine', url: 'https://tabnine.com', categories: ['Code Generation'], description: 'AI assistant for software developers that provides code completions based on your own coding style.', details: { authReq: 'Email or GitHub.', credits: 'Free basic. Pro at $12/mo.' } },
    { name: 'Sourcegraph Cody', url: 'https://sourcegraph.com/cody', categories: ['Code Generation'], description: 'AI that writes code and answers questions about your entire codebase by indexing your repositories.', details: { authReq: 'Email or GitHub.', credits: 'Free tier. Pro for teams.' } },

    // Image Generation
    { name: 'Midjourney', url: 'https://midjourney.com', categories: ['Image Generation', 'Design & UI/UX'], description: 'The gold standard for artistic AI image generation, known for its incredible aesthetic quality and detail.', details: { authReq: 'Discord or Google account.', credits: 'Subscription based, starting at $10/mo. No free tier.', specializedInfo: [{ label: 'Style', value: 'Artistic/Hyper-real' }, { label: 'Platform', value: 'Discord/Web' }] } },
    { name: 'DALL-E 3', url: 'https://openai.com/dall-e-3', categories: ['Image Generation'], description: 'OpenAI\'s latest image model, excelling at following complex prompts and rendering accurate text within images.', details: { authReq: 'OpenAI account.', credits: 'Included in ChatGPT Plus. API is pay-per-image.', specializedInfo: [{ label: 'Text Rendering', value: 'Excellent' }, { label: 'Integration', value: 'ChatGPT' }] } },
    { name: 'Stable Diffusion', url: 'https://stability.ai', categories: ['Image Generation', '3D & Gaming'], description: 'The leading open-source image generation model, allowing for complete control and local deployment.', details: { authReq: 'None for local. Email for API.', credits: 'Free for local use. API is credit-based.' } },
    { name: 'Ideogram', url: 'https://ideogram.ai', categories: ['Image Generation'], description: 'A specialist in typography and graphic design, producing images with perfectly rendered text.', details: { authReq: 'Google account.', credits: 'Daily free generations. Pro for more.' } },
    { name: 'Leonardo.ai', url: 'https://leonardo.ai', categories: ['Image Generation', 'Design & UI/UX'], description: 'A powerful creative platform for image generation, fine-tuning models, and texture creation.', details: { authReq: 'Email or Social login.', credits: 'Daily free tokens. Premium for more.' } },
    { name: 'Adobe Firefly', url: 'https://firefly.adobe.com', categories: ['Image Generation', 'Design & UI/UX'], description: 'Adobe\'s family of creative generative AI models, integrated into Creative Cloud apps like Photoshop.', details: { authReq: 'Adobe ID.', credits: 'Monthly generative credits included in CC.' } },

    // Video Production
    { name: 'Runway Gen-3', url: 'https://runwayml.com', categories: ['Video Production', 'Design & UI/UX'], description: 'Professional-grade AI video generation and editing tools, including text-to-video and image-to-video.', details: { authReq: 'Email or Google.', credits: 'Credit-based. Subscription for more.' } },
    { name: 'Luma Dream Machine', url: 'https://lumalabs.ai', categories: ['Video Production', '3D & Gaming'], description: 'A high-fidelity video generation model capable of creating realistic 5-second clips from text or images.', details: { authReq: 'Google account.', credits: '30 free generations per month.' } },
    { name: 'Pika Labs', url: 'https://pika.art', categories: ['Video Production'], description: 'An intuitive AI video platform known for its animation quality and camera control features.', details: { authReq: 'Discord or Google.', credits: 'Daily free credits. Pro for more.' } },
    { name: 'HeyGen', url: 'https://heygen.com', categories: ['Video Production', 'Marketing & SEO'], description: 'The leading platform for AI avatars and personalized video messaging at scale.', details: { authReq: 'Email or Google.', credits: '1 free credit to start. Subscription based.' } },
    { name: 'Kling AI', url: 'https://klingai.com', categories: ['Video Production'], description: 'A powerful video generation model capable of creating high-quality, realistic videos up to 2 minutes long.', details: { authReq: 'Phone or Email.', credits: 'Daily free credits.' } },

    // Audio & Music
    { name: 'Suno', url: 'https://suno.com', categories: ['Audio & Music'], description: 'The most advanced AI music generator, capable of creating full songs with vocals and instrumentation.', details: { authReq: 'Discord, Google, or Microsoft.', credits: '50 free credits daily. Pro for more.' } },
    { name: 'Udio', url: 'https://udio.com', categories: ['Audio & Music'], description: 'A powerful music generation tool known for its high-fidelity audio and creative flexibility.', details: { authReq: 'Google or X login.', credits: 'Free beta access. Subscription for more.' } },
    { name: 'ElevenLabs', url: 'https://elevenlabs.io', categories: ['Audio & Music'], description: 'The world\'s most realistic AI voice generator and text-to-speech platform.', details: { authReq: 'Email or Social login.', credits: '10k free characters/mo. Subscription for more.' } },
    { name: 'AIVA', url: 'https://aiva.ai', categories: ['Audio & Music'], description: 'AI music composition assistant for creating soundtracks and background music.', details: { authReq: 'Email or Google.', credits: 'Free for non-commercial. Pro for copyright.' } },

    // Productivity & Workflow
    { name: 'Notion AI', url: 'https://notion.so', categories: ['Productivity & Workflow', 'Writing & Content'], description: 'AI integrated directly into your workspace to help you write, summarize, and organize information.', details: { authReq: 'Notion account.', credits: '$10/mo add-on to Notion.' } },
    { name: 'Otter.ai', url: 'https://otter.ai', categories: ['Productivity & Workflow', 'Education & Tutoring'], description: 'AI-powered meeting assistant that transcribes audio and generates summaries in real-time.', details: { authReq: 'Email or Google.', credits: '300 free mins/mo. Pro for more.' } },
    { name: 'Gamma', url: 'https://gamma.app', categories: ['Productivity & Workflow', 'Design & UI/UX'], description: 'A new medium for presenting ideas, powered by AI to create beautiful presentations and websites.', details: { authReq: 'Email or Google.', credits: 'Free credits to start. Subscription for more.' } },
    { name: 'Fireflies.ai', url: 'https://fireflies.ai', categories: ['Productivity & Workflow'], description: 'AI meeting assistant that records, transcribes, and searches across your voice conversations.', details: { authReq: 'Google or Outlook.', credits: 'Free tier. Pro for more storage/AI.' } },

    // Design & UI/UX
    { name: 'Figma AI', url: 'https://figma.com', categories: ['Design & UI/UX', 'Productivity & Workflow'], description: 'AI features integrated into Figma to automate design tasks and generate UI components.', details: { authReq: 'Figma account.', credits: 'Included in Figma plans.' } },
    { name: 'Canva Magic', url: 'https://canva.com', categories: ['Design & UI/UX', 'Marketing & SEO'], description: 'A suite of AI tools within Canva for image editing, text generation, and layout design.', details: { authReq: 'Canva account.', credits: 'Free tier. Pro for more features.' } },
    { name: 'Framer AI', url: 'https://framer.com', categories: ['Design & UI/UX', 'Developer'], description: 'Generate fully functional websites from a simple text prompt using Framer\'s AI.', details: { authReq: 'Framer account.', credits: 'Free for hobby. Pro for sites.' } },

    // Research & Science
    { name: 'Consensus', url: 'https://consensus.app', categories: ['Research & Science', 'Education & Tutoring'], description: 'An AI search engine that finds answers in peer-reviewed scientific research.', details: { authReq: 'Email or Google.', credits: 'Free search. Premium for summaries.' } },
    { name: 'Elicit', url: 'https://elicit.org', categories: ['Research & Science'], description: 'An AI research assistant that automates literature reviews and data extraction from papers.', details: { authReq: 'Email or Google.', credits: 'Free tier. Pro for more research.' } },
    { name: 'Scite', url: 'https://scite.ai', categories: ['Research & Science'], description: 'Smart citations that help you see how a scientific paper has been cited by others.', details: { authReq: 'Email or Google.', credits: 'Free trial. Subscription based.' } },

    // Data Analysis
    { name: 'Tableau AI', url: 'https://tableau.com', categories: ['Data Analysis'], description: 'Next-generation analytics powered by AI to help you understand your data faster.', details: { authReq: 'Salesforce/Tableau account.', credits: 'Included in Tableau Pulse.' } },
    { name: 'Akkio', url: 'https://akkio.com', categories: ['Data Analysis', 'Finance & Investing'], description: 'A no-code AI platform for predictive modeling and data preparation.', details: { authReq: 'Email or Google.', credits: 'Free trial. Subscription based.' } },

    // Marketing & SEO
    { name: 'Jasper', url: 'https://jasper.ai', categories: ['Marketing & SEO', 'Writing & Content'], description: 'An AI content platform that helps marketing teams create high-quality content at scale.', details: { authReq: 'Email or Google.', credits: '7-day free trial. Subscription based.' } },
    { name: 'AdCreative.ai', url: 'https://adcreative.ai', categories: ['Marketing & SEO'], description: 'Generate high-converting ad creatives and social media posts using AI.', details: { authReq: 'Email or Google.', credits: 'Free trial. Subscription based.' } },

    // 3D & Gaming
    { name: 'Spline AI', url: 'https://spline.design', categories: ['3D & Gaming', 'Design & UI/UX'], description: 'Generate 3D objects, animations, and textures using natural language prompts.', details: { authReq: 'Email or Google.', credits: 'Free basic. Pro for AI features.' } },
    { name: 'Meshy', url: 'https://meshy.ai', categories: ['3D & Gaming'], description: 'A 3D generative AI toolbox for creating high-quality assets for games and XR.', details: { authReq: 'Email or Discord.', credits: 'Daily free credits. Pro for more.' } },
    
    // Additional tools
    { name: 'Grammarly', url: 'https://grammarly.com', categories: ['Writing & Content', 'Education & Tutoring'], description: 'AI-powered writing assistant that helps you communicate with confidence.', details: { authReq: 'Email or Social.', credits: 'Free basic. Premium for advanced.' } },
    { name: 'Quillbot', url: 'https://quillbot.com', categories: ['Writing & Content', 'Education & Tutoring'], description: 'AI paraphrasing tool that helps you rewrite sentences and paragraphs.', details: { authReq: 'Email or Google.', credits: 'Free with limits. Premium for more.' } },
    { name: 'Khanmigo', url: 'https://khanacademy.org', categories: ['Education & Tutoring'], description: 'AI tutor and teaching assistant from Khan Academy.', details: { authReq: 'Khan Academy account.', credits: 'Donation-based access.' } },
    { name: 'Ramp AI', url: 'https://ramp.com', categories: ['Finance & Investing'], description: 'AI for finance teams to automate accounting and control spend.', details: { authReq: 'Business account.', credits: 'Platform fees.' } },
    { name: 'Brex AI', url: 'https://brex.com', categories: ['Finance & Investing'], description: 'AI-powered spend management and corporate cards.', details: { authReq: 'Business account.', credits: 'Platform fees.' } },
    { name: 'Deel AI', url: 'https://deel.com', categories: ['HR & Recruiting', 'Finance & Investing'], description: 'AI assistant for global hiring, payroll, and compliance.', details: { authReq: 'Deel account.', credits: 'Platform fees.' } },
    { name: 'Greenhouse AI', url: 'https://greenhouse.io', categories: ['HR & Recruiting'], description: 'AI tools for recruiting and onboarding talent.', details: { authReq: 'Work email.', credits: 'Enterprise pricing.' } },
    { name: 'Apollo.io', url: 'https://apollo.io', categories: ['Marketing & SEO'], description: 'AI-powered sales intelligence and engagement platform.', details: { authReq: 'Email or Google.', credits: 'Free tier. Pro for more leads.' } },
    { name: 'Buffer AI', url: 'https://buffer.com', categories: ['Social Media Management'], description: 'AI assistant for generating social media ideas and drafts.', details: { authReq: 'Buffer account.', credits: 'Free tier. Pro for more.' } },
    { name: 'Headspace AI', url: 'https://headspace.com', categories: ['Personal Growth'], description: 'AI-powered meditation and mindfulness recommendations.', details: { authReq: 'Email or Social.', credits: 'Free trial. Subscription based.' } },
    { name: 'Tripnotes', url: 'https://tripnotes.ai', categories: ['Travel & Planning'], description: 'AI-powered travel planner that helps you discover and organize trips.', details: { authReq: 'Email or Google.', credits: 'Free to use.' } },
  ];

  realTools.forEach((tool, idx) => {
    const rating = Number((Math.random() * 1.5 + 3.5).toFixed(1)); // 3.5 to 5.0
    const id = `tool-${idx}`;
    const mainCat = tool.categories?.[0] || 'Chat & Assistants';

    tools.push({
      id,
      name: tool.name || 'Unknown Tool',
      categories: tool.categories || ['Chat & Assistants'],
      description: tool.description || `Professional AI solution for ${mainCat.toLowerCase()} tasks and workflows.`,
      url: tool.url || 'https://google.com',
      icon: 'Sparkles',
      rating,
      details: {
        canDo: tool.details?.canDo || [
          `High-speed ${mainCat.toLowerCase()} processing`,
          'Advanced pattern recognition',
          'Multi-language support',
          'API integration capabilities'
        ],
        cannotDo: tool.details?.cannotDo || [
          'Real-time physical interaction',
          'Perfect factual accuracy in all cases'
        ],
        freeTier: tool.details?.freeTier || [
          'Basic access to models',
          'Limited daily requests'
        ],
        paidTier: tool.details?.paidTier || [
          'Priority access to latest models',
          'Unlimited generations'
        ],
        authReq: tool.details?.authReq || 'Account required.',
        credits: tool.details?.credits || 'Free tier available.',
        specializedInfo: tool.details?.specializedInfo
      }
    });
  });

  return tools;
};

export const AI_TOOLS: AITool[] = generateTools();
export const CATEGORIES: string[] = CATEGORY_NAMES;
