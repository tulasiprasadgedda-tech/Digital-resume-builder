// Shared template utilities for formatting dates, spacing, etc.

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const getFontSize = (size) => {
  switch (size) {
    case 'small': return { name: '18px', title: '13px', body: '11px', section: '14px' };
    case 'large': return { name: '28px', title: '16px', body: '13px', section: '18px' };
    default: return { name: '24px', title: '14px', body: '12px', section: '16px' };
  }
};

export const getSpacing = (spacing) => {
  switch (spacing) {
    case 'compact': return { section: '12px', item: '6px', padding: '24px' };
    case 'relaxed': return { section: '28px', item: '14px', padding: '40px' };
    default: return { section: '20px', item: '10px', padding: '32px' };
  }
};

export const getSkillLevel = (level) => {
  switch (level) {
    case 'Beginner': return 25;
    case 'Intermediate': return 50;
    case 'Advanced': return 75;
    case 'Expert': return 95;
    default: return 50;
  }
};
