const cacheUnit = ['KB','MB', 'GB'];
function makeCacheSize(num, time) {
  let tempCache = Math.round(num / 1024);
  let answer = '';
  if (1024 <= tempCache) {
    answer = makeCacheSize(tempCache, time + 1);
  } else {
    return tempCache.toString() + cacheUnit[time];
  }
  return answer;
}

console.log(makeCacheSize(2024020, 0));