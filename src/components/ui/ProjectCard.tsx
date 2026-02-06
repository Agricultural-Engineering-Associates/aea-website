interface ProjectCardProps {
  title: string;
  description?: string;
  category: string;
  location: string;
  imageUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  category,
  location,
  imageUrl,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-primary-green bg-opacity-10 flex items-center justify-center">
          <span className="text-primary-green font-heading font-bold text-lg text-center px-4">
            {category}
          </span>
        </div>
      )}
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-green bg-primary-green bg-opacity-10 rounded-full mb-3">
          {category}
        </span>
        <h3 className="text-lg font-heading font-bold text-earth mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{location}</p>
        {description && <p className="text-gray-500 text-sm">{description}</p>}
      </div>
    </div>
  );
}
