const calculateLevel = (totalXp) => {
  const XP_PER_LEVEL = 500;
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpInCurrentLevel = totalXp % XP_PER_LEVEL;
  const progressPercent = (xpInCurrentLevel / XP_PER_LEVEL) * 100;
  return { level, xpInCurrentLevel, progressPercent, XP_PER_LEVEL };
};

export default calculateLevel;
