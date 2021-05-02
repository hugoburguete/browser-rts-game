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