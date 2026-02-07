import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { 
  ChevronDown, 
  ChevronRight, 
  Upload, 
  Save, 
  Send,
  CheckCircle2,
  Circle,
  X
} from 'lucide-react';

const EvaluationFormPage = () => {
  const [expandedPrinciples, setExpandedPrinciples] = useState([1]);
  const [expandedPractices, setExpandedPractices] = useState([1]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [comments, setComments] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  
  // Mock data - Replace with API call
  const evaluationData = {
    principles: [
      {
        id: 1,
        name: 'Transparency',
        practices: [
          {
            id: 1,
            name: 'Public Information',
            criteria: [
              {
                id: 1,
                name: 'Official website exists',
                description: 'Organization must have a functional public website'
              },
              {
                id: 2,
                name: 'Contact information available',
                description: 'Public contact details are easily accessible'
              }
            ]
          },
          {
            id: 2,
            name: 'Open Data',
            criteria: [
              {
                id: 3,
                name: 'Budget published',
                description: 'Annual budget is publicly available'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Accountability',
        practices: [
          {
            id: 3,
            name: 'Reporting',
            criteria: [
              {
                id: 4,
                name: 'Annual reports published',
                description: 'Organization publishes yearly activity reports'
              }
            ]
          }
        ]
      }
    ]
  };
  
  const maturityLevels = [
    { value: 0, label: "N'existe pas", color: 'text-red-600' },
    { value: 1, label: 'En cours', color: 'text-orange-600' },
    { value: 2, label: 'Réalisé', color: 'text-blue-600' },
    { value: 3, label: 'Validé', color: 'text-green-600' }
  ];
  
  const togglePrinciple = (principleId) => {
    setExpandedPrinciples(prev => 
      prev.includes(principleId) 
        ? prev.filter(id => id !== principleId)
        : [...prev, principleId]
    );
  };
  
  const togglePractice = (practiceId) => {
    setExpandedPractices(prev => 
      prev.includes(practiceId) 
        ? prev.filter(id => id !== practiceId)
        : [...prev, practiceId]
    );
  };
  
  const handleMaturityChange = (criterionId, level) => {
    setSelectedLevels(prev => ({ ...prev, [criterionId]: level }));
  };
  
  const handleFileUpload = (criterionId, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [criterionId]: file }));
    }
  };
  
  const removeFile = (criterionId) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[criterionId];
      return newFiles;
    });
  };
  
  const calculateProgress = () => {
    const totalCriteria = evaluationData.principles.reduce(
      (sum, principle) => sum + principle.practices.reduce(
        (pSum, practice) => pSum + practice.criteria.length, 0
      ), 0
    );
    const completedCriteria = Object.keys(selectedLevels).length;
    return Math.round((completedCriteria / totalCriteria) * 100);
  };
  
  const handleSaveDraft = () => {
    console.log('Saving draft...', { selectedLevels, comments, uploadedFiles });
    alert('Draft saved successfully!');
  };
  
  const handleSubmit = () => {
    const progress = calculateProgress();
    if (progress < 100) {
      alert(`Please complete all criteria. Current progress: ${progress}%`);
      return;
    }
    console.log('Submitting evaluation...', { selectedLevels, comments, uploadedFiles });
    alert('Evaluation submitted successfully!');
  };
  
  const progress = calculateProgress();
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Evaluation Form</h1>
            <p className="text-gray-600 mt-1">Complete all criteria to submit</p>
          </div>
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            <Save size={20} />
            Save Draft
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-gray-700">Overall Progress</p>
            <p className="text-xl font-bold text-primary-600">{progress}%</p>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Evaluation Form */}
        <div className="flex gap-6">
          {/* Left Sidebar - Principles Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-4 border border-gray-200 sticky top-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Principles</h3>
              <div className="space-y-1">
                {evaluationData.principles.map((principle) => {
                  const completed = principle.practices.reduce(
                    (sum, practice) => sum + practice.criteria.filter(
                      c => selectedLevels[c.id] !== undefined
                    ).length, 0
                  );
                  const total = principle.practices.reduce(
                    (sum, practice) => sum + practice.criteria.length, 0
                  );
                  const isComplete = completed === total;
                  
                  return (
                    <button
                      key={principle.id}
                      onClick={() => {
                        document.getElementById(`principle-${principle.id}`)?.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        });
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      {isComplete ? (
                        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                      ) : (
                        <Circle size={16} className="text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {principle.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {completed}/{total}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Main Content - Principles & Criteria */}
          <div className="flex-1 space-y-4">
            {evaluationData.principles.map((principle) => (
              <div 
                key={principle.id} 
                id={`principle-${principle.id}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Principle Header */}
                <button
                  onClick={() => togglePrinciple(principle.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedPrinciples.includes(principle.id) ? (
                      <ChevronDown size={20} className="text-gray-600" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-600" />
                    )}
                    <h2 className="text-xl font-bold text-gray-900">
                      Principle {principle.id}: {principle.name}
                    </h2>
                  </div>
                </button>
                
                {/* Practices & Criteria */}
                {expandedPrinciples.includes(principle.id) && (
                  <div className="px-6 pb-6 space-y-4">
                    {principle.practices.map((practice) => (
                      <div key={practice.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Practice Header */}
                        <button
                          onClick={() => togglePractice(practice.id)}
                          className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          {expandedPractices.includes(practice.id) ? (
                            <ChevronDown size={18} className="text-gray-600" />
                          ) : (
                            <ChevronRight size={18} className="text-gray-600" />
                          )}
                          <h3 className="text-lg font-semibold text-gray-900">
                            Practice {practice.id}: {practice.name}
                          </h3>
                        </button>
                        
                        {/* Criteria */}
                        {expandedPractices.includes(practice.id) && (
                          <div className="p-4 space-y-6">
                            {practice.criteria.map((criterion) => (
                              <div 
                                key={criterion.id} 
                                className="border border-gray-200 rounded-lg p-5 bg-white space-y-4"
                              >
                                {/* Criterion Header */}
                                <div>
                                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                                    Criterion {criterion.id}: {criterion.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {criterion.description}
                                  </p>
                                </div>
                                
                                {/* Maturity Level Selection */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Maturity Level: <span className="text-red-600">*</span>
                                  </label>
                                  <div className="space-y-2">
                                    {maturityLevels.map((level) => (
                                      <label 
                                        key={level.value}
                                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                      >
                                        <input
                                          type="radio"
                                          name={`criterion-${criterion.id}`}
                                          value={level.value}
                                          checked={selectedLevels[criterion.id] === level.value}
                                          onChange={() => handleMaturityChange(criterion.id, level.value)}
                                          className="w-4 h-4 text-primary-600"
                                        />
                                        <span className={`text-sm font-medium ${level.color}`}>
                                          {level.label}
                                        </span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Evidence Upload */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Supporting Evidence:
                                  </label>
                                  {uploadedFiles[criterion.id] ? (
                                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-green-600" />
                                        <span className="text-sm font-medium text-green-900">
                                          {uploadedFiles[criterion.id].name}
                                        </span>
                                        <span className="text-xs text-green-600">
                                          ({(uploadedFiles[criterion.id].size / 1024).toFixed(1)} KB)
                                        </span>
                                      </div>
                                      <button
                                        onClick={() => removeFile(criterion.id)}
                                        className="p-1 hover:bg-green-100 rounded transition-colors"
                                      >
                                        <X size={16} className="text-green-600" />
                                      </button>
                                    </div>
                                  ) : (
                                    <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 cursor-pointer transition-colors">
                                      <Upload size={20} className="text-gray-400" />
                                      <span className="text-sm font-medium text-gray-600">
                                        Upload File
                                      </span>
                                      <input
                                        type="file"
                                        onChange={(e) => handleFileUpload(criterion.id, e)}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                      />
                                    </label>
                                  )}
                                </div>
                                
                                {/* Comment */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Comment (optional):
                                  </label>
                                  <textarea
                                    value={comments[criterion.id] || ''}
                                    onChange={(e) => setComments(prev => ({ ...prev, [criterion.id]: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                    placeholder="Add any additional comments or context..."
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={handleSubmit}
                disabled={progress < 100}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
                Submit Evaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EvaluationFormPage;