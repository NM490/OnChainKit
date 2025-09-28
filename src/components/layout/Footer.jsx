export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card dark:bg-clr-surface-a0 py-6 mt-12 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>RAITE Project {new Date().getFullYear()}, NFT Portfolio.</span>
        <span>
          Built with <a href="https://nextjs.org/" className="underline hover:text-primary transition">Next.js</a> &amp; <a href="https://wagmi.sh/" className="underline hover:text-primary transition">Wagmi</a>
        </span>
      </div>
    </footer>
  );
}
