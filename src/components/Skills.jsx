import { useState } from 'react';
import { Server, Database, Code as CodeIcon, GitBranch } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import {
  siJavascript, siReact, siVite, siHtml5, siCss,
  siNodedotjs, siExpress,
  siSupabase, siMysql,
  siGit, siGithub, siDocker,
  siSwagger,
} from 'simple-icons';

function TechIcon({ icon, size = 16 }) {
  if (!icon?.svg) return null;
  return (
    <span
      className="tech-icon"
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
}

const skillsData = [
  {
    title: 'Frontend',
    icon: CodeIcon,
    skills: [
      { name: 'JavaScript', icon: siJavascript },
      { name: 'React', icon: siReact },
      { name: 'Vite', icon: siVite },
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'Express', icon: siExpress },
      { name: 'REST API', icon: siSwagger },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'Supabase', icon: siSupabase },
      { name: 'SQL', icon: siMysql },
    ],
  },
  {
    title: 'Tools',
    icon: GitBranch,
    skills: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'Docker', icon: siDocker },
    ],
  },
];

export function SkillCategory({ category }) {
  const [isOpen, setIsOpen] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 768
  );
  const Icon = category.icon;

  const renderSkillIcon = (icon, size = 15) => {
    if (icon?.svg) {
      return <TechIcon icon={icon} size={size} />;
    }
    const LucideIcon = icon;
    return <LucideIcon size={size} strokeWidth={1.8} />;
  };

  return (
    <div className="skill-category">
      <button
        type="button"
        className="skill-category__header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{category.title}</span>
        <Icon
          size={18}
          className={isOpen ? 'rotated' : ''}
          style={{ transition: 'transform 0.3s ease' }}
        />
      </button>
      <div className={`skill-category__body ${isOpen ? 'open' : ''}`}>
        <ul className="skill-category__list">
          {category.skills.map((skill) => (
            <li key={skill.name} className="skill-category__item">
              <span className="skill-category__icon">
                {renderSkillIcon(skill.icon)}
              </span>
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="page-section">
      <div className="container">
        <p className="section__label">Навыки</p>
        <h2 className="section__title">Мой стек технологий</h2>
        <ScrollReveal>
          <div className="skills__grid">
            {skillsData.map((category) => (
              <SkillCategory key={category.title} category={category} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
