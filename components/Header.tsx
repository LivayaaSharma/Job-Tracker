type HeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

export default function Header({ title, subtitle, align = "center" }: HeaderProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  const alignStyle = alignClass[align];

  return (
    <section className={`${alignStyle} mt-8 font-['Space_Grotesk',sans-serif]`}>
      <h2 className="mb-2 font-['Fraunces',serif] text-2xl font-semibold text-ink">{title}</h2>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </section>
  );
}
