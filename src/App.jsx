import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, BarChart3, FlaskConical, Sigma, Workflow, CalendarCheck, GraduationCap, PlayCircle, FileText, Database, Trophy, Layers3, GitBranch } from 'lucide-react'

// --- Minimal UI primitives (Tailwind-based) ---
const Button = ({variant='default', size='md', className='', children, ...props}) => {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium shadow-sm transition';
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
    outline: 'border border-neutral-300 bg-white hover:bg-neutral-50',
    ghost: 'hover:bg-neutral-100'
  };
  const sizes = { sm:'text-sm px-3 py-1.5', md:'text-sm', lg:'text-base px-5 py-2.5' };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>
}

const Card = ({className='', children}) => <div className={`bg-white border rounded-2xl ${className}`}>{children}</div>
const CardHeader = ({children}) => <div className='px-4 pt-4'><div className='text-lg font-semibold'>{children}</div></div>
const CardTitle = ({children}) => <div>{children}</div>
const CardContent = ({className='', children}) => <div className={`px-4 pb-4 ${className}`}>{children}</div>

const Input = ({className='', ...props}) => <input className={`border rounded-xl px-3 py-2 text-sm ${className}`} {...props} />

// Simple Tabs
const Tabs = ({defaultValue, children}) => <div>{children}</div>
const TabsList = ({children}) => <div className='flex gap-2'>{children}</div>
const TabsTrigger = ({value, children, onClick}) => <Button variant='outline' size='sm' onClick={onClick}>{children}</Button>
const TabsContent = ({value, children}) => <div>{children}</div>

// Simple Accordion
const Accordion = ({children}) => <div>{children}</div>
const AccordionItem = ({children}) => <div className='border rounded-xl mb-2'>{children}</div>
const AccordionTrigger = ({children, onClick}) => <div onClick={onClick} className='flex justify-between items-center p-3 cursor-pointer hover:bg-neutral-50'>{children}</div>
const AccordionContent = ({children, open}) => open ? <div className='px-3 pb-3'>{children}</div> : null

// ====== EXTERNAL LINKS (replace after pushing to GitHub) ======
const GITHUB_URL = 'https://github.com/bulisa/practical-stats-python-course';
const SYLLABUS_PDF_URL = 'https://raw.githubusercontent.com/bulisa/practical-stats-python-course/main/docs/SYLLABUS.md';
const DATA_BASE_URL = 'https://raw.githubusercontent.com/bulisa/practical-stats-python-course/main/datasets';
const NOTEBOOK_BASE_URL = 'https://raw.githubusercontent.com/bulisa/practical-stats-python-course/main/notebooks';

const modules = [
  { id: 'm1', icon: <BookOpen className='w-6 h-6'/>, title: 'Intro to Stats for Analysts', est: '2.5h', skills: ['Descriptive Stats','Data Types','Pandas Basics','Viz'],
    lessons: [
      {title:'Population vs Sample; Variables', deliverable:'Cheat sheet & quiz (10 Q)'},
      {title:'Pandas for summaries (mean/median/IQR/std)', deliverable:'Notebook: retail_sales.csv'},
      {title:'Visuals: hist, boxplot, scatter', deliverable:'Mini‑lab: outlier scan'}
    ], project:'EDA one‑pager: KPI summary + 3 charts' },
  { id: 'm2', icon: <Sigma className='w-6 h-6'/>, title: 'Probability & Distributions', est:'3h', skills:['Random Variables','Normal/Binomial/Poisson','Simulation'],
    lessons: [
      {title:'Probability rules & intuition', deliverable:'Flashcards'},
      {title:'Common distributions & when to use them', deliverable:'Match‑the‑use‑case'},
      {title:'Simulation in NumPy', deliverable:'Notebook: simulate AB test'}
    ], project:'Distribution fit report with goodness‑of‑fit checks' },
  { id: 'm3', icon: <Layers3 className='w-6 h-6'/>, title: 'Sampling & CLT', est:'2h', skills:['Sampling','Bias','CLT','Confidence Intervals'],
    lessons: [
      {title:'Sampling strategies & pitfalls', deliverable:'Bias case study'},
      {title:'CLT via simulation', deliverable:'Notebook: sampling dist'},
      {title:'CIs with scipy.stats', deliverable:'Compute CI for CTR'}
    ], project:'Memo: sample size for weekly dashboard' },
  { id: 'm4', icon: <FlaskConical className='w-6 h-6'/>, title: 'Hypothesis Testing & A/B', est:'3h', skills:['H0/H1','Type I/II','t‑test','Chi‑square','ANOVA'],
    lessons: [
      {title:'Formulating H0/H1 & errors', deliverable:'Quiz + checklist'},
      {title:'t‑test / Welch / paired', deliverable:'Notebook: retention uplift'},
      {title:'Chi‑square & ANOVA', deliverable:'Notebook: feature usage'},
      {title:'Power & sample size', deliverable:'Calculator mini‑app link'}
    ], project:'A/B design doc + analysis (subscriptions)' },
  { id: 'm5', icon: <BarChart3 className='w-6 h-6'/>, title: 'Correlation & Regression', est:'3h', skills:['Pearson/Spearman','OLS','Diagnostics','RMSE/R²'],
    lessons: [
      {title:'Correlation vs causation', deliverable:'Interpretation drill'},
      {title:'Simple & multiple linear regression', deliverable:'Notebook: pricing vs demand'},
      {title:'Diagnostics & assumptions', deliverable:'Residual plots task'}
    ], project:'Model report: explain KPI variance' },
  { id: 'm6', icon: <Workflow className='w-6 h-6'/>, title: 'Applied Case Studies', est:'3h', skills:['Churn','Cohorts','Forecasting','Experiment Review'],
    lessons: [
      {title:'Churn analysis (gaming/app)', deliverable:'Notebook + deck (5 slides)'},
      {title:'Subscription A/B test', deliverable:'p‑value vs effect size brief'},
      {title:'Sales forecast (regression)', deliverable:'Backtest results table'}
    ], project:'Capstone: business stakeholder readout (10 min)' },
];

