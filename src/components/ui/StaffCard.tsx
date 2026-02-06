interface StaffCardProps {
  name: string;
  title: string;
  bio: string;
  photoUrl?: string;
}

export default function StaffCard({ name, title, bio, photoUrl }: StaffCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 flex-shrink-0">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="w-full h-64 md:h-full object-cover"
            />
          ) : (
            <div className="w-full h-64 md:h-full min-h-[16rem] bg-primary-green bg-opacity-10 flex items-center justify-center">
              <span className="text-6xl text-primary-green font-heading font-bold">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="p-6 md:p-8 md:w-2/3">
          <h3 className="text-2xl font-heading font-bold text-earth mb-1">{name}</h3>
          <p className="text-gold font-semibold mb-4">{title}</p>
          <p className="text-gray-500 leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  );
}
