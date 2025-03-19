import Image from "next/image";

export default function MasonryGallery() {
  const images = [
    "https://images.pexels.com/photos/1931143/pexels-photo-1931143.jpeg",
    "https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg",
    "https://images.pexels.com/photos/1249462/pexels-photo-1249462.jpeg",
    "https://images.pexels.com/photos/5201598/pexels-photo-5201598.jpeg",
    "https://images.pexels.com/photos/1036403/pexels-photo-1036403.jpeg",
    "https://images.pexels.com/photos/6194837/pexels-photo-6194837.jpeg",
    "https://images.pexels.com/photos/4609300/pexels-photo-4609300.jpeg",
    "https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg",
    "https://images.pexels.com/photos/2088210/pexels-photo-2088210.jpeg",
    "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg",
    "https://images.pexels.com/photos/1931143/pexels-photo-1931143.jpeg",
    "https://images.pexels.com/photos/2088210/pexels-photo-2088210.jpeg",
    "https://images.pexels.com/photos/6194837/pexels-photo-6194837.jpeg",
    "https://images.pexels.com/photos/5201598/pexels-photo-5201598.jpeg",
    "https://images.pexels.com/photos/1249462/pexels-photo-1249462.jpeg",
    "https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg",
    "https://images.pexels.com/photos/1036403/pexels-photo-1036403.jpeg",
    "https://images.pexels.com/photos/4609300/pexels-photo-4609300.jpeg",
    "https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg",
    "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg",
  ];

  return (
    <div className="min-h-screen p-4 mt-5">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((src, index) => (
          <div
            key={src}
            className="break-inside-avoid mb-4 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full aspect-auto">
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                priority={index < 6}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
