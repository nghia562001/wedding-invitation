const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=1200&auto=format&fit=crop",
];

export function GallerySection() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Gallery
          </p>
          <h2 className="text-3xl font-semibold md:text-5xl">Khoảnh khắc đáng nhớ</h2>
          <p className="max-w-2xl text-neutral-600">
            Những khoảnh khắc nhỏ bé nhưng chất chứa thật nhiều yêu thương trên hành trình của chúng tôi.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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