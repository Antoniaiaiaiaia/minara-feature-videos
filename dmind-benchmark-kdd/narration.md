# DMind Benchmark KDD video — Narration and scene mapping

> Final voiceover approved on 2026-06-25. Align each scene's visual rhythm with its narration.
> Scenes 1–2 render at 1920×1080; Scenes 3–7 at 2580×1440 (described as 16:9 in the original notes, scaled in the editor).

## Scene 1 — The problem (15.2s)
> In the digital asset space, one flaw in a smart contract can wipe out tens of millions of dollars. Today, investors lean on AI to audit contracts, read on-chain data, and run DeFi strategies. But do these models really understand digital assets?

- Sentence 1 (0–5.2s): Part A vulnerability wall. One contract flaw leads to huge losses (−$17.1B cumulative).
- Sentence 2 (5.2–~10.8s): Part B AI core and three tasks: Audit smart contracts / Read on-chain data / Run DeFi strategies.
- Sentence 3 (~11.6–15.2s): The challenge. A `?` appears in the core, which turns pink-purple: "But do these models really understand digital assets?"

## Scene 2 — Introducing DMind (16s)
> Introducing DMind Benchmark — the first test of how well AI understands digital assets, covering nine core areas: blockchain basics, smart contracts, tokenomics, memecoins, security, and more.

Note: The narration spelling "DeMind" should be "DMind". Nine core domains.

## Scene 3 — How it was built (21s)
> We pulled 6.1 gigabytes of data from 39 trusted sources. Five experts, each with eight years in the field, turned it into 3,543 questions. Every question is traceable and checked for leaks, so a model cannot memorize the answers and game its score.

- 6.1 GB / 39 sources / 5 experts (8 yrs each) / 3,543 questions / traceable + leak-checked

## Scene 4 — Testing 31 models (20s)
> First, we tested 31 of the top AI models. They handle the basics well, but all fall down on the harder problems, like tokenomics and spotting security flaws. Even the strongest model could not break 80 out of 100 in the security area.

- 31 models. The old heatmap says 33 while narration says 31; reconciliation is pending. Strong basics, weak hard-problem performance, and the best security score below 80.

## Scene 5 — Agentic evaluation (20s)
> In the real world, AI rarely works alone. It runs as an agent, calling tools. So we tested five AI agents, each with three real skills: blockchain development, contract security, and tokenomics. But no agent ran away with it. The five finished nearly seven points apart, and tokenomics and security stayed their weakest spots. DMind handles agents on real tasks too, and it still tells the strong from the weak.

- 5 agents / 3 skills / approximately 7-point gap / tokenomics and security weakest

## Scene 6 — Contamination resistance (12s)
> Could the models just be memorizing the test? We trained them directly on the questions, and the scores barely moved. You cannot fake this benchmark by cramming. It rewards real reasoning.

- Fine-tuning directly on the questions barely changes scores (Δ≤+0.91).

## Scene 7 — Impact and closing (20s)
> Since we open-sourced it in April 2025, DMind has hit number one on Hugging Face's trending list, with over 13,000 downloads. The full dataset and testing tools are free for anyone to use. DMind Benchmark. Now you can finally see whether AI can be trusted with your money.

- HF #1 / 13,000+ downloads / free and open source / brand card and closing line
