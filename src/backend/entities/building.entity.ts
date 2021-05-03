export const getResouceRateForLevel = (level: number) => {
  switch (level) {
    case 1:
      return 30;
    case 2:
      return 35;
    case 3:
      return 41;
    case 4:
      return 47;
    case 5:
      return 55;
    case 6:
      return 64;
    case 7:
      return 74;
    case 8:
      return 86;
    case 9:
      return 100;
    case 10:
      return 117;
    case 11:
      return 136;
    case 12:
      return 158;
    case 13:
      return 184;
    case 14:
      return 214;
    case 15:
      return 249;
    case 16:
      return 289;
    case 17:
      return 337;
    case 18:
      return 391;
    case 19:
      return 455;
    case 20:
      return 530;
    case 21:
      return 616;
    case 22:
      return 717;
    case 23:
      return 833;
    case 24:
      return 969;
    case 25:
      return 1127;
    case 26:
      return 1311;
    case 27:
      return 1525;
    case 28:
      return 1774;
    case 29:
      return 2063;
    case 30:
      return 2400;

    default:
      throw new Error("Invalid level");
  }
}

export const getMaxWarehouseResourcesPerLevel = (level: number) => {
  switch (level) {
    case 1:
      return 1000;
    case 2:
      return 1229;
    case 3:
      return 1512;
    case 4:
      return 1859;
    case 5:
      return 2285;
    case 6:
      return 2810;
    case 7:
      return 3454;
    case 8:
      return 4247;
    case 9:
      return 5222;
    case 10:
      return 6420;
    case 11:
      return 7893;
    case 12:
      return 9705;
    case 13:
      return 11932;
    case 14:
      return 14670;
    case 15:
      return 18037;
    case 16:
      return 22177;
    case 17:
      return 27266;
    case 18:
      return 33523;
    case 19:
      return 41217;
    case 20:
      return 50675;
    case 21:
      return 62305;
    case 22:
      return 76604;
    case 23:
      return 94184;
    case 24:
      return 115798;
    case 25:
      return 142373;
    case 26:
      return 175047;
    case 27:
      return 215219;
    case 28:
      return 264611;
    case 29:
      return 325337;
    case 30:
      return 400000;

    default:
      throw new Error("Invalid level");
  }
}