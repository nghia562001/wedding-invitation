type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500 md:text-sm">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="font-serif text-3xl text-neutral-900 md:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-sm text-neutral-600 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}