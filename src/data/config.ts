const config: SiteCfg = {
  siteTitle: "Krooster",
  siteDescription:
    "A collection and progress tracker for Arknights, a game developed by Hypergryph.",
  tabs: {
    "/data": {
      title: "Data",
      requireLogin: true,
      pages: {
        "/input": {
          title: "Input",
          description: "Enter data of owned operators.",
        },
        "/view": {
          title: "Collection",
          description: "View a summary of operator data.",
        },
        "/profile": {
          title: "Profile",
          description: "Share your in-game Doctor information.",
        },
        "/planner": {
          title: "Planner",
          description: "Set goals for operators and calculate material costs.",
        },
      }
    },
    "/network": {
      title: "Network",
      pages: {
        "/lookup": {
          title: "Lookup",
          description: "Find other users.",
        },
        "/support": {
          title: "Support Search",
          description: "Find support units to add as friends.",
        },
      }
    },
    "/tools": {
      title: "Tools",
      pages: {
        "/recruit": {
          title: "Recruitment",
          description: "See what pool of operators are available from your tags in Recruitment.",
        },
        "/rateup": {
          title: "Headhunting",
          description: "Calculate the probability of pulling operators on a gacha banner.",
        },
        "/level": {
          title: "Level Costs",
          description: "Calculate LMD and EXP costs to level operators.",
        }
      }
    },
    "": {
      title: "",
      exclude: true,
      pages: {
        "/settings": {
          title: "Settings",
          description: "Change your account settings.",
          requireLogin: true,
          noIndex: true,
        },
        "/login": {
          title: "Login",
          description: "Log in to Krooster.",
        },
        "/register": {
          title: "Register",
          description: "Sign up for a Krooster account!",
        },
      }
    },

  },
};
export default config;

type SiteCfg = {
  siteTitle: string;
  siteDescription: string;
  tabs: Record<string, SiteTab>;
}
type SiteTab = {
  title: string;
  requireLogin?: boolean;
  pages: Record<string, SiteNode>;
  exclude?: boolean;
}
type SiteNode = {
  title: string;
  description: string;
  requireLogin?: boolean;
  noIndex?: boolean;
}