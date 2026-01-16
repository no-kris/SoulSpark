const XP_PER_LEVEL = 500;

const calculateLevel = (totalXp) => {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpInCurrentLevel = totalXp % XP_PER_LEVEL;
  const progressPercent = (xpInCurrentLevel / XP_PER_LEVEL) * 100;
  return { level, xpInCurrentLevel, progressPercent };
};

export default calculateLevel;
