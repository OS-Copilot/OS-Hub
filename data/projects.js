// Project content, official resource links, and orbital positions.
export const projects = [
  {
    "id": "os-genesis",
    "name": "OS-Genesis",
    "homepage": "https://qiushisun.github.io/OS-Genesis-Home/",
    "summary": "Synthesizes GUI tasks and trajectories from interaction, without manual task annotation.",
    "role": "Trajectory synthesis",
    "question": "How do agents learn from interaction?",
    "github": "https://github.com/OS-Copilot/OS-Genesis",
    "cover": "assets/covers/os-genesis.jpeg",
    "color": "#cfa76d",
    "angle": -150,
    "resources": [
      {
        "name": "Mobile trajectories",
        "type": "Data",
        "description": "Synthesized mobile interaction data.",
        "url": "https://huggingface.co/datasets/OS-Copilot/OS-Genesis-mobile-data",
        "logo": "assets/logos/os-genesis-hd.png"
      },
      {
        "name": "Web trajectories",
        "type": "Data",
        "description": "Synthesized web interaction data.",
        "url": "https://huggingface.co/datasets/OS-Copilot/OS-Genesis-web-data",
        "logo": "assets/logos/os-genesis-hd.png"
      },
      {
        "name": "OS-Genesis checkpoints",
        "type": "Models",
        "description": "GUI agents trained on synthesized trajectories.",
        "url": "https://huggingface.co/collections/OS-Copilot/os-genesis",
        "logo": "assets/logos/os-genesis-hd.png"
      }
    ],
    "logo": "assets/logos/os-genesis-hd.png",
    "orbit": "inner"
  },
  {
    "id": "scienceboard",
    "name": "ScienceBoard",
    "homepage": "https://qiushisun.github.io/ScienceBoard-Home/",
    "summary": "Evaluates computer-using agents in scientific workflows with professional software.",
    "role": "Scientific environments",
    "question": "Can agents work with scientific software?",
    "github": "https://github.com/OS-Copilot/ScienceBoard",
    "cover": "assets/covers/scienceboard.jpeg",
    "color": "#84b9d1",
    "angle": -114,
    "resources": [
      {
        "name": "ScienceBoard benchmark",
        "type": "Benchmark",
        "description": "Task definitions for scientific workflows.",
        "url": "https://github.com/OS-Copilot/ScienceBoard/tree/main/tasks",
        "logo": "assets/logos/scienceboard-hd.png"
      },
      {
        "name": "ScienceBoard-Env",
        "type": "Infrastructure",
        "description": "The preconfigured Ubuntu virtual machine.",
        "url": "https://huggingface.co/OS-Copilot/ScienceBoard-Env",
        "logo": "assets/logos/scienceboard-hd.png",
        "tags": [
          "Ubuntu VM"
        ]
      },
      {
        "name": "ScienceBoard-Traj",
        "type": "Data",
        "description": "Recorded agent trajectories.",
        "url": "https://huggingface.co/datasets/OS-Copilot/ScienceBoard-Traj",
        "logo": "assets/logos/scienceboard-hd.png"
      }
    ],
    "logo": "assets/logos/scienceboard-hd.png",
    "orbit": "outer"
  },
  {
    "id": "os-sentinel",
    "name": "OS-Sentinel",
    "homepage": "https://qiushisun.github.io/OS-Sentinel-Home/",
    "summary": "Detects mobile-agent safety risks with system-level checks and contextual judgment.",
    "role": "Agent safety",
    "question": "Can agents act safely?",
    "github": "https://github.com/OS-Copilot/OS-Sentinel",
    "cover": "assets/covers/os-sentinel.jpeg",
    "color": "#79bea4",
    "angle": -78,
    "resources": [
      {
        "name": "MobileRisk",
        "type": "Benchmark",
        "description": "Annotated safe and unsafe mobile trajectories.",
        "url": "https://huggingface.co/datasets/OS-Copilot/MobileRisk",
        "logo": "assets/logos/os-sentinel-highres.png"
      },
      {
        "name": "MobileRisk-Live",
        "type": "Infrastructure",
        "description": "Live mobile sandbox and setup instructions.",
        "url": "https://github.com/OS-Copilot/OS-Sentinel",
        "logo": "assets/logos/os-sentinel-highres.png"
      },
      {
        "name": "Hybrid safety evaluator",
        "type": "Code",
        "description": "Formal checks and contextual safety judgment.",
        "url": "https://github.com/OS-Copilot/OS-Sentinel/tree/master/mobile_safety/evaluator",
        "logo": "assets/logos/os-sentinel-highres.png"
      }
    ],
    "logo": "assets/logos/os-sentinel-highres.png",
    "orbit": "inner"
  },
  {
    "id": "openmobile-2",
    "name": "OpenMobile-2",
    "homepage": "https://os-copilot.github.io/OpenMobile2-Home/",
    "summary": "Trains mobile agents on scalable app environments with shared GUI and tool access.",
    "role": "Mobile agents",
    "question": "How do we build open mobile agents?",
    "github": "https://github.com/OpenMobile2/OpenMobile2-Code",
    "cover": "assets/covers/openmobile-2-cover-v2.png",
    "color": "#7bc9b3",
    "angle": -42,
    "coverStyle": "art",
    "resources": [
      {
        "name": "MobileGym++",
        "type": "Infrastructure",
        "description": "Simulated and emulator apps with resettable state.",
        "url": "https://github.com/OpenMobile2/MobileGym-plusplus",
        "logo": "assets/logos/openmobile-2-hd.png"
      },
      {
        "name": "OpenMobile-Data",
        "type": "Data",
        "description": "Demonstrations and executable tasks for training.",
        "url": "https://huggingface.co/datasets/OpenMobile-2/OpenMobile-Data-v2",
        "logo": "assets/logos/openmobile-2-hd.png"
      },
      {
        "name": "OpenMobile-2 models",
        "type": "Models",
        "description": "The released mobile-agent model family.",
        "url": "https://huggingface.co/OpenMobile-2",
        "logo": "assets/logos/openmobile-2-hd.png"
      }
    ],
    "logo": "assets/logos/openmobile-2-hd.png",
    "orbitCover": "assets/covers/openmobile-2-cover-v2.png",
    "orbitCoverStyle": "art",
    "orbit": "outer"
  },
  {
    "id": "osreward",
    "name": "OSReward",
    "homepage": "https://os-copilot.github.io/OSReward-Home/",
    "summary": "Measures how reliably VLMs judge computer-use trajectories on 1,019 human-gold runs, and releases open reward models.",
    "role": "Evaluation & reward",
    "question": "How reliable is the judge of an agent’s work?",
    "github": "https://github.com/OS-Copilot/OSReward",
    "cover": "assets/covers/osreward.png",
    "color": "#e1bd75",
    "angle": -6,
    "resources": [
      {
        "name": "OSReward",
        "type": "Benchmark",
        "description": "1,019 human-gold trajectories on four platforms, with Hard and Multi sets.",
        "url": "https://huggingface.co/datasets/OS-Copilot/OSReward",
        "logo": "assets/logos/osreward-hd.png"
      },
      {
        "name": "OS-Shepherd-100K",
        "type": "Data",
        "description": "Reasoning-annotated judge samples kept by ensemble agreement.",
        "url": "https://huggingface.co/datasets/OS-Copilot/OS-Shepherd-100K",
        "logo": "assets/logos/osreward-hd.png"
      },
      {
        "name": "OS-Shepherd 9B / 35B",
        "type": "Models",
        "description": "Open reward models level with commercial judges at far lower cost.",
        "url": "https://huggingface.co/collections/OS-Copilot/osreward-and-os-shepherd",
        "logo": "assets/logos/osreward-hd.png",
        "tags": [
          "9B",
          "35B"
        ]
      }
    ],
    "logo": "assets/logos/osreward-hd.png",
    "orbit": "inner"
  },
  {
    "id": "os-symphony",
    "name": "OS-Symphony",
    "homepage": "https://os-copilot.github.io/OS-Symphony/",
    "summary": "Coordinates memory, reflection and specialized tools for cross-platform desktop tasks.",
    "role": "Agent orchestration",
    "question": "How do agent capabilities work together?",
    "github": "https://github.com/OS-Copilot/OS-Symphony",
    "cover": "assets/covers/os-symphony-cover-v2.png",
    "color": "#cf919c",
    "angle": 30,
    "resources": [
      {
        "name": "OS-Symphony framework",
        "type": "Code",
        "description": "Cross-platform desktop agent framework.",
        "url": "https://github.com/OS-Copilot/OS-Symphony",
        "logo": "assets/logos/os-symphony.png"
      },
      {
        "name": "Reflection-Memory Agent",
        "type": "Code",
        "description": "Trajectory reflection and long-term task memory.",
        "url": "https://github.com/OS-Copilot/OS-Symphony/blob/main/mm_agents/os_symphony/agents/memoryer_agent.py",
        "logo": "assets/logos/os-symphony.png"
      },
      {
        "name": "Multimodal Searcher",
        "type": "Code",
        "description": "Visual tutorial retrieval for unfamiliar workflows.",
        "url": "https://github.com/OS-Copilot/OS-Symphony/blob/main/mm_agents/os_symphony/agents/searcher_agent.py",
        "logo": "assets/logos/os-symphony.png"
      }
    ],
    "logo": "assets/logos/os-symphony.png",
    "orbitCover": "assets/covers/os-symphony-cover-v2.png",
    "orbitCoverStyle": "art",
    "orbit": "outer",
    "coverStyle": "art"
  },
  {
    "id": "os-atlas",
    "name": "OS-Atlas",
    "homepage": "https://osatlas.github.io/",
    "summary": "Grounds interface elements and predicts actions across web, desktop and mobile environments.",
    "role": "GUI grounding",
    "question": "How do agents understand an interface?",
    "github": "https://github.com/OS-Copilot/OS-Atlas",
    "cover": "assets/covers/os-atlas-cover-v2.png",
    "color": "#c4ab75",
    "angle": 66,
    "coverStyle": "art",
    "orbitCover": "assets/covers/os-atlas-cover-v2.png",
    "orbitCoverStyle": "art",
    "resources": [
      {
        "name": "OS-Atlas action model",
        "type": "Models",
        "description": "Cross-platform GUI action prediction.",
        "url": "https://huggingface.co/OS-Copilot/OS-Atlas-Pro-7B",
        "logo": "assets/logos/os-atlas-transparent.png"
      },
      {
        "name": "OS-Atlas grounding data",
        "type": "Data",
        "description": "Cross-platform GUI element annotations.",
        "url": "https://huggingface.co/datasets/OS-Copilot/OS-Atlas-data",
        "logo": "assets/logos/os-atlas-transparent.png"
      },
      {
        "name": "ScreenSpot-v2",
        "type": "Benchmark",
        "description": "GUI grounding evaluation.",
        "url": "https://huggingface.co/datasets/OS-Copilot/ScreenSpot-v2",
        "logo": "assets/logos/os-atlas-transparent.png"
      }
    ],
    "logo": "assets/logos/os-atlas-transparent.png",
    "orbit": "inner"
  },
  {
    "id": "agentstore",
    "name": "AgentStore",
    "homepage": "https://chengyou-jia.github.io/AgentStore-Home/",
    "summary": "Integrates specialized agents and routes computer tasks through a shared MetaAgent.",
    "role": "Agent ecosystem",
    "question": "How can specialist agents collaborate?",
    "github": "",
    "cover": "assets/covers/agentstore-cover-v2.png",
    "color": "#caa28c",
    "angle": 102,
    "coverStyle": "art",
    "orbitCover": "assets/covers/agentstore-cover-v2.png",
    "orbitCoverStyle": "art",
    "resources": [
      {
        "name": "AgentToken-8B",
        "type": "Models",
        "description": "The released model for agent selection and coordination.",
        "url": "https://huggingface.co/ChengyouJia/AgentToken-8B",
        "logo": "assets/covers/agentstore-cover-v2.png",
        "logoStyle": "cover"
      }
    ],
    "components": [
      {
        "name": "AgentPool",
        "description": "A shared collection of specialized agents."
      },
      {
        "name": "AgentEnroll",
        "description": "A protocol for adding agents and their capabilities."
      },
      {
        "name": "MetaAgent",
        "description": "Selects agents to work independently or together."
      }
    ],
    "logo": "assets/covers/agentstore-cover-v2.png",
    "orbit": "outer",
    "logoStyle": "cover"
  },
  {
    "id": "os-omni",
    "name": "OS-Omni",
    "homepage": "https://os-copilot.github.io/OS-Omni-Home",
    "summary": "Evaluating long-horizon workflows across desktop, mobile, and web environments.",
    "role": "Cross-platform evaluation",
    "question": "Can agents sustain workflows across platforms?",
    "github": "",
    "cover": "assets/covers/os-omni-cover-v2.png",
    "coverStyle": "art",
    "logo": "assets/logos/os-omni.png",
    "color": "#a6a3e5",
    "resourceLinksPending": true,
    "resources": [
      {
        "name": "OS-Omni benchmark",
        "type": "Benchmark",
        "description": "Long-horizon tasks across software platforms.",
        "url": "https://os-copilot.github.io/OS-Omni-Home",
        "logo": "assets/logos/os-omni.png"
      },
      {
        "name": "Execution environment",
        "type": "Infrastructure",
        "description": "Platform adapters and reproducible task setup.",
        "url": "https://os-copilot.github.io/OS-Omni-Home",
        "logo": "assets/logos/os-omni.png"
      },
      {
        "name": "Final-state evaluators",
        "type": "Code",
        "description": "Executable checks of task outcomes.",
        "url": "https://os-copilot.github.io/OS-Omni-Home",
        "logo": "assets/logos/os-omni.png"
      }
    ],
    "angle": 138,
    "orbit": "inner",
    "orbitCover": "assets/covers/os-omni-cover-v2.png",
    "orbitCoverStyle": "art"
  },
  {
    "id": "os-helix",
    "name": "OS-Helix",
    "homepage": "https://os-copilot.github.io/OS-Helix/",
    "summary": "Learns to combine GUI actions and code execution in one desktop-agent policy.",
    "role": "GUI and code agents",
    "question": "How can agents learn to use GUI and code together?",
    "github": "https://github.com/OS-Copilot/OS-Helix",
    "logo": "assets/logos/os-helix.png",
    "cover": "assets/covers/os-helix-cover-v2.png",
    "coverStyle": "art",
    "color": "#bd96dc",
    "resources": [
      {
        "name": "OS-Helix models",
        "type": "Models",
        "description": "Desktop agents trained to coordinate GUI actions and code execution.",
        "url": "https://huggingface.co/collections/YYangzzzz/os-helix",
        "logo": "assets/logos/os-helix.png",
        "tags": [
          "27B",
          "35B-A3B"
        ]
      },
      {
        "name": "OS-Helix-Dataset",
        "type": "Data",
        "description": "Hybrid GUI/code training examples with screenshots.",
        "url": "https://huggingface.co/datasets/YYangzzzz/OS-Helix-Dataset",
        "logo": "assets/logos/os-helix.png"
      }
    ],
    "angle": 174,
    "orbit": "outer",
    "orbitCover": "assets/covers/os-helix-cover-v2.png",
    "orbitCoverStyle": "art"
  }
];
