import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFileText, FiZap, FiDownload, FiLayout, FiCpu, FiStar, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: FiCpu, title: 'Smart Auto-Generation', desc: 'Enter minimal data and get a complete professional resume instantly.' },
    { icon: FiLayout, title: '20+ Free Templates', desc: 'Choose from minimal, professional, creative, ATS-friendly, and dark templates.' },
    { icon: FiZap, title: 'Live Preview', desc: 'See changes in real-time as you type. Instant template switching.' },
    { icon: FiDownload, title: 'PDF Download', desc: 'Download your polished resume as PDF in one click. Print-ready.' },
    { icon: FiStar, title: 'Resume Scoring', desc: 'Get scored on completeness and ATS-compatibility with actionable tips.' },
    { icon: FiFileText, title: 'Job-Role Based', desc: 'Select a role and auto-populate relevant skills, summary, and keywords.' },
  ];

  const stats = [
    { value: '20+', label: 'Free Templates' },
    { value: '25+', label: 'Job Roles' },
    { value: '100%', label: 'Free Forever' },
    { value: '< 5min', label: 'Build Time' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <FiZap className="w-4 h-4" />
                AI-Powered Resume Builder — 100% Free
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              Build Your{' '}
              <span className="gradient-text">Dream Resume</span>
              <br />in Minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-text-muted dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Create stunning professional resumes with our smart auto-generator. 
              Choose from 20+ beautiful templates, customize in real-time, 
              and download instantly. No premium — everything is free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="btn-primary text-base px-8 py-3.5 shadow-2xl shadow-primary/30"
                id="hero-cta-btn"
              >
                Start Building Free
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/templates" className="btn-secondary text-base px-8 py-3.5" id="hero-templates-btn">
                Browse Templates
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent to-primary/[0.03]" id="features-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="gradient-text"> Stand Out</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Powerful features designed to make resume building effortless and results stunning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-text dark:text-text-dark">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Enter Your Info', desc: 'Provide basic details like name, skills, and experience. Minimal input required.', icon: '✏️' },
              { step: '02', title: 'Choose a Template', desc: 'Pick from 20+ stunning templates. Preview and switch instantly.', icon: '🎨' },
              { step: '03', title: 'Download & Share', desc: 'Export as PDF, share via public link, or print directly.', icon: '🚀' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Step {item.step}</div>
                <h3 className="text-xl font-semibold mb-2 text-text dark:text-text-dark">{item.title}</h3>
                <p className="text-text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-bg rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Build Your Resume?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of professionals who've landed their dream jobs with AutoResume Pro.
              </p>
              <Link to={isAuthenticated ? '/dashboard' : '/register'} className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-xl font-bold hover:shadow-xl transition-all hover:-translate-y-1">
                Get Started — It's Free
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-border dark:border-border-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <FiFileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold gradient-text">AutoResume Pro</span>
          </div>
          <p className="text-sm text-text-muted">© {new Date().getFullYear()} AutoResume Pro. All rights reserved. 100% Free.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
