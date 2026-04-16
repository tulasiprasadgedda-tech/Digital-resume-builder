import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { getTemplate } from '../templates';
import { FiFileText } from 'react-icons/fi';

const PublicResume = () => {
  const { publicId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicResume = async () => {
      try {
        const { data } = await api.get(`/api/resume/public/${publicId}`);
        setResume(data);
      } catch (err) {
        setError('Resume not found or is not public.');
      } finally {
        setLoading(false);
      }
    };
    fetchPublicResume();
  }, [publicId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg dark:bg-bg-dark">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg dark:bg-bg-dark">
        <div className="text-center">
          <FiFileText className="w-16 h-16 text-text-muted/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-text dark:text-text-dark mb-2">Resume Not Found</h1>
          <p className="text-text-muted">{error}</p>
        </div>
      </div>
    );
  }

  const TemplateComponent = getTemplate(resume.templateId);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center py-8 px-4">
      <div className="bg-white shadow-2xl" style={{ width: '816px', minHeight: '1056px' }}>
        <TemplateComponent data={resume} theme={resume.themeSettings} />
      </div>
    </div>
  );
};

export default PublicResume;
