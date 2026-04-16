import { getTemplate } from '../templates';

const LivePreview = ({ resumeData }) => {
  const TemplateComponent = getTemplate(resumeData?.templateId);
  
  return (
    <div id="resume-preview-content" className="bg-white shadow-2xl" style={{ 
      width: '816px', 
      minHeight: '1056px',
      transform: 'scale(0.65)',
      transformOrigin: 'top center',
      marginBottom: '-35%'
    }}>
      <TemplateComponent 
        data={resumeData} 
        theme={resumeData?.themeSettings} 
      />
    </div>
  );
};

export default LivePreview;