const datasets = [
  {name: 'retail_sales.csv', desc: 'Daily sales with promos, price, channel'},
  {name: 'subscriptions.csv', desc: 'Trials, conversions, churn, cohorts'},
  {name: 'ab_test.csv', desc: 'Variant, user, conversion, timestamp'},
];

const resources = [
  {title: 'Stats Cheat Sheet', type: 'PDF'},
  {title: 'Hypothesis Testing Flowchart', type: 'PNG'},
  {title: 'Regression Diagnostics Checklist', type: 'PDF'},
  {title: 'AB Test Power Calculator (link)', type: 'Tool'},
];

export default function App(){
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [query, setQuery] = useState('');
  const [openAcc, setOpenAcc] = useState({});

  const mainNotebook = (moduleId) => {
    const map = {
      m1: 'module1_intro/01_descriptives.ipynb',
      m2: 'module2_probability/02_probability_distributions.ipynb',
      m3: 'module3_sampling_clt/03_sampling_clt.ipynb',
      m4: 'module4_hypothesis_ab/04_hypothesis_ab.ipynb',
      m5: 'module5_regression/05_regression.ipynb',
      m6: 'module6_case_studies/06_case_studies.ipynb',
    };
    return `${NOTEBOOK_BASE_URL}/${map[moduleId] || ''}`;
  };

  const filtered = modules.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.skills.join(' ').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <GraduationCap className="w-6 h-6"/>
          <h1 className="font-semibold">Practical Statistics with Python</h1>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="secondary" onClick={()=>setShowSyllabus(true)}><FileText className="w-4 h-4 mr-1"/>Syllabus</Button>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Button size="sm"><PlayCircle className="w-4 h-4 mr-1"/>Start Course</Button></a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.section initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Learn core <span className="text-indigo-600">statistics</span> the <span className="text-indigo-600">hands‑on</span> way.</h2>
            <p className="mt-3 text-neutral-700">A beginner→intermediate course for analysts and BI professionals. Build intuition, run tests, and ship insights with Python (Pandas/NumPy/SciPy/Matplotlib).</p>
            <div className="mt-4 flex gap-3">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Button><PlayCircle className="w-4 h-4 mr-1"/> Continue</Button></a>
              <Button variant="outline"><CalendarCheck className="w-4 h-4 mr-1"/> 6‑week plan</Button>
            </div>
            <ul className="mt-4 text-sm text-neutral-700 list-disc pl-5 space-y-1">
              <li>Weekly time: 4–6 hours</li>
              <li>Tooling: Python 3.11+, Jupyter/VS Code, Pandas, NumPy, SciPy, Matplotlib, Seaborn</li>
              <li>Outcome: Run A/B tests, build regressions, communicate results</li>
            </ul>
          </div>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5"/> Datasets you’ll use</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {datasets.map((d)=> (
                  <li key={d.name} className="flex items-start justify-between gap-3 border rounded-lg p-3">
                    <div>
                      <div className="font-medium">{d.name}</div>
                      <div className="text-sm text-neutral-600">{d.desc}</div>
                    </div>
                    <a href={`${DATA_BASE_URL}/${d.name}`} target="_blank" rel="noreferrer"><Button size="sm" variant="outline">Download</Button></a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.section>

        {/* Search / quick nav */}
        <section className="mt-10">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="font-semibold">Browse modules</div>
            <div className="flex gap-2">
              <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search lessons, e.g. 't-test'" className="w-64"/>
              <Button variant="secondary" onClick={()=>{}} >Search</Button>
            </div>
          </div>
        </section>

        {/* Modules grid */}
        <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <Card key={m.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">{m.icon}<span>{m.title}</span></CardTitle>
                <div className="text-xs text-neutral-500">Estimated time: {m.est}</div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-neutral-700 mb-2">Key skills: {m.skills.join(', ')}</div>
                <Accordion>
                  {m.lessons.map((l, idx) => (
                    <AccordionItem key={idx}>
                      <AccordionTrigger onClick={()=>setOpenAcc(prev=>({...prev, [m.id+idx]: !prev[m.id+idx]}))} className="text-sm">Lesson {idx+1}: {l.title}</AccordionTrigger>
                      <AccordionContent open={!!openAcc[m.id+idx]}>
                        <div className="text-sm">Deliverable: {l.deliverable}</div>
                        <div className="mt-2 flex gap-2">
                          <a href={mainNotebook(m.id)} target="_blank" rel="noreferrer"><Button size="sm" variant="secondary"><PlayCircle className="w-4 h-4 mr-1"/>Open Notebook</Button></a>
                          <Button size="sm" variant="outline"><FileText className="w-4 h-4 mr-1"/>Lesson Notes</Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-3 text-sm"><strong>Module project:</strong> {m.project}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Tabs: Plan / Assessments / Resources */}
        <section className="mt-10">
          <Tabs>
            <TabsList>
              <TabsTrigger>6‑Week Study Plan</TabsTrigger>
              <TabsTrigger>Assessments</TabsTrigger>
              <TabsTrigger>Resources</TabsTrigger>
            </TabsList>
            <TabsContent className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <ol className="list-decimal pl-5 space-y-3 text-sm text-neutral-700">
                    <li><strong>Week 1:</strong> Module 1 (descriptives) + set up environment; deliver EDA one‑pager.</li>
                    <li><strong>Week 2:</strong> Module 2 (probability & distributions) + simulation mini‑lab.</li>
                    <li><strong>Week 3:</strong> Module 3 (sampling/CLT) + CI tasks; start Module 4.</li>
                    <li><strong>Week 4:</strong> Module 4 (t‑tests/ANOVA/chi‑square); write A/B design doc.</li>
                    <li><strong>Week 5:</strong> Module 5 (regression + diagnostics); build model report.</li>
                    <li><strong>Week 6:</strong> Module 6 (case studies) + capstone stakeholder readout.</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent className="mt-4">
              <Card>
                <CardContent className="grid md:grid-cols-2 gap-4 p-4">
                  <div className="border rounded-lg p-3">
                    <div className="font-medium flex items-center gap-2"><GitBranch className="w-4 h-4"/> Formative</div>
                    <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                      <li>End‑of‑lesson quizzes (auto‑graded)</li>
                      <li>Notebook checkpoints (asserts/tests)</li>
                      <li>Peer feedback on plots & write‑ups</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="font-medium flex items-center gap-2"><Trophy className="w-4 h-4"/> Summative</div>
                    <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                      <li>Mid‑course A/B test analysis (graded)</li>
                      <li>Final capstone + 10‑minute presentation</li>
                      <li>Oral defense: justify assumptions & metrics</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent className="mt-4">
              <Card>
                <CardContent className="p-4 grid sm:grid-cols-2 gap-3">
                  {resources.map((r, i) => (
                    <div key={i} className="border rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{r.title}</div>
                        <div className="text-xs text-neutral-500">{r.type}</div>
                      </div>
                      <Button size="sm" variant="outline">Open</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Syllabus Modal */}
      {showSyllabus && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4" onClick={()=>setShowSyllabus(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-semibold"><FileText className="w-4 h-4"/> Syllabus (6‑week)</div>
              <Button size="sm" variant="outline" onClick={()=>setShowSyllabus(false)}>Close</Button>
            </div>
            <ol className="list-decimal pl-5 text-sm space-y-2 text-neutral-700">
              <li><strong>Week 1:</strong> Descriptives & Viz; EDA one‑pager.</li>
              <li><strong>Week 2:</strong> Probability & Distributions; simulation lab.</li>
              <li><strong>Week 3:</strong> Sampling/CLT; confidence intervals.</li>
              <li><strong>Week 4:</strong> Hypothesis tests; A/B design & analysis.</li>
              <li><strong>Week 5:</strong> Regression; diagnostics & report.</li>
              <li><strong>Week 6:</strong> Case studies; capstone presentation.</li>
            </ol>
            <div className="mt-4"><a href={SYLLABUS_PDF_URL} target="_blank" rel="noreferrer"><Button><FileText className="w-4 h-4 mr-1"/> Open full syllabus</Button></a></div>
          </div>
        </div>
      )}

      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-neutral-600 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4"/>
            <span>Build your stats intuition. Ship better insights.</span>
          </div>
          <div className="flex gap-2">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Button variant='ghost' size='sm'>GitHub Repo</Button></a>
            <a href={SYLLABUS_PDF_URL} target="_blank" rel="noreferrer"><Button variant='ghost' size='sm'>Syllabus PDF</Button></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
