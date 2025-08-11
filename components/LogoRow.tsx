import Image from "next/image";

type LogoRowProps = {
  logos?: { src: string; alt?: string }[];
  size?: number;
};

export default function LogoRow({
  logos = [
    { src: "/favicon-512x512.png", alt: "JobTracker Logo" },
    { src: "/favicon-512x512.png", alt: "JobTracker Logo" },
    { src: "/favicon-512x512.png", alt: "JobTracker Logo" },
    { src: "/favicon-512x512.png", alt: "JobTracker Logo" },
    { src: "/favicon-512x512.png", alt: "JobTracker Logo" },
  ],
  size = 128,
}: LogoRowProps) {
  return (
    <div className="flex justify-evenly px-8 py-8">
      {logos.map((logo, i) => (
        <Image
          key={`${logo.src}-${i}`}
          src={logo.src}
          alt={logo.alt ?? "Logo"}
          width={size}
          height={size}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
