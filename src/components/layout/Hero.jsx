import { CardInfo } from "./CardInfo";

export default function Hero() {
  return (
    <>
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-balance leading-tight">
            Showcase Your Projects as{" "}
            <span className="text-[#0142d9]">Verifiable NFTs</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Transform your academic and personal projects into
            blockchain-verified credentials. Create an immutable portfolio that
            employers and educators can trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <CardInfo {...card1} />
          <CardInfo {...card2} />
          <CardInfo {...card3} />
        </div>
      </div>
    </>
  );
}
