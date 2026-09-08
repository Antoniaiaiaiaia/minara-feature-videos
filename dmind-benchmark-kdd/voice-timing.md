# Narration timeline (SRT) and scene mapping

> Source of truth: `voice-srt.srt`, the timestamped voiceover approved on 2026-06-25.
> Full narration spans **0.033 → 1:55.300 (approximately 115.3s)**. Align scene motion with the corresponding SRT cues.
> Scene start/end values below are **absolute film timestamps**, from the first to last narrated line. Convert them to offsets from the scene start when animating.

## Scene 1 — 0.033 → 15.666(voice ~15.6s; current composition 15.2s)
| Absolute time | Scene-relative time | Narration | Visual |
|---|---|---|---|
| 0.033–1.633 | 0.0–1.6 | In the digital asset space | Part A vulnerability wall begins |
| 1.700–5.666 | 1.7–5.7 | One flaw in a smart contract can wipe out tens of millions of dollars | Vulnerability wall and loss counter rising to −$17.1B |
| 6.033–6.533 | 6.0–6.5 | Today | Transition to Part B: AI core enters |
| 6.533–9.233 | 6.5–9.2 | investors lean on AI to audit contracts | Card 1: Audit rotates out |
| 9.233–10.600 | 9.2–10.6 | read on-chain data | Card 2: Read on-chain rotates out |
| 10.600–12.333 | 10.6–12.3 | and run DeFi strategies | Card 3: Run DeFi rotates out |
| 12.500–15.666 | 12.5–15.7 | But do these models really understand digital assets? | Core turns pink-purple with a question mark; question settles |

The current Scene 1 card timing (6.9 / 8.1 / 9.3) is **ahead of the voiceover**: Read is at 9.2 and DeFi at 10.6. The original timing review proposes cards around 6.7 / 9.3 / 10.7, the question around 12.5, and the Part A transition around 5.7 rather than 4.6. The 15.2s composition is about **0.5s shorter** than the 15.67s voiceover; it could extend to about 15.8s.

## Scene 2 — 15.900 → 28.733(voice ~12.8s; current composition 16s, too long)
| Absolute time | Narration |
|---|---|
| 15.900–17.833 | Introducing DMind Benchmark |
| 18.000–21.666 | The first test of how well AI understands digital assets |
| 21.666–23.433 | covering nine core areas: |
| 23.433–24.533 | blockchain basics |
| 24.533–26.300 | smart contracts, tokenomics |
| 26.300–27.200 | memecoins |
| 27.200–28.733 | security, and more |

## Scene 3 — 28.833 → 46.433(voice ~17.6s; current composition 21s, too long)
| Absolute time | Narration |
|---|---|
| 28.833–33.266 | We pulled 6.1 gigabytes of data from 39 trusted sources |
| 33.533–34.533 | Five experts |
| 34.533–36.233 | each with eight years in the field |
| 36.233–39.833 | turned it into 3,543 questions |
| 39.833–42.666 | Every question is traceable and checked for leaks |
| 42.666–46.433 | so a model cannot memorize the answers and game its score |

## Scene 4 — 46.433 → 60.700(voice ~14.3s; current composition 20s, too long)
| Absolute time | Narration |
|---|---|
| 46.433–47.000 | First |
| 47.000–49.666 | we tested 31 of the top AI models |
| 49.666–51.133 | They handle the basics well |
| 51.133–53.233 | but all fall down on the harder problems |
| 53.233–56.066 | like tokenomics and spotting security flaws |
| 56.066–60.700 | Even the strongest model could not break 80 out of 100 in the security area |

The narration says **31** models; the current heatmap labels 33. This discrepancy remains unresolved.

## Scene 5 — 61.000 → 86.266(voice ~25.3s; current composition 20s, too short)
| Absolute time | Narration |
|---|---|
| 61.000–61.900 | In the real world |
| 61.900–63.533 | AI rarely works alone |
| 63.633–64.700 | It runs as an agent |
| 64.700–65.800 | calling tools |
| 65.800–68.033 | So we tested five AI agents |
| 68.033–69.900 | each with three real skills: |
| 69.900–71.100 | blockchain development |
| 71.100–72.133 | contract security |
| 72.133–73.533 | and tokenomics |
| 73.666–75.666 | But no agent ran away with it |
| 75.733–77.900 | The five finished nearly seven points apart |
| 77.900–81.300 | and tokenomics and security stayed their weakest spots |
| 81.433–84.000 | DMind handles agents on real tasks too |
| 84.000–86.266 | and it still tells the strong from the weak |

The 25.3s voiceover is **about 5s longer** than the current 20s composition. The original timing review calls for extending Scene 5.

## Scene 6 — 86.266 → 97.133(voice ~10.9s; current composition 12s, close)
| Absolute time | Narration |
|---|---|
| 86.266–88.733 | Could the models just be memorizing the test? |
| 88.900–90.900 | We trained them directly on the questions |
| 90.900–92.933 | and the scores barely moved |
| 92.933–95.433 | You cannot fake this benchmark by cramming |
| 95.433–97.133 | It rewards real reasoning |

## Scene 7 — 97.266 → 115.300(voice ~18.0s; current composition 20s, close)
| Absolute time | Narration |
|---|---|
| 97.266–100.200 | Since we open-sourced it in April 2025 |
| 100.300–103.800 | DMind has hit number one on Hugging Face's trending list |
| 103.800–106.266 | with over 13,000 downloads |
| 106.266–110.000 | The full dataset and testing tools are free for anyone to use |
| 110.233–111.800 | DMind Benchmark |
| 111.866–115.300 | Now you can finally see whether AI can be trusted with your money |

## Duration comparison (voiceover versus current composition)
| Scene | Voiceover | Current composition | Difference |
|---|---|---|---|
| 1 | 15.6s | 15.2s | −0.5 (slightly short; can extend) |
| 2 | 12.8s | 16s | +3.2 (too long) |
| 3 | 17.6s | 21s | +3.4 (too long) |
| 4 | 14.3s | 20s | +5.7 (too long) |
| 5 | 25.3s | 20s | **−5.3 (too short; needs extension)** |
| 6 | 10.9s | 12s | +1.1 |
| 7 | 18.0s | 20s | +2.0 |
