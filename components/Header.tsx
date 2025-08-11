type HeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

export default function Header({ title, subtitle, align = "center" }: HeaderProps) {
  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <section className={`${alignClass} mt-16`}>
      <h2 className="mb-2 text-2xl font-bold text-[var(--ink)]">{title}</h2>
      {subtitle ? <p className="text-[var(--muted)]">{subtitle}</p> : null}
    </section>
  );
}
