// Resume Score Calculator - Evaluates resume completeness and quality

export const calculateScore = (resumeData) => {
  let score = 0;
  let maxScore = 0;
  const breakdown = {};

  // Personal Info (20 points)
  maxScore += 20;
  const pi = resumeData?.personalInfo || {};
  let piScore = 0;
  if (pi.fullName) piScore += 4;
  if (pi.email) piScore += 3;
  if (pi.phone) piScore += 3;
  if (pi.location) piScore += 2;
  if (pi.summary && pi.summary.length > 30) piScore += 5;
  if (pi.linkedin) piScore += 2;
  if (pi.website) piScore += 1;
  score += piScore;
  breakdown.personalInfo = { score: piScore, max: 20, label: 'Personal Info' };

  // Education (15 points)
  maxScore += 15;
  const edu = resumeData?.education || [];
  let eduScore = 0;
  if (edu.length > 0) {
    eduScore += 5;
    const firstEdu = edu[0];
    if (firstEdu.institution) eduScore += 3;
    if (firstEdu.degree) eduScore += 3;
    if (firstEdu.field) eduScore += 2;
    if (firstEdu.startDate || firstEdu.endDate) eduScore += 2;
  }
  score += eduScore;
  breakdown.education = { score: eduScore, max: 15, label: 'Education' };

  // Experience (25 points)
  maxScore += 25;
  const exp = resumeData?.experience || [];
  let expScore = 0;
  if (exp.length > 0) {
    expScore += 5;
    if (exp.length >= 2) expScore += 5;
    exp.forEach(e => {
      if (e.company) expScore += 2;
      if (e.position) expScore += 2;
      if (e.bullets && e.bullets.length > 0) expScore += 3;
    });
    expScore = Math.min(expScore, 25);
  }
  score += expScore;
  breakdown.experience = { score: expScore, max: 25, label: 'Experience' };

  // Skills (15 points)
  maxScore += 15;
  const skills = resumeData?.skills || [];
  let skillScore = 0;
  if (skills.length > 0) skillScore += 3;
  if (skills.length >= 3) skillScore += 3;
  if (skills.length >= 5) skillScore += 3;
  if (skills.length >= 8) skillScore += 3;
  if (skills.length >= 10) skillScore += 3;
  score += skillScore;
  breakdown.skills = { score: skillScore, max: 15, label: 'Skills' };

  // Projects (15 points)
  maxScore += 15;
  const projects = resumeData?.projects || [];
  let projScore = 0;
  if (projects.length > 0) {
    projScore += 5;
    if (projects.length >= 2) projScore += 3;
    projects.forEach(p => {
      if (p.description) projScore += 2;
      if (p.technologies) projScore += 1;
    });
    projScore = Math.min(projScore, 15);
  }
  score += projScore;
  breakdown.projects = { score: projScore, max: 15, label: 'Projects' };

  // Certifications (10 points)
  maxScore += 10;
  const certs = resumeData?.certifications || [];
  let certScore = 0;
  if (certs.length > 0) {
    certScore += 5;
    if (certs.length >= 2) certScore += 3;
    if (certs.length >= 3) certScore += 2;
  }
  score += certScore;
  breakdown.certifications = { score: certScore, max: 10, label: 'Certifications' };

  const percentage = Math.round((score / maxScore) * 100);

  return {
    score,
    maxScore,
    percentage,
    breakdown,
    grade: percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'F',
    tips: generateTips(breakdown)
  };
};

const generateTips = (breakdown) => {
  const tips = [];
  Object.entries(breakdown).forEach(([key, data]) => {
    const ratio = data.score / data.max;
    if (ratio < 0.5) {
      tips.push(`Add more details to ${data.label} to improve your score`);
    } else if (ratio < 0.8) {
      tips.push(`${data.label} is good, but could be enhanced with more details`);
    }
  });
  return tips;
};

// Get completion percentage for the progress tracker
export const getCompletionPercentage = (resumeData) => {
  const sections = ['personalInfo', 'education', 'experience', 'skills', 'projects', 'certifications'];
  let completed = 0;
  
  sections.forEach(section => {
    if (section === 'personalInfo') {
      const pi = resumeData?.personalInfo;
      if (pi && (pi.fullName || pi.email)) completed++;
    } else {
      const data = resumeData?.[section];
      if (data && data.length > 0) completed++;
    }
  });
  
  return Math.round((completed / sections.length) * 100);
};
