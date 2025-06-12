export function compareTime(sourceTime: string, targetTime: string) {
  const source = Date.parse(`01/01/2011 ${sourceTime}`);
  const target = Date.parse(`01/01/2011 ${targetTime}`);

  if (source > target) {
    return 1;
  } else if (source < target) {
    return -1;
  } else {
    return 0;
  }
}
