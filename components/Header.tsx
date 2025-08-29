type HeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

export default function Header({ title, subtitle, align = "center" }: HeaderProps) {
  const alignStyle =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <section className={`${alignStyle} mt-14`}>
      <h2 className="mb-2 text-2xl font-bold text-[var(--ink)]">{title}</h2>
      {subtitle ? <p className="text-[var(--muted)]">{subtitle}</p> : null}
      {/* Anytime you see {something} inside JSX, it means:
      "Evaluate this JavaScript code and insert the result right here." */}
    </section>
  );
}
