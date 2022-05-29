import { FC, useRef, useState } from 'react';

const projects: {
    name: string;
    // Create 10 projects
}[] = [
    { name: 'Project 1' },
    { name: 'Project 2' },
    { name: 'Project 3' },
    { name: 'Project 4' },
    { name: 'Project 5' },
    { name: 'Project 6' },
    { name: 'Project 7' },
    { name: 'Project 8' },
    { name: 'Project 9' },
    { name: 'Project 10' },
];

export const ProjectSelector: FC = () => {
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState('');
    // use ref
    const reference = useRef<HTMLDivElement>(null);

    return (
        <div
            onFocus={() => setOpen(true)}
            onBlur={(variable) => {
                if (!reference.current.contains(variable.relatedTarget))
                    setOpen(false);
            }}
            className="
                focus-within:dark:bg-green-500
                dark:bg-black-700
                w-48 py-2 px-5
                text-left
                relative
                rounded-xl"
            ref={reference}
        >
            <button>{project == '' ? 'Select Project' : project}</button>
            {open && (
                <ul
                    className="absolute top-14 left-0
                    dark:bg-neutral-800 
                    bg-white border-2 border-neutral-700
                    rounded-lg shadow-lg
                    px-4
                    flex flex-col gap-2"
                >
                    {projects.map((project) => (
                        <button
                            onClick={() => {
                                setProject(project.name);
                                setOpen(false);
                            }}
                            className="rounded-md"
                            key={project.name}
                        >
                            {project.name}
                        </button>
                    ))}
                </ul>
            )}
        </div>
    );
};
