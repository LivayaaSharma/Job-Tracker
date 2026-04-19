type HeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

export default function Header({ title, subtitle, align = "center" }: HeaderProps) {
  const alignClass ={
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  const alignStyle=alignClass[align];

  return (
    <section className={`${alignStyle} mt-14`}>
      <h2 className="mb-2 text-2xl font-bold text-ink">{title}</h2>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </section>
  );
}
