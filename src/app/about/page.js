import React from "react";

const AboutPage = () => (
  <div className="w-full grow flex flex-co justify-center ">
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">About NFT Portfolio Project</h1>
      <p className="mb-4 text-lg text-muted-foreground">
        This is a verification platform where students and professionals can
        have their projects, portfolios, or creations verified and transformed
        into NFTs, directly linked to their personal wallets. By leveraging
        blockchain technology, RAITE helps users prove ownership, prevent fake
        or malicious tampering, and improve their chances of finding jobs with
        trusted credentials.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Team Members</h2>
      <ul className="list-disc pl-6 text-lg text-muted-foreground">
        <li>Walter Avenido</li>
        <li>Mark Angelo Santiago</li>
        <li>Prince Adriel Arthur Tew</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Senior Developer</h2>
      <ul className="list-disc pl-6 text-lg text-muted-foreground">
        <li>Samuel Torreda</li>
      </ul>
    </main>
  </div>
);

export default AboutPage;
