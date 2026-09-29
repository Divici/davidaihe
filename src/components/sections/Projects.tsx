import { projects } from '@/content/projects';
import { ProjectCard } from '../ProjectCard';
import { SectionHeading } from '../SectionHeading';

export function Projects() {
  return (
    <section id="work" className="section projects js-spy" aria-labelledby="work-title">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        lead="Six projects, from desktop tools to multi-agent systems. Every screenshot is the real app."
      >
        Things I designed, built, and <em>shipped.</em>
      </SectionHeading>

      <div className="projects__list">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
