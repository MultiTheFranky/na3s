export type Mission = {
  template: MissionTemplate;
  difficulty: "Custom" | "Recruit" | "Regular" | "Veteran";
};

type MissionTemplate = `${string}.${string}`;
