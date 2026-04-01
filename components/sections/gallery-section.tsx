/* eslint-disable @next/next/no-img-element */
const galleryImages = [
  "/images/DSC05551.jpg",
  "/images/DSC05659.jpg",
  "/images/DSC05662.jpg",
  "/images/DSC05629.jpg",
];

export function GallerySection() {
  return (
    <section id="gallery" className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-14">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Gallery
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
            Khoảnh khắc đáng nhớ
          </h2>

          <p className="text-neutral-600 md:text-lg">
            Những khoảnh khắc nhỏ bé nhưng chất chứa thật nhiều yêu thương trên
            hành trình của chúng tôi.
          </p>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="space-y-4 md:hidden">
          {/* Ảnh 1 - hero */}
          <div className="overflow-hidden rounded-[2rem] aspect-[4/5]">
            <img
              src={galleryImages[0]}
              alt="Gallery 1"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Ảnh 2 + 3 - 2 cột nhỏ */}
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-[1.5rem] aspect-[4/5]">
              <img
                src={galleryImages[1]}
                alt="Gallery 2"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="overflow-hidden rounded-[1.5rem] aspect-[4/5]">
              <img
                src={galleryImages[2]}
                alt="Gallery 3"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Ảnh 4 - full width */}
          <div className="overflow-hidden rounded-[2rem] aspect-[5/4]">
            <img
              src={galleryImages[3]}
              alt="Gallery 4"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden gap-4 md:grid md:grid-cols-2 md:gap-5">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-[2rem] ${
                index === 0 || index === 3 ? "aspect-[4/5]" : "aspect-[5/4]"
              }`}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}