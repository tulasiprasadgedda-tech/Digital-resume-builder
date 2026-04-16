import { FiEye, FiEyeOff, FiRefreshCw } from 'react-icons/fi';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const allSections = [
  { id: 'personalInfo', label: 'Personal Information', icon: '👤', required: true },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'certifications', label: 'Certifications', icon: '📜' }
];

const SortableItem = ({ id, section, isHidden, toggleSection, moveUp, moveDown, index, totalLength }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none' // Prevent scrolling on mobile while dragging
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className={`glass-card p-3 flex items-center justify-between bg-white dark:bg-surface-dark cursor-grab active:cursor-grabbing mb-2 ${isHidden ? 'opacity-50 grayscale' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-0.5" onPointerDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <button onClick={() => moveUp(index)} className="text-xs text-text-muted hover:text-primary transition-colors disabled:opacity-30" disabled={index === 0}>▲</button>
          <button onClick={() => moveDown(index)} className="text-xs text-text-muted hover:text-primary transition-colors disabled:opacity-30" disabled={index === totalLength - 1}>▼</button>
        </div>
        <span className="text-lg">{section.icon}</span>
        <span className="text-sm font-medium text-text dark:text-text-dark">{section.label}</span>
        {section.required && <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Required</span>}
      </div>
      {!section.required && (
        <button
          onClick={(e) => { e.stopPropagation(); toggleSection(id); }}
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className={`btn-ghost text-xs ${isHidden ? 'text-text-muted' : 'text-primary'} hover:bg-primary/10 transition-colors p-1.5 rounded-md`}
        >
          {isHidden ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};

const SectionManager = ({ sectionOrder, hiddenSections, onOrderChange, onHiddenChange, versions, onRestore }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleSection = (sectionId) => {
    if (hiddenSections.includes(sectionId)) {
      onHiddenChange(hiddenSections.filter(s => s !== sectionId));
    } else {
      onHiddenChange([...hiddenSections, sectionId]);
    }
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...sectionOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    onOrderChange(newOrder);
  };

  const moveDown = (index) => {
    if (index === sectionOrder.length - 1) return;
    const newOrder = [...sectionOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    onOrderChange(newOrder);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      onOrderChange(arrayMove(sectionOrder, oldIndex, newIndex));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-text dark:text-text-dark mb-1">Section Manager</h2>
      <p className="text-sm text-text-muted mb-6">Drag and drop to reorder, or show/hide sections.</p>

      {/* Drag and Drop Context */}
      <div className="mb-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sectionOrder}
            strategy={verticalListSortingStrategy}
          >
            {sectionOrder.map((sectionId, index) => {
              const section = allSections.find(s => s.id === sectionId);
              if (!section) return null;
              
              return (
                <SortableItem
                  key={sectionId}
                  id={sectionId}
                  section={section}
                  isHidden={hiddenSections.includes(sectionId)}
                  toggleSection={toggleSection}
                  moveUp={moveUp}
                  moveDown={moveDown}
                  index={index}
                  totalLength={sectionOrder.length}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>

      {/* Version History */}
      {versions && versions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-3">Version History</h3>
          <div className="space-y-2">
            {versions.map((version, index) => (
              <div key={index} className="glass-card p-3 flex items-center justify-between bg-white dark:bg-surface-dark">
                <div>
                  <p className="text-sm font-medium text-text dark:text-text-dark">{version.label || `Version ${index + 1}`}</p>
                  <p className="text-xs text-text-muted">{new Date(version.savedAt).toLocaleString()}</p>
                </div>
                <button onClick={() => onRestore(index)} className="btn-ghost text-xs text-primary hover:bg-primary/10 transition-colors p-2 rounded-lg flex items-center gap-1.5">
                  <FiRefreshCw className="w-3.5 h-3.5" /> Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionManager;
